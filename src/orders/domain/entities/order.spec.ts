import { randomUUID } from 'crypto';
import { Order } from 'src/orders/domain/entities/order.entity';

describe('OrderEntity', () => {
  it('should be calculate totalPrice by order items', () => {
    const customerId = 'user-123';
    const items = [
      { sku: 'SKU-01', name: 'Mouse', price: 150.0, quantity: 2 },
      { sku: 'SKU-02', name: 'Teclado', price: 250.0, quantity: 1 },
    ];

    const order = new Order(
      randomUUID(),
      customerId,
      items,
      'PENDING',
      new Date(),
    );

    expect(order.calculateTotal()).toBe(550.0);
  });

  it('Should be an initial status equal to PENDING when create a new order', () => {
    const order = new Order(
      randomUUID(),
      randomUUID(),
      [],
      'PENDING',
      new Date(),
    );

    expect(order.status).toBe('PENDING');
  });

  it('Should be throw error if total price have value negative', () => {
    const items = [{ sku: 'X', name: 'Erro', price: -100, quantity: 1 }];

    expect(() => {
      new Order(randomUUID(), randomUUID(), items, 'PENDING', new Date());
    }).toThrow();
  });
});
