import { UserStore } from '../../models/User';

const store = new UserStore();

describe('User Model', () => {
  beforeAll(async () => {
    await store.create({
      username: 'anvh',
      password: '123456',
      first_name: 'An',
      last_name: 'Vo',
    });
  });

  it('should have a index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a user', async () => {
    const result = await store.create({
      username: 'anvh1',
      password: '123456',
      first_name: 'An',
      last_name: 'Vo',
    });
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.username).toEqual('anvh1');
    expect(result.first_name).toEqual('An');
    expect(result.last_name).toEqual('Vo');
  });

  it('index method should return a list of user', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    expect(result.username).toEqual('anvh');
    expect(result.first_name).toEqual('An');
    expect(result.last_name).toEqual('Vo');
  });

  it('delete method should remove the user', async () => {
    await store.delete(2);
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
