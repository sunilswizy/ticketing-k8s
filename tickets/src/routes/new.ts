import { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from "@swizy-packages/common";
import { body } from "express-validator";
import { Ticket } from "../models/tickets";
import { TicketCreatedPublisher } from "../events/publisher/ticket-creator-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = Router();

const validations = [
    body('title').trim().notEmpty().withMessage("Enter Title"),
    body('price')
        .notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price must be a number")
        .isFloat({ gt: 0 }).withMessage("Price must be greater than 0")
]
 

router.post("/api/tickets", requireAuth, validations, validateRequest, async (req: Request, res: Response) => {

    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser?.id!
    });

    await ticket.save();

    new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId
    })

    res.status(201).send(ticket);
});


export { router as createTicketRouter };