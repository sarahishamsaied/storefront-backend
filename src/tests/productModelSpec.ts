import { Order, OrderStore, Status } from '../models/order.model';
import ProductStore, { BaseProduct, Product } from '../models/product.model';
import UserStore from '../models/user.model';
const store = new ProductStore();
describe('Order Models to be defined', () => {
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
    expect(store.delete).toBeDefined();
  });

  it('should have an add product to order method', () => {
    expect(store.showByCategory).toBeDefined();
  });
});
describe('Products Models Methods Functionality', () => {
  const product: BaseProduct = {
    productname: 'product',
    price: 12,
    category: 'test',
  };
  let addedProduct: Product;
  it('create method should create and return product object', async () => {
    addedProduct = await store.create(product);
    console.log(
      '=================== ADDED PRODUCT IS ==================',
      addedProduct
    );
    expect(addedProduct).toEqual({ id: addedProduct.id, ...product });
    await store.delete(addedProduct.id);
  });
  it('index method should return an array ', async () => {
    const addedProduct: Product = await store.create(product);
    const result = await store.index();
    expect(result).toEqual([addedProduct]);
  });
  it('show method should return a product object when a valid is is entered', () => {
    store.show(1).then((result) => {
      expect(result).toEqual({ id: addedProduct.id, ...product });
    });
  });
  afterAll(() => {
    store.delete(addedProduct.id);
  });
});
