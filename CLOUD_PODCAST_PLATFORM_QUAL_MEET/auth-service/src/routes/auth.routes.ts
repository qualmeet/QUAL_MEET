import {Router} from "express";
import { signup, login, getMe } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { verifyCSRF } from "../middlewares/csrf";
import { SignupSchema,LoginSchema } from "../dto/auth.dto";
import { refresh,logout} from "../controllers/auth.controller";

const router=Router();

router.post("/signup",validate(SignupSchema),signup);
router.post("/login",validate(LoginSchema),login);
router.post("/refresh",verifyCSRF,refresh);
router.post("/logout",verifyCSRF,logout);
router.get("/me",getMe);

export default router;