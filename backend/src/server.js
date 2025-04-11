
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: 'http://localhost:5137', // or your frontend URL
   credentials: true
}));

app.use("/api", authRoutes);

app.get("/", (req, res) => {
   res.send("hi");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
