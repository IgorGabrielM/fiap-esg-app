import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export class PostModel {
    idPost?: number;
    title: string;
    text?: string;
    imageUrl?: string;
    likesCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    insterestsId?: number[];
    user?: UserModel;
    commentsCount: number;
    comments: CommentModel[];
    likes: UserModel[];
}
