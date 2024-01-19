import { action, makeObservable, observable, runInAction } from 'mobx';
import { fetchUsers } from '../services/users_service';
import { QueryParams, User } from '../types';
import { DEFAULT_LIMIT, LIMIT_10 } from '../services/constants';

export class UsersStore {
  public users: User[];
  public numberOfRequests: number;
  constructor(users = [], numberOfRequests = 0) {
    this.users = users;
    this.numberOfRequests = numberOfRequests;
    makeObservable(this, {
      users: observable,
      numberOfRequests: observable,
      addUsers: action,
      setUsers: action,
      loadUsers: action,
    });
    runInAction(() => this.loadUsers({ limit: LIMIT_10 }, true));
  }

  addUsers = (users: User[]) => {
    this.users.push(...users);
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  loadUsers = async (options: QueryParams, isResetUsers: boolean = false) => {
    console.log('loadUsers');
    try {
      this.numberOfRequests++;
      const response = await fetchUsers(options);
      if (response.ok) {
        const data: { users: User[] } = await response.json();
        if (!('users' in data)) {
          throw Error('Unexpected data structure');
        }
        const processedUsers = this.processUsers(data.users);
        console.log(processedUsers);
        if (isResetUsers) {
          this.setUsers(processedUsers);
        } else {
          this.addUsers(processedUsers);
        }
        this.numberOfRequests--;
        return processedUsers;
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

  processUsers(users: User[]) {
    return users.map((user: User) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      image: user.image,
      company: {
        address: {
          city: user.company.address.city,
        },
        name: user.company.name,
        title: user.company.title,
      },
    }));
  }
}

export const usersStore = new UsersStore();
