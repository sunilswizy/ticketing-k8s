import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { Users } from '../models/users';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import { sign } from 'jsonwebtoken';

const router = express.Router();

const validations = [
    body('email').isEmail().withMessage("Enter Valid Email"),
    body('password').trim().notEmpty().withMessage("Enter password")
];

router.post('/api/users/signin', validations, validateRequest, async (req: Request, res: Response) => {

    const { email, password } = req.body;
    
    console.log("Email")

    const exitingUser = await Users.findOne({ 
        email
    });

    if(!exitingUser) {
        throw new BadRequestError('Invalid Credentails');
    };

    const passwordMatch = await Password.compare(exitingUser.password, password);

    if(!passwordMatch) {
        throw new BadRequestError('Email and password don"t match');
    }


    const userJWT = sign({
        id: exitingUser.id,
        email: exitingUser.email,
    }, process.env.JWT_KEY!);

    // store in session
    req.session = {
        jwt: userJWT
    };

    res.status(200).send(exitingUser);
});

export { router as signinRouter };