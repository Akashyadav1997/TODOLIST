import express from "express";
import {
	createEvent,
	createUser,
	deleteAll,
	deleteEvent,
	editEventHandler,
	loginUser,
	updateCompletion,
} from "../controller/user.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

// router.post("/createuser", upload.single("avatar"), createUser);
router.post("/createuser", createUser);
router.post("/loginuser", loginUser);
router.post("/createevent", createEvent);
router.post("/editEvent", editEventHandler);
router.post("/updateCompletion", updateCompletion);
router.post("/deleteEvent", deleteEvent);
router.post("/deleteAll", deleteAll);
export default router;
