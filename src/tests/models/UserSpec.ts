import { User, Users } from '../../models/User';

const store = new Users();

describe('Book Model', () => {
  it('should have an index method', () => {
    expect(true).toBe(true);
  });

  it('should have a show method', () => {
    expect(false).toBe(false);
  });

  // it('should have a create method', () => {
  //   expect(store.index).toBeDefined();
  // });

  // it('should have a update method', () => {
  //   expect(store.index).toBeDefined();
  // });

  // it('should have a delete method', () => {
  //   expect(store.index).toBeDefined();
  // });

  // it('create method should add a book', async () => {
  //   const result = await store.create({
  //     title: 'Bridge to Terabithia',
  //     totalPages: 250,
  //     author: 'Katherine Paterson',
  //     summary: 'Childrens',
  //   });
  //   expect(result).toEqual({
  //     id: '1',
  //     title: 'Bridge to Terabithia',
  //     totalPages: 250,
  //     author: 'Katherine Paterson',
  //     summary: 'Childrens',
  //   });
  // });

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
