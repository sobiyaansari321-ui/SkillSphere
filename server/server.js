import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import requestRoutes from './routes/requestRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

dotenv.config()

connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.get( '/' , (req,res)=>{
    res.send("Skill Sphere Backend Running ...")
});

app.use("/api/users", userRoutes );
app.use("/api/projects", projectRoutes );
app.use("/api/requests", requestRoutes);
app.use("/api/messages" , messageRoutes )

const PORT = process.env.PORT || 5000 ;
const HOST = 'localhost' ;

app.listen( PORT , ()=> {
    console.log(`Server is running on  http://${HOST}:${PORT}`)
})
