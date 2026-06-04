import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

export default function AddFacial() {
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [jsonText, setJsonText] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [scanning, setScanning] = useState(false);
  const webcamRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setJsonText(ev.target.result);
      try {
        const p = JSON.parse(ev.target.result);
        setParsedJson(p);
        setError("");
      } catch (err) {
        console.error(err);
        setParsedJson(null);
        setError("Invalid JSON in file");
      }
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    // Load face-api models from public/models
    let mounted = true;
    async function loadModels() {
      try {
        const modelUrl = "/models"; // public/models
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(modelUrl),
          faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
          faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
        ]);
        if (mounted) setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load face-api models", err);
      }
    }
    loadModels();
    return () => { mounted = false; };
  }, []);

  function handleParse() {
    try {
      const p = JSON.parse(jsonText);
      setParsedJson(p);
      setError("");
    } catch (err) {
      console.error(err);
      setParsedJson(null);
      setError("Invalid JSON text");
    }
  }

  async function handleSave() {
    setSuccess("");
    setError("");
    if (!className.trim() || !studentName.trim()) {
      setError("Please provide both class and student name");
      return;
    }
    let payload = parsedJson;
    if (!payload) {
      try {
        payload = JSON.parse(jsonText);
      } catch (err) {
        console.error(err);
        setError("No valid JSON to save");
        return;
      }
    }

    const path = `Facial/${className}/${studentName}`;
    setLoading(true);
    try {
      await set(ref(db, path), payload);
      setSuccess(`Saved facial data to ${path}`);
    } catch (err) {
      console.error(err);
      setError("Failed to save data: " + (err && err.message ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function handleScanFace() {
    setError("");
    setSuccess("");
    if (!modelsLoaded) {
      setError("Face models are not loaded yet. Please wait a moment.");
      return;
    }
    if (!webcamRef.current || !webcamRef.current.video) {
      setError("Camera not available. Please enable the camera.");
      return;
    }
    setScanning(true);
    try {
      const videoEl = webcamRef.current.video;
      // Detect single face and get descriptor
      const detection = await faceapi
        .detectSingleFace(videoEl)
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection || !detection.descriptor) {
        setError("No face detected. Try again.");
        setParsedJson(null);
        return;
      }

      const descriptorArray = Array.from(detection.descriptor);
      const payload = { descriptors: [descriptorArray], createdAt: Date.now() };
      setParsedJson(payload);
      setJsonText(JSON.stringify(payload, null, 2));
      setSuccess("Face scanned — preview shown. Click Save to store in Firebase.");
    } catch (err) {
      console.error(err);
      setError("Failed to scan face: " + (err && err.message ? err.message : String(err)));
    } finally {
      setScanning(false);
    }
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 900, margin: "24px auto" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add Facial Data (JSON)
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
        <TextField
          label="Class (e.g. CS-1A)"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <TextField
          label="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <Button variant="contained" component="label" sx={{ height: 40 }}>
          Upload .json
          <input hidden accept="application/JSON,.json" type="file" onChange={handleFile} />
        </Button>
        <Button
          variant={cameraOn ? "contained" : "outlined"}
          onClick={() => setCameraOn((s) => !s)}
          sx={{ height: 40 }}
        >
          {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
        </Button>
        <Button
          variant="outlined"
          onClick={handleSave}
          disabled={loading}
          sx={{ height: 40 }}
        >
          {loading ? "Saving..." : "Save to Firebase"}
        </Button>
      </Box>

      {cameraOn && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>Camera</Typography>
          <Box>
            <Webcam
              audio={false}
              ref={webcamRef}
              mirrored
              videoConstraints={{ facingMode: "user" }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Button onClick={handleScanFace} disabled={scanning} variant="contained">{scanning ? "Scanning..." : "Scan Face"}</Button>
            <Button onClick={() => { setParsedJson(null); setJsonText(""); setError(""); setSuccess(""); }} variant="text">Clear</Button>
          </Box>
        </Box>
      )}

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Paste JSON data (or upload a .json file)
      </Typography>
      <TextField
        multiline
        minRows={8}
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        placeholder='Paste JSON here (example: {"descriptors": [...]})'
        fullWidth
      />

      <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
        <Button onClick={handleParse} variant="text">Parse JSON</Button>
        <Button onClick={() => { setJsonText(""); setParsedJson(null); setError(""); setSuccess(""); }} variant="text">Clear</Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2">Preview (parsed JSON)</Typography>
        <Paper variant="outlined" sx={{ p: 1, mt: 1, maxHeight: 300, overflow: "auto" }}>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
            {parsedJson ? JSON.stringify(parsedJson, null, 2) : "(No parsed JSON)"}
          </pre>
        </Paper>
      </Box>
    </Paper>
  );
}