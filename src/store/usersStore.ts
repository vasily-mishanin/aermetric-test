import { action, makeObservable, observable } from 'mobx';

export type User = {
  name: string;
};

export class UsersStore {
  public users: User[];
  constructor(users = [{ name: 'Alex' }]) {
    this.users = users;
    makeObservable(this, {
      users: observable,
      addUser: action,
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }
}

export const usersStore = new UsersStore();
