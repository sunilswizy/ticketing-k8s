import { Request, Response, Router } from "express";
import { requireAuth, validateRequest, NotFoundError } from "@swizy-packages/common";
import { Ticket } from "../models/tickets";

const router = Router();


router.get('/api/tickets/:id', async (req: Request, res: Response) => {

    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if(!ticket) throw new NotFoundError();


    return res.status(200).send(ticket);
});


export { router as ShowTicketsRouter };