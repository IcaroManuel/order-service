import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/orders/domain/events/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedHandler implements IEventHandler<OrderCreatedEvent> {
  handle(event: OrderCreatedEvent) {
    console.log(
      `[RECEIVED EVENT]: Order ${event.orderId} created for client ${event.customerId}.`,
    );
  }
}
