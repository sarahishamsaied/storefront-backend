import { BaseUser, User } from '../models/user.model';
import UserStore from '../models/user.model';

const UserStoreInstance = new UserStore();

describe('User Model', () => {
  const user: BaseUser = {
    user_email: 'johndoe@gmail.com',
    firstname: 'john',
    lastname: 'doe',
    user_password: 'userpassword123',
  };

  async function createUser(user: BaseUser) {
    return UserStoreInstance.create(user);
  }

  it('should have an index method', () => {
    expect(UserStoreInstance.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(UserStoreInstance.getUser).toBeDefined();
  });

  it('should have a create method', () => {
    expect(UserStoreInstance.create).toBeDefined();
  });

  it('should have a remove method', () => {
    expect(UserStoreInstance.remove).toBeDefined();
  });

  it('create method should create a user', async () => {
    const createdUser: User = await createUser(user);

    if (createdUser) {
      const { user_email, firstname, lastname } = createdUser;
      expect(user_email).toBe(user.user_email);
      expect(firstname).toBe(user.firstname);
      expect(lastname).toBe(user.lastname);
    }
  });
  it('index method should return a list of users', async () => {
    const userList = await UserStoreInstance.index();
    expect(userList.length).toEqual(2);
  });
});
