import { action, makeObservable, observable, runInAction } from 'mobx';
import { fetchUsers } from '../services/usersService';
import { QueryParams, User } from '../types';
import { DEFAULT_LIMIT } from '../services/constants';

export class UsersStore {
  public users: User[];
  public numberOfRequests: number;
  constructor(users = [], numberOfRequests = 0) {
    this.users = users;
    this.numberOfRequests = numberOfRequests;
    makeObservable(this, {
      users: observable,
      numberOfRequests: observable,
      addUser: action,
      loadUsers: action,
    });
    runInAction(() => this.loadUsers({ limit: DEFAULT_LIMIT }));
  }

  addUser = (user: User) => {
    this.users.push(user);
  };

  loadUsers = async (options: QueryParams) => {
    try {
      this.numberOfRequests++;
      const response = await fetchUsers(options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const processedUsers: User[] = data.users.map((user: User) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.image,
          image: user.image,
          company: {
            city: user.company.city,
            name: user.company.name,
            title: user.company.title,
          },
        }));
        console.log(processedUsers);
        this.users = processedUsers;
      } else {
        if (response.status === 404) {
          console.warn('Users not found.');
        } else if (response.status === 401) {
          console.warn('Unauthorized access.');
        } else {
          throw new Error(`Failed to fetch users. Status: ${response.status}`);
        }
      }

      this.numberOfRequests--;
    } catch (error) {
      console.log('Error - ', error);
    }
  };
}

export const usersStore = new UsersStore();
