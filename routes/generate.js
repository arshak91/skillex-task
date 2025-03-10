import { Router } from 'express';
import { generate } from '../controllers/combinationController.js';
const router = Router();

/* POST generate combinations. */
router.post('/', generate);

export default router;
