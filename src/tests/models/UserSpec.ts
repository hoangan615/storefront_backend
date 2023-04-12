import { User, UserStore } from '../../models/User';

const store = new UserStore();

describe('User Model', () => {
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

  it('create method should add a book', async () => {
    const result = await store.create({
      username: 'anvh',
      password: '123456',
      first_name: 'An',
      last_name: 'Vo',
      id: undefined,
    });
    expect(result.id).toEqual(1);
    expect(result.username).toEqual('anvh');
    expect(result.first_name).toEqual('An');
    expect(result.last_name).toEqual('Vo');
  });

  // it('index method should return a list of books', async () => {
  //   const result = await store.index();
  //   expect(result).toEqual([
  //     {
  //       id: '1',
  //       title: 'Bridge to Terabithia',
  //       totalPages: 250,
  //       author: 'Katherine Paterson',
  //       summary: 'Childrens',
  //     },
  //   ]);
  // });

  // it('show method should return the correct book', async () => {
  //   const result = await store.show('1');
  //   expect(result).toEqual({
  //     id: '1',
  //     title: 'Bridge to Terabithia',
  //     totalPages: 250,
  //     author: 'Katherine Paterson',
  //     summary: 'Childrens',
  //   });
  // });

  // it('delete method should remove the book', async () => {
  //   store.delete('1');
  //   const result = await store.index();

  //   expect(result).toEqual([]);
  // });
});
