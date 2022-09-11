import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Testing Products', () => {
  it('should return an error when a product is not found', async () => {
    const response = await request.get('/api/product/1000');
    expect(response.body.message).toBe('Cannot find product');
  });
  it('should return an error when a category is not found', async () => {
    const response = await request.get('/api/product/category/invalidcategory');
    expect(response.body.message).toBe('Cannot find product(s)');
  });
  it('should return success message when getting all products', async () => {
    const response = await request.get('/api/products');
    console.log(response.body);
    expect(response.body.message).toBe('success');
  });
  it('should return error message when at least one field is empty', async () => {
    const response = await request.post('/api/product').send({
      productname: '',
      category: '',
      price: '',
    });
    expect(response.body.message).toBe('Fields cannot be empty');
  });
  it('should return error message when at when deleting a product with an invalid id is entered', async () => {
    const response = await request.delete('/api/product/1000');
    console.log('rslt is', response.body);
    expect(response.body.message).toBe('Product with id = 1000 is not found');
  });
});
