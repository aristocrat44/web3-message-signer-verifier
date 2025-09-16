import { Router } from "express";
import { verifySignatureHandler } from "../controllers/verify.controller";

const router = Router();

router.post("/verify-signature", verifySignatureHandler);

export default router;
