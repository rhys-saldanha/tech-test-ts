import {DataService} from './dataService';
import {Comment, Post, User, UserWithPosts} from './models';
import {isUnique} from './utils';

export class UserService {
    constructor(private dataService: DataService) {
    }

    async getUsersWithPopularPosts(commentThreshold: number): Promise<UserWithPosts[]> {
        let users = await this.dataService.getUsers();
        let posts = await this.dataService.getPosts();
        let comments = await this.dataService.getComments();

        let popularPostUserIds = posts
            .filter(post => this.isPopular(post, commentThreshold, comments))
            .map(post => post.userId);

        let popularUsers = popularPostUserIds
            .filter(isUnique(popularPostUserIds))
            .map(userId => this.getUserWithPosts(userId, users, posts));

        return Promise.resolve(popularUsers);
    }

    private isPopular(post: Post, commentThreshold: number, comments: Comment[]): boolean {
        return comments
            .filter(comment => comment.postId === post.id)
            .length >= commentThreshold;
    }

    private getUserWithPosts(userId: number, users: User[], posts: Post[]): UserWithPosts {
        const user = users.find(user => user.id === userId)!;
        return {
            ...user,
            posts: posts.filter(post => post.userId === userId)
        };
    }
}
