import express from 'express';
import { body } from 'express-validator';
import { Request, Response } from 'express';
import { Users } from '../models/users';
import { BadRequestError, validateRequest  } from '@swizy-packages/common';
import { sign } from 'jsonwebtoken';

const router = express.Router();

const validator = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
];

router.post('/api/users/signup', validator, validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const existingUsers = await Users.findOne({
        email
    });

    if (existingUsers) {
        throw new BadRequestError('Email is already in use');
    };

    const user = Users.build({
        email,
        password
    });

    await user.save();

    const userJWT = sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!);

    // store in session
    req.session = {
        jwt: userJWT
    };
    

    res.status(200).send(user);
});

export { router as signupRouter };