import Publisher from "@swizy-packages/common/build/events/base-publisher";
import { Subjects, TicketCreatedEvent } from "@swizy-packages/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
};
