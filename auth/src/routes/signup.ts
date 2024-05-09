import express from 'express';
import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express';
import { RequestValidationError } from '../errors/validation-error';
import { DatabaseError } from '../errors/database-error';

const router = express.Router();

const validator = [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
];

router.post('/api/users/signup', validator, (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    throw new DatabaseError();
 
    res.send('biu biu signup')
});

export { router as signupRouter };