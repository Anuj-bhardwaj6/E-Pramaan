import React from "react";
import { useSelector } from "react-redux";
import { selectIsAdmin } from "../store/authSlice";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  School,
  Group,
  Event,
  Assessment,
  AdminPanelSettings,
} from "@mui/icons-material";

// Mock Data
const pieData = [
  { name: "Present", value: 400 },
  { name: "Absent", value: 100 },
];
const lineData = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
];
const barData = [
  { name: "PG", value: 20 },
  { name: "Nursery", value: 25 },
  { name: "LKG", value: 22 },
  { name: "UKG", value: 28 },
  { name: "1st", value: 30 },
  { name: "2nd", value: 27 },
  { name: "3rd", value: 35 },
  { name: "4th", value: 32 },
  { name: "5th", value: 29 },
  { name: "6th", value: 34 },
  { name: "7th", value: 31 },
  { name: "8th", value: 33 },
  { name: "9th", value: 26 },
  { name: "10th", value: 28 },
  { name: "11th", value: 24 },
  { name: "12th", value: 30 },
];

// StatCard Component
const StatCard = ({ icon, title, value, color }) => (
  <Card
    sx={{
      p: 3,
      height: "100%", // ensures equal height
      width: "17.5rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: `linear-gradient(135deg, ${color} 30%, ${color}90 100%)`,
      color: "#fff",
      borderRadius: 4,
      transition: "transform 0.2s",
      "&:hover": {
        transform: "scale(1.05)",
      },
    }}
  >
    <Avatar sx={{ bgcolor: "transparent", mb: 1, width: 56, height: 56 }}>
      {icon}
    </Avatar>
    <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
      {value}
    </Typography>
    <Typography variant="body1">{title}</Typography>
  </Card>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ bgcolor: "rgba(255, 255, 255, 0.8)", p: 1, borderRadius: 2 }}>
        <Typography variant="body2">{`${label} : ${payload[0].value}`}</Typography>
      </Box>
    );
  }
  return null;
};

export default function Dashboard() {
  const isAdmin = useSelector(selectIsAdmin);
  const theme = useTheme();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#f4f6f8" }}>
      <Grid container spacing={3} alignItems="stretch">
        {isAdmin && (
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/admin"
              variant="contained"
              startIcon={<AdminPanelSettings />}
            >
              Admin Panel
            </Button>
          </Grid>
        )}

        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StatCard
            icon={<School sx={{ fontSize: 40 }} />}
            title="Total Courses"
            value="12"
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StatCard
            icon={<Group sx={{ fontSize: 40 }} />}
            title="Total Students"
            value="1,200"
            color={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StatCard
            icon={<Event sx={{ fontSize: 40 }} />}
            title="Upcoming Events"
            value="3"
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3}>
          <StatCard
            icon={<Assessment sx={{ fontSize: 40 }} />}
            title="Average Grade"
            value="B+"
            color={theme.palette.warning.main}
          />
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Student Enrollment Trends
              </Typography>
              <ResponsiveContainer width={550} height={300}>
                <LineChart data={lineData}>
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.primary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke={theme.palette.primary.main}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 3, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <ResponsiveContainer width={550} height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    style={{ fontSize: "24px", fontWeight: "bold" }}
                  >
                    {`${Math.round(
                      (pieData[0].value /
                        (pieData[0].value + pieData[1].value)) *
                        100
                    )}%`}
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Course Popularity
              </Typography>
              <ResponsiveContainer width={550} height={300}>
                <BarChart data={barData}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={theme.palette.secondary.main}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={theme.palette.secondary.main}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="url(#colorBar)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
