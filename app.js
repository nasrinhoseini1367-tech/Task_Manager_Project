import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import express from "express";

import getRoutes from "./routes/get-routes.js";
import postRoutes from "./routes/post-routes.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(getRoutes);
app.use(postRoutes);
app.listen(3000, () => {
    console.log("server is running");
});
export { __dirname as rootPath };
