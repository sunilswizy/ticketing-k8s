import { Request, Response, Router } from "express";
import { requireAuth, validateRequest, NotFoundError, NotAuthorizedError } from "@swizy-packages/common";
import { Ticket } from "../models/tickets";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publisher/ticket-update-publisher";
import { natsWrapper } from "../nats-wrapper";


const validations = [
    body('title').trim().notEmpty().withMessage("Enter Title"),
    body('price')
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number")
        .isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
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

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    });

    res.status(200).send(ticket);
});


export { router as UpdateTicketRouter }