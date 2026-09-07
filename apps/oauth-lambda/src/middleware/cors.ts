import type { RequestHandler } from "express";
import { appOrigin } from "../config.js";

const allowedOrigins = new Set([appOrigin, "http://localhost:5173", "http://127.0.0.1:5173"]);

export const cors: RequestHandler = (request, response, next) => {
    const origin = request.get("Origin");
    if (origin && allowedOrigins.has(origin)) {
        response.setHeader("Access-Control-Allow-Origin", origin);
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    }
    response.setHeader("Vary", "Origin");
    if (request.method === "OPTIONS") return response.sendStatus(204);
    next();
};
