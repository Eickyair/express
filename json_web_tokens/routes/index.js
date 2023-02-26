import { Router } from "express";
import { dashboard, login } from "../controllers/index.js"
import authorizationByToken from "../middleware/auth.js";
const router = Router()
router.route('/dashboard').get(authorizationByToken, dashboard)
router.route('/login').post(login)
export default router