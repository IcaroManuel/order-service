import { OrderItem } from 'src/orders/domain/entities/order.entity';

export class CreateOrderCommand {
  constructor(
    public readonly customerId: string,
    public readonly items: OrderItem[],
  ) {}
}
