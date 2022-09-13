import { Order, OrderStore, Status } from '../models/order.model';
import ProductStore, { Product } from '../models/product.model';
import UserStore, { User } from '../models/user.model';
const userStore = new UserStore();
const store = new OrderStore();
describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a show users orders method', () => {
    expect(store.showUserOrders).toBeDefined();
  });

  it('should have an add product to order method', () => {
    expect(store.addProduct).toBeDefined();
  });
});

// ================ Testing Mehtods =======================

describe('Order Model', () => {
  let user_id: number, product_id: number;
  beforeAll(async () => {
    const user: User = await userStore.create({
      user_email: 'user@gmail.com',
      user_password: 'userpass',
      firstname: 'user firstname',
      lastname: 'user lastname',
    });
    user_id = user.id;
    const productStore = new ProductStore();
    const product: Product = await productStore.create({
      productname: 'testproduct',
      price: 12,
      category: 'category',
    });
    product_id = product.id;
  });
  //   it('create method should create an order', async () => {
  //     const addedOrder = await store.create(user_id, Status.ACTIVE);
  //     console.log(addedOrder);
  //     expect(addedOrder).toEqual({
  //       id: addedOrder.id,
  //       user_id: addedOrder.user_id,
  //       status: Status.ACTIVE,
  //     });
  //   });
});
