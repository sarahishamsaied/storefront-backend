import { myFunc } from '../index';
import supertest from 'supertest';
import app from '../index';
const request = supertest(app);
describe('Testing Users', () => {
  it('Should return an error when an invalid id is passed', async () => {
    const res = await request.get('/api/user/1000');
    expect(res.body.message).toBe('User with id = 1000 is not found');
  });
  it('Should return an error when user is not found', async () => {
    const res = await request.delete('/api/user/1000');
    expect(res.body.message).toBe('User not found');
  });
  it('Should return an error when an email that doesnt exist is entered', async () => {
    const res = await request.post('/api/auth/signin').send({
      user_email: 'doesntexist',
      user_password: 'test',
    });
    expect(res.body.message).toBe('User not found');
  });
  it('Should return an error when an email that doesnt exist is entered', async () => {
    const res = await request.post('/api/auth/signin').send({
      user_email: 'doesntexist',
      user_password: 'test',
    });
    expect(res.body.message).toBe('User not found');
  });
  it('Should return an error when an input field is missing when signing up', async () => {
    const res = await request.post('/api/auth/signup').send({
      firstname: '',
      lastname: '',
      user_email: '',
      user_password: '',
    });
    expect(res.body.message).toBe('All fields must be filled');
  });
});
