import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { Inject, Logger } from '@nestjs/common';
import type { IOrderRepository } from 'src/orders/domain/order-repository.interface';
import { Order } from 'src/orders/domain/order.entity';
import { OrderCreatedEvent } from 'src/orders/domain/events/order-created.event';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  private readonly logger = new Logger(CreateOrderHandler.name);

  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    try {
      const { customerId, items } = command;
      const order = Order.create(customerId, items);
      console.log(`Created order with total by: ${order.calculateTotal()}`);
      await this.orderRepository.save(order);

      this.eventBus.publish(
        new OrderCreatedEvent(
          order.id,
          order.customerId,
          order.calculateTotal(),
        ),
      );
      return order.id;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));

      this.logger.error(
        JSON.stringify({
          message: 'Erro ao criar pedido',
          customerId: command.customerId,
          error: err.message,
          stack: err.stack,
        }),
      );
      throw error;
    }
  }
}
