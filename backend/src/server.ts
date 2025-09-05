import express from "express";
import cors from "cors";

import { env_config } from "./config/env.ts";
import { connectDB } from "./config/db.ts";
import notesRoutes from "./routes/notesRoutes.ts";

const app = express();
const PORT = env_config.PORT;

app.use(cors({
    origin: ["http://localhost:5173"]
})) // this middleware allows the frontend to access the api

app.use(express.json()); // first we have to tell the express how are we gonna parse req.body

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Sever running at PORT: ", PORT);
    });
})