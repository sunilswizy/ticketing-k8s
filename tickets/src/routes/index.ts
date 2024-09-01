import { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from "@swizy-packages/common";
import { Ticket } from "../models/tickets";


const router = Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.status(200).send(tickets);
});


export { router as IndexTicketRouter }