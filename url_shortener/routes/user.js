import express from "express"
import { usersingup,loginsetup } from "../controllers/user.js";

const router=express.Router();

router.post('/',usersingup)
router.post('/login',loginsetup)

export default router