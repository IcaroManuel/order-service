import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderHandler } from './application/commands/create-order.handler';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';
import { OrderCreatedHandler } from './application/events/order-created.handler';

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    CreateOrderHandler,
    OrderCreatedHandler,
    {
      provide: 'IOrderRepository',
      useClass: DynamoOrderRepository,
    },
  ],
})
export class OrdersModule {}
