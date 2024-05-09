import express from 'express';

const router = express.Router();

router.get('/api/users/currentUser', (req, res) => {
    res.send('biu biu currentUser')
});

export { router as currentUserRouter };