import {Router} from "express";
import { addUser } from "../controllers";

const router = Router();

router.post('/', addUser);

export default router;