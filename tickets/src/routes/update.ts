import { Request, Response, Router } from "express";
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from "@swizy-packages/common";
import { Ticket } from "../models/tickets";
import { body } from "express-validator";


const validations = [
    body('title').trim().notEmpty().withMessage("Enter Title"),
    body('price').isFloat({ gt: 0 }).withMessage("Price Must be greater then 0")
];

const router = Router();

router.put('/api/tickets/:id', requireAuth, validations, validateRequest, async (req: Request, res: Response) => {
    const { id } = req.params;
    const { price, title } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) throw new NotFoundError();

    if (ticket.userId != req.currentUser?.id) {
        throw new NotAuthorizedError();
    }

    ticket.set({
        title,
        price
    });

    await ticket.save();

    res.status(200).send(ticket);
});


export { router as UpdateTicketRouter }