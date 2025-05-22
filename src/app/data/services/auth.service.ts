import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

export class AuthModel {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  async createUser(payload: UserModel): Promise<void> {
    try {
      const response = await this.http.post<UserModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/users', payload).toPromise();
    } catch (error) {
    }
  }

  async putUser(payload: UserModel): Promise<void> {
    try {
      const response = await this.http.patch<UserModel>(`https://esg-project-server-8ce870babc5e.herokuapp.com/users/${payload.idUser}`, payload).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async auth(payload: AuthModel): Promise<any> {
    try {
      return await this.http.post<UserModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/auth', payload).toPromise();
    } catch (error) {
    }
  }

  async listUserByRank(): Promise<UserModel[]> {
    try {
      return await this.http.get<UserModel[]>(`https://esg-project-server-8ce870babc5e.herokuapp.com/users/rank`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(id): Promise<UserModel> {
    try {
      return await this.http.get<UserModel>(`https://esg-project-server-8ce870babc5e.herokuapp.com/users/${id}`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const userToken = localStorage.getItem('userToken');
      return userToken === null || userToken === undefined ? false : true;
    } catch (error) {
      return false;
    }
  }

}
