import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./router/user.routes.js"
import authRoutes from "./router/auth.routes.js";
// import authenticate from "./middelwares/auth.middleware.js"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/x",(req,res) => {
//     res.send("hihi")
// })


app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
