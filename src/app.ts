import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFoundError from "./app/middleware/notFoundError";

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// aplication routes
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Blood Donation Application Server...",
  });
});

app.use(globalErrorHandler);

app.use(notFoundError);

export default app;
