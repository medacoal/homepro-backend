import {register} from "../../controllers/auth.js";
import express from "express"
import { authCheck } from "../../middlewares/auth.js";
const router = express.Router();

router.post('/register',authCheck, register)

export default router;