import express from "express";
import path from "path";

const app = express();

// Serve static files from the 'backend/upload' directory
app.use('/images', express.static(path.join(__dirname, 'backend/upload')));
