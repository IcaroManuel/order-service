import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/orders/domain/events/order-created.event';
import { SnsEventPublisher } from 'src/orders/infrastructure/messaging/sns-event-publisher';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly snsPublisher: SnsEventPublisher) {}

  async handle(event: OrderCreatedEvent) {
    await this.snsPublisher.publish(event);
  }
}
