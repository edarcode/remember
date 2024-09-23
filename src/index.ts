import "./services/dotenv";
import express from "express";
import cors from "cors";
import { routeNotFoundHandler } from "./server/routeNotFoundHandler";
import { errorHandler } from "./server/errHandler";
import { PORT, SERVER_ON } from "./server/consts";
import { welcomeRouter } from "./modules/welcome/welcomeRoute";

// server

const server = express();

// middlewares

server.use(cors());
server.use(express.json());

// routes

server.use("", welcomeRouter);

// handlers

server.use(routeNotFoundHandler);
server.use(errorHandler);

// server-up

server.listen(PORT, () => console.log(SERVER_ON));
