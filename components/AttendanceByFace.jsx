import React, { useRef, useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import Swal from "sweetalert2";

export default function AttendanceByFace() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading models...");
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [loadedLabel, setLoadedLabel] = useState(null);
  const [faceMatcher, setFaceMatcher] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [markedPath, setMarkedPath] = useState(null);
  const [notice, setNotice] = useState("");
  const [lastMarkedValue, setLastMarkedValue] = useState(null);
  const [lastAlertLabel, setLastAlertLabel] = useState(null);
  const [lastAlertNotMatch, setLastAlertNotMatch] = useState(false);

  // Save attendance to Firebase
  const markAttendanceToDB = useCallback(
    async (classNameParam, studentNameParam, statusValue = "Present") => {
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const date = String(now.getDate()).padStart(2, "0");

        const statusPath = `StudentDetails/${classNameParam}/${year}/${month}/${date}/${studentNameParam}/Status`;

        // Prevent duplicate writes
        if (markedPath === statusPath && lastMarkedValue === statusValue) {
          return { alreadyMarked: true, path: statusPath, value: lastMarkedValue };
        }

        await set(ref(db, statusPath), statusValue);
        setMarkedPath(statusPath);
        setLastMarkedValue(statusValue);
        return { alreadyMarked: false, path: statusPath, value: statusValue };
      } catch (err) {
        console.error("Error marking attendance:", err);
        throw err;
      }
    },
    [markedPath, lastMarkedValue]
  );

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setStatus("Models loaded. Starting webcam...");
        setLoading(false);
      } catch (error) {
        console.error("Error loading models:", error);
        setStatus("Failed to load models.");
      }
    };
    loadModels();
  }, []);

  // Detect faces and mark attendance
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(async () => {
      if (
        webcamRef.current &&
        webcamRef.current.video &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceDescriptors();

        // Draw detections
        const canvas = canvasRef.current;
        faceapi.matchDimensions(canvas, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        const resized = faceapi.resizeResults(detections, {
          width: video.videoWidth,
          height: video.videoHeight,
        });
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resized);
        faceapi.draw.drawFaceLandmarks(canvas, resized);

        if (detections.length > 0) {
          setStatus("Face detected ✅");

          if (faceMatcher && detections[0].descriptor) {
            const best = faceMatcher.findBestMatch(detections[0].descriptor);

            if (best && best.label && best.label !== "unknown") {
              setMatchResult({
                matched: true,
                label: best.label,
                distance: best.distance,
              });
              setStatus(
                `Matched: ${best.label} (distance: ${best.distance.toFixed(3)})`
              );

              // Mark attendance as Present
              if (loadedLabel && best.label === loadedLabel && className && studentName) {
                try {
                  const res = await markAttendanceToDB(className, studentName, "Present");
                  if (res.alreadyMarked) {
                    setNotice(`Attendance already marked for today at ${res.path}`);
                    if (lastAlertLabel !== best.label) {
                      Swal.fire({
                        icon: "info",
                        title: "Already marked",
                        text: `Attendance already marked for today`,
                      });
                      setLastAlertLabel(best.label);
                    }
                  } else {
                    setNotice(`Marked Present for ${className}/${studentName}`);
                    if (lastAlertLabel !== best.label) {
                      Swal.fire({
                        icon: "success",
                        title: "Attendance marked",
                        text: `${studentName} marked Present`,
                      });
                      setLastAlertLabel(best.label);
                    }
                  }
                } catch (err) {
                  console.error(err);
                  setNotice("Failed to mark attendance");
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to mark attendance",
                  });
                }
              }
            } else {
              // Face not matched
              setMatchResult({ matched: false, label: null, distance: null });
              setStatus("No matching face found ❌");
              setNotice("Face not matched");

              if (className && studentName) {
                try {
                  const res = await markAttendanceToDB(className, studentName, "Absent");
                  if (res.alreadyMarked) {
                    if (!lastAlertNotMatch) {
                      Swal.fire({
                        icon: "info",
                        title: "Already recorded",
                        text: `Attendance already recorded`,
                      });
                      setLastAlertNotMatch(true);
                    }
                  } else {
                    if (!lastAlertNotMatch) {
                      Swal.fire({
                        icon: "warning",
                        title: "Not matched",
                        text: `${studentName} marked Absent`,
                      });
                      setLastAlertNotMatch(true);
                    }
                  }
                } catch (err) {
                  console.error(err);
                }
              }
            }
          }
        } else {
          setStatus("No face detected ❌");
          setMatchResult(null);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    loading,
    faceMatcher,
    loadedLabel,
    className,
    studentName,
    markedPath,
    markAttendanceToDB,
    lastAlertLabel,
    lastAlertNotMatch,
  ]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h3" fontWeight="bold" mb={2}>
        Attendance By Face
      </Typography>
      <Typography variant="h6" mb={3}>
        {status}
      </Typography>

      <Box sx={{ mb: 2, display: "flex", gap: 1, alignItems: "center" }}>
        <TextField
          label="Class"
          size="small"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          label="Student"
          size="small"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={async () => {
            setStatus("Loading stored facial data...");
            setLoadedLabel(null);
            setFaceMatcher(null);
            setMatchResult(null);
            try {
              const url = `https://lpu2hand-default-rtdb.firebaseio.com/Facial/${className}/${studentName}.json`;
              const resp = await fetch(url);
              if (!resp.ok) {
                setStatus("No stored data for that class/student");
                return;
              }
              const data = await resp.json();

              if (!data) {
                setStatus("No stored data for that class/student");
                return;
              }

              let rawDescriptors = [];

              // Case 1: descriptors as array
              if (Array.isArray(data.descriptors)) {
                rawDescriptors = data.descriptors.map(
                  (d) => new Float32Array(d)
                );
              }
              // Case 2: descriptors as object with numeric keys (your case)
              else if (data.descriptors && typeof data.descriptors === "object") {
                rawDescriptors = Object.values(data.descriptors).map((descObj) =>
                  Float32Array.from(Object.values(descObj))
                );
              }
              // Case 3: data itself as array
              else if (Array.isArray(data)) {
                rawDescriptors = data.map((d) => new Float32Array(d));
              }

              if (!rawDescriptors || rawDescriptors.length === 0) {
                setStatus("No descriptors found for that student");
                return;
              }

              const labeledDescriptors = [
                new faceapi.LabeledFaceDescriptors(
                  `${className}/${studentName}`,
                  rawDescriptors
                ),
              ];

              const matcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
              setFaceMatcher(matcher);
              setLoadedLabel(`${className}/${studentName}`);
              setStatus(`Loaded descriptors for ${className}/${studentName}`);

              // reset alert tracking
              setLastAlertLabel(null);
              setLastAlertNotMatch(false);
            } catch (err) {
              console.error(err);
              setStatus("Error loading stored facial data");
            }
          }}
        >
          Load
        </Button>
      </Box>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <Paper sx={{ position: "relative", width: 640, height: 480 }}>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={{ width: "100%", height: "100%" }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </Paper>
      )}

      <Box sx={{ mt: 2, width: 640, maxWidth: "100%" }}>
        {loadedLabel && <Alert severity="info">Loaded: {loadedLabel}</Alert>}
        {matchResult && (
          <Alert
            severity={matchResult.matched ? "success" : "warning"}
            sx={{ mt: 1 }}
          >
            {matchResult.matched
              ? `Matched: ${matchResult.label} (distance ${matchResult.distance.toFixed(
                  3
                )})`
              : `Not matched`}
          </Alert>
        )}
        {notice && (
          <Alert severity="info" sx={{ mt: 1 }}>
            {notice}
          </Alert>
        )}
      </Box>
    </Box>
  );
}