import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundError from "./app/middleware/notFoundError";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(
  cors({
    origin: "https://donate-and-save-psi.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    // optionsSuccessStatus: 200,
  })
);
// origin: "https://donate-and-save-psi.vercel.app",
// origin: "http://localhost:3000",

// app.options(
//   "*",
//   cors({
//     origin: "https://donate-and-save-psi.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 200,
//   })
// );

//parser
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// aplication routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Blood Donation Application Server...",
  });
});

app.use(globalErrorHandler);

app.use(notFoundError);

export default app;
