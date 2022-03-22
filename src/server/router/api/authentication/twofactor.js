import express from 'express';

import { isAuthenticated } from '../../../middlewares/authentication';

const router = express.Router();

router.get('/authentication/twofactor/enrol', isAuthenticated, async (req, res) => {
  // TODO: implementation
});

export default router;
