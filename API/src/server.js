import "dotenv/config";
import express from "express";
import path from "path";
import cors from "cors";
import userRoutes from "./router/user.routes.js"
// import authenticate from "./middelwares/auth.middleware.js"

const app = express();

// app.post("/x",(req,res) => {
//     res.send("hihi")
// })


app.use("/api/users",userRoutes);


const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
