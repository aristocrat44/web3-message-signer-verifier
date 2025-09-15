import { Router } from 'express';
import { VerifyController } from '../controllers/verify.controller';

const router = Router();

router.post('/verify-signature', VerifyController.verifySignature);

export default router;