import { Subjects, TicketCreatedEvent } from "@swizy-packages/common";
import Publisher from "@swizy-packages/common/build/events/base-publisher";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
};