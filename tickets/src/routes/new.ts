import { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from "@swizy-packages/common";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";

const router = Router();

const validations = [
    body('title').trim().notEmpty().withMessage("Enter Title"),
    body('price').isFloat({ gt: 0 }).withMessage("Price Must be greater then 0")
]
 

router.post("/api/tickets", requireAuth, validations, validateRequest, async (req: Request, res: Response) => {

    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser?.id!
    });

    await ticket.save();

    res.status(201).send(ticket);
});


export { router as createTicketRouter };