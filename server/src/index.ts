import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
import { startServer } from "./app";

startServer();
