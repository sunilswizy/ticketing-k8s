import express from 'express';

const router = express.Router();

import { currentUser } from '../middlewares/current-user';

router.get('/api/users/currentUser', currentUser, (req, res) => {
    res.send({currentUser: req.currentUser})
});

export { router as currentUserRouter };