import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  async create(payload: CommentModel): Promise<void> {
    try {
      const response = await this.http.post<CommentModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/post-comments', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<void> {
    try {
      const response = await this.http.get<CommentModel>('https://esg-project-server-8ce870babc5e.herokuapp.com/posts').toPromise();
    } catch (error) {
    }
  }

}
