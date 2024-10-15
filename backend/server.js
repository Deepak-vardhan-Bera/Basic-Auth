import express from 'express';
import { connectDB } from './db/ConnectDb.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.route.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from 'url';


configDotenv()
const port=process.env.PORT||5000
const app=express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*', 
    credentials: true 
  }));
 
 
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(process.env.NODE_ENV);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
  }
app.use('/api/auth',authrouter)

app.listen(port,()=>{
    connectDB()
    console.log("servier is running at port",port);
})
