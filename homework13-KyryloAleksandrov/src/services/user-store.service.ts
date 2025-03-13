import axios, { AxiosPromise } from 'axios';
import { UserDto } from '../models/user.dto';

export class UserStoreService {
    public constructor(private url: string) {}

    public createUsersWithList = (users: UserDto[]): AxiosPromise => {
        return axios.request({
            baseURL: this.url,
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            url: '/v2/user/createWithList',
            data: users
        });
    };
}
