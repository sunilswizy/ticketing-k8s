import Publisher from "@swizy-packages/common/build/events/base-publisher";
import { Subjects, TIcketUpdatedEvent } from "@swizy-packages/common";

export class TicketUpdatedPublisher extends Publisher<TIcketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
};
