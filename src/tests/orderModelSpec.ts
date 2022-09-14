import { BaseUser, User } from '../models/user.model';
import UserStore from '../models/user.model';

const UserStoreInstance = new UserStore();

describe('User Model', () => {
  const user: BaseUser = {
    user_email: 'hansmeier',
    firstname: 'Hans',
    lastname: 'Meier',
    user_password: 'password123',
  };

  async function createUser(user: BaseUser) {
    return UserStoreInstance.create(user);
  }

  async function deleteUser(id: number) {
    return UserStoreInstance.remove(id);
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

    await deleteUser(createdUser.id);
  });

  it('index method should return a list of users', async () => {
    const createdUser: User = await createUser(user);
    const userList = await UserStoreInstance.index();

    expect(userList).toEqual([createdUser]);

    await deleteUser(createdUser.id);
  });

  it('show method should return the correct users', async () => {
    const createdUser: User = await createUser(user);
    const userFromDb = await UserStoreInstance.getUser(createdUser.id);

    expect(userFromDb).toEqual(createdUser);

    await deleteUser(createdUser.id);
  });

  it('remove method should remove the user', async () => {
    const createdUser: User = await createUser(user);

    await deleteUser(createdUser.id);

    const userList = await UserStoreInstance.index();

    expect(userList).toEqual([]);
  });
});
