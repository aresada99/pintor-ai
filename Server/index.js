import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import dalleRoutes from './routes/dalleRoute.js'

dotenv.config();

// MONGO DB CONNECTION
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to database successfuly");
    })
    .catch((err) => {
        console.log(err);
    });

// EXPRESS INIT
const app = express();
app.use(express.json());

// CORS SETTINGS
const corsOrigins = [];
for (let i = 1; process.env[`ORIGIN_${i}`]; i++) {
    corsOrigins.push(process.env[`ORIGIN_${i}`]);
}

const corsOptions = {
    origin: corsOrigins
};
app.use(cors(corsOptions));


// ROUTE MIDDLEWARES
app.use("/api/v1/dalle", dalleRoutes)


// PORT SETTINGS
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})


// next() ERROR HANDLING
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        statusCode: err.status || 500,
        message: err.message || 'Internal Server Error'
    });
});