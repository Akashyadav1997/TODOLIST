import express from "express";
import mongoose from "mongoose";
import { config as configDotenv } from "dotenv";
import router from "./routes/user.js";
import cors from "cors";
configDotenv();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
);
app.use(router);
app.use("/", (req, res, next) => {
	res.send("This is Akash To Do APP Server side Code");
});

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("connected to mongoDB");
		app.listen(process.env.PORT);
	})
	.catch((err) => {
		console.log(err);
		console.log("error while connecting");
	});
