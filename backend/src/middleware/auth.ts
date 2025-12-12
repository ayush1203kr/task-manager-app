import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(">>> AUTH HEADER (incoming):", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log(">>> No bearer token present");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "supersecret_jwt_key_change_this";
    const decoded = jwt.verify(token, secret);
    console.log(">>> JWT verified OK, decoded:", decoded);
    (req as any).user = decoded;
    next();
  } catch (err) {
    console.error(">>> JWT verify error:", err && (err as Error).message ? (err as Error).message : err);
    return res.status(401).json({ message: "Invalid token" });
  }
};
