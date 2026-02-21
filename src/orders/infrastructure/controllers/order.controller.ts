import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/orders/application/commands/create-order.command';
import { OrderItem } from 'src/orders/domain/order.entity';

class CreateOrderDto {
  customerId: string;
  items: OrderItem[];
}

@Controller('orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const command = new CreateOrderCommand(dto.customerId, dto.items);
    const orderId: string = await this.commandBus.execute(command);
    return {
      message: 'Order created success',
      orderId,
    };
  }
}
