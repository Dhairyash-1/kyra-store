import { startServer } from "./app";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

startServer();
