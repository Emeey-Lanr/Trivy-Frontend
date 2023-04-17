"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
require("dotenv").config();
const app = (0, express_1.default)();
const Socket = require("socket.io");
// Middle Ware
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use(express_1.default.json());
const userRoute = require("./UserRoute/user");
app.use("/user", userRoute);
const PORT = process.env.PORT;
const serverPort = app.listen(PORT, () => {
    console.log(`server has started @ port ${PORT}`);
});
const io = Socket(serverPort, { option: "*" });
io.on("connection", (socket) => {
    socket.on("disconnect", () => {
    });
});
