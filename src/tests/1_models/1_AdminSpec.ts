import { AdminStore } from '../../models/Admin';

const store = new AdminStore();

describe('Admin Model', () => {
  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'admin2',
      password: '123456',
    });
    expect(result.id).toBeGreaterThan(1);
    expect(result.username).toEqual('admin2');
  });

  it('index method should return a list of admin', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    expect(result.id).toEqual(1);
    expect(result.username).toEqual('admin');
  });

  it('authenticate method for admin', async () => {
    const result = await store.authenticate('admin', '123456');
    expect(result?.id).toEqual(1);
    expect(result?.username).toEqual('admin');
  });
});
