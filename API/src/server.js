import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./router/user.routes.js"
import authRoutes from "./router/auth.routes.js";
import articleRoutes from "./router/article.routes.js";
import commentRoutes from "./router/comment.routes.js";
import cookieParser from "cookie-parser";
// import authenticate from "./middelwares/auth.middleware.js"
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  React
const FRONTEND_URL = 'http://localhost:5173'; // Update this port

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// app.post("/x",(req,res) => {
//     res.send("hihi")
// })


app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);

app.get('/test', (req, res) => {
  res.json({ message: 'CORS test successful!' });
});


const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});




