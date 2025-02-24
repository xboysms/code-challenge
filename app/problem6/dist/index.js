"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const scoreboard_routes_1 = __importDefault(require("./routers/scoreboard.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*" }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", scoreboard_routes_1.default);
// 📌 Real-time Scoreboard Updates
io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("updateScore", (data) => {
        io.emit("leaderboardUpdated", data);
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
