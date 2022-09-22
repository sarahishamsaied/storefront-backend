import { BaseOrder, Order, OrderStore, Status } from '../models/order.model';

const OrderStoreInstance = new OrderStore();

describe('Order Model', () => {
  let createdOrder: Order;
  const order: BaseOrder = {
    products: [
      {
        product_id: '1',
        quantity: 535,
      },
    ],
    user_id: '1',
    status: Status.ACTIVE,
  };
  async function createOrder(order: BaseOrder) {
    return OrderStoreInstance.create(order);
  }
  it('should have an index method', () => {
    expect(OrderStoreInstance.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(OrderStoreInstance.show).toBeDefined();
  });

  it('should have a add method', () => {
    expect(OrderStoreInstance.create).toBeDefined();
  });

  it('add method should add a order', async () => {
    createdOrder = await createOrder(order);
    expect(createdOrder).toEqual({
      id: 2 as unknown as string,
      user_id: 1 as unknown as string,
      status: Status.ACTIVE,
      products: [
        {
          product_id: '1',
          quantity: 535,
        },
      ],
    });
  });
  it('index method should return all orders', async () => {
    const orderList = await OrderStoreInstance.index();
    expect(orderList.length).toEqual(2);
  });

  it('show method should return the correct order', async () => {
    const orderFromDb = await OrderStoreInstance.show('2');
    expect(orderFromDb).toEqual(createdOrder);
  });
});
