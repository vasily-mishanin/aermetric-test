import { action, makeObservable, observable, runInAction } from 'mobx';
import { fetchUsers } from '../services/users_service';
import { LOAD_TYPE, QueryParams, User } from '../types';
import { DEFAULT_LIMIT, LIMIT_10 } from '../services/constants';

export class UsersStore {
  public users: User[];
  public totalResults: number;
  public numberOfRequests: number;
  constructor(users = [], totalResults = 0, numberOfRequests = 0) {
    this.users = users;
    this.totalResults = totalResults;
    this.numberOfRequests = numberOfRequests;
    makeObservable(this, {
      users: observable,
      totalResults: observable,
      numberOfRequests: observable,
      addUsers: action,
      setUsers: action,
      loadUsers: action,
    });
    //runInAction(() => this.loadUsers({ limit: LIMIT_10 }, LOAD_TYPE.RESET));
  }

  addUsers = (users: User[]) => {
    const filteredUsers = users.filter((loadedUser) => {
      if (!this.users.some((user) => user.id === loadedUser.id)) {
        return loadedUser;
      }
    });
    this.users.push(...filteredUsers);
  };

  setUsers = (users: User[]) => {
    this.users = users;
  };

  loadUsers = async (
    queryParams: QueryParams,
    loadType: LOAD_TYPE = LOAD_TYPE.ADD,
    path?: string
  ) => {
    console.log('loadUsers');
    try {
      this.numberOfRequests++;
      const response = await fetchUsers(path, queryParams); // in no path then path=/users
      if (response.ok) {
        const data: { users: User[]; total: number } = await response.json();
        if (!('users' in data)) {
          throw Error('Unexpected data structure');
        }
        const processedUsers = this.processUsers(data.users);
        console.log(processedUsers);
        if (loadType === LOAD_TYPE.RESET) {
          runInAction(() => {
            this.setUsers(processedUsers);
            this.totalResults = data.total;
          });
        } else if (loadType === LOAD_TYPE.ADD) {
          runInAction(() => {
            this.addUsers(processedUsers);
            this.totalResults = data.total;
          });
        }
        runInAction(() => this.numberOfRequests--);
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
