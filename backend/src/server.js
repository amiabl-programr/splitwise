// Server.ts
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(dotenv());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Home",
       
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
