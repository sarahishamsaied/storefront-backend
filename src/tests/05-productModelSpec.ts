import { BaseProduct, Product } from '../models/product.model';
import ProductStore from '../models/product.model';

const ProductStoreInstance = new ProductStore();

describe('Product Model', () => {
  const product: BaseProduct = {
    productname: 'Product Test',
    price: 2000,
    category: 'test cat',
  };

  async function createProduct(product: BaseProduct) {
    return ProductStoreInstance.create(product);
  }

  async function deleteProduct(id: string) {
    return ProductStoreInstance.delete(id);
  }

  it('should have an index method', () => {
    expect(ProductStoreInstance.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(ProductStoreInstance.show).toBeDefined();
  });

  it('should have a add method', () => {
    expect(ProductStoreInstance.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(ProductStoreInstance.delete).toBeDefined();
  });

  it('add method should add a product', async () => {
    const createdProduct: Product = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });
  });
  it('index method should return a list of products', async () => {
    const productList = await ProductStoreInstance.index();
    expect(productList.length).toEqual(3);
  });

  //   it('show method should return the correct product', async () => {
  //     const createdProduct: Product = await createProduct(product);
  //     const productFromDb = await ProductStoreInstance.show(createdProduct.id);
  //     expect(productFromDb).toEqual(createdProduct);
  //     await deleteProduct(createdProduct.id);
  //   });
});
