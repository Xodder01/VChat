import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

// Import the Socket.IO-enabled app & server from socket.js
// (socket.js creates the http.Server and attaches Socket.IO to it)
import { app, server } from "./lib/socket.js";

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "50mb" })); // req.body (allow base64 image uploads)
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Health-check — Render pings GET / to verify the service is alive
app.get("/", (req, res) => res.status(200).json({ status: "ok", service: "VChat API" }));

// Use server.listen (not app.listen) so Socket.IO works on the same server
server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
