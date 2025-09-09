import express, { type Response } from "express";
import cors from "cors";
import path from "path";

import { env_config } from "./config/env.ts";
import { connectDB } from "./config/db.ts";
import notesRoutes from "./routes/notesRoutes.ts";

const app = express();
const PORT = env_config.PORT;
const __dirname = path.resolve();

// console.log("NODE_ENV =", env_config.NODE_ENV);

if(env_config.NODE_ENV !== "production"){
    app.use(cors({
        origin: ["http://localhost:3000"],
        // credentials: true
    })) // this middleware allows the frontend to access the api
}

app.use(express.json()); // first we have to tell the express how are we gonna parse req.body
app.use("/api/notes", notesRoutes);

if(env_config.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get(/.*/, (_, res: Response) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Sever running at PORT: ", PORT);
    });
})