import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MediaModel} from "../models/media.model";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient
  ) { }

  async create(payload: MediaModel): Promise<void> {
    try {
      const response = await this.http.post<MediaModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/medias', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<MediaModel[]> {
    try {
      return await this.http.get<MediaModel[]>('https://esg-project-server-8ce870babc5e.herokuapp.com/medias').toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
