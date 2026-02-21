import { v4 as uuidv4 } from 'uuid';

export interface OrderItem {
  sku: string;
  name: string;
  price: number;
  quantity: number;
}
export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly status: 'PENDING' | 'PAID' | 'CANCELLED',
    public readonly createdAt: Date,
  ) {}

  public calculateTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  static create(customerId: string, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error('A order require items');
    return new Order(
      (uuidv4 as () => string)(),
      customerId,
      items,
      'PENDING',
      new Date(),
    );
  }
}
