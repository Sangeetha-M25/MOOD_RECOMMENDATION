const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Server is running ✅");
});

// safe mood route (if exists)
try {
    const moodRoute = require("./routes/mood");
    app.use("/mood", moodRoute);
} catch {
    console.warn("Mood route missing or broken, skipping...");
}

// global error handler
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});