import { BaseUser, User } from '../models/user.model';
import UserStore from '../models/user.model';

const store = new UserStore();

describe('User Model', () => {
  const user: BaseUser = {
    firstname: 'Hans',
    lastname: 'Zimmer',
    user_email: 'hanszimmer@gmail.com',
    user_password: 'password123',
  };
  let createdUser: User;
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.login).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(store.remove).toBeDefined();
  });

  it('create method should create a user', async () => {
    store.create(user).then((res) => {
      createdUser = res;
      if (createdUser) {
        const { user_email, firstname, lastname } = createdUser;
        expect(user_email).toBe(user.user_email);
        expect(firstname).toBe(user.firstname);
        expect(lastname).toBe(user.lastname);
      }
      console.log(createdUser);
    });
  });
});
