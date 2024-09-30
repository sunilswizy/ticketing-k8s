import { Subjects, TicketCreatedEvent } from "@swizy-packages/common";
import Listener from "@swizy-packages/common/build/events/base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName: string = 'queue-group';
    
    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        console.log("Message", data);

        msg.ack();
    };
}