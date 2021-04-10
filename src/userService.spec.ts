import {describe, it} from 'mocha';
import {expect} from 'chai';
import {UserService} from './userService';
import {DataService} from './dataService';
import {Comment, Post, User} from './models';


describe('UserService', () => {
    const commentThreshold = 2;
    it('no data', async () => {
        const mockDataService: DataService = getMockDataService([], [], []);

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.have.length(0);
    });

    it('no posts', async () => {
        const mockDataService: DataService = getMockDataService(
            [{id: 1}],
            [],
            []
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.have.length(0);
    });

    it('no comments', async () => {
        const mockDataService: DataService = getMockDataService(
            [{id: 1}],
            [{id: 10, userId: 1}],
            []
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.have.length(0);
    });

    it('not enough comments', async () => {
        const mockDataService: DataService = getMockDataService(
            [{id: 1}],
            [{id: 10, userId: 1}],
            [{id: 100, postId: 10}]
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.have.length(0);
    });

    it('comments on threshold', async () => {
        const expectedUsers = [{id: 1}];
        const mockDataService: DataService = getMockDataService(
            expectedUsers,
            [{id: 10, userId: 1}],
            [{id: 100, postId: 10}, {id: 101, postId: 10}]
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.deep.equal(expectedUsers);
    });

    it('comments above threshold', async () => {
        const expectedUsers = [{id: 1}];
        const mockDataService: DataService = getMockDataService(
            expectedUsers,
            [{id: 10, userId: 1}],
            [{id: 100, postId: 10}, {id: 101, postId: 10}, {id: 102, postId: 10}]
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.deep.equal(expectedUsers);
    });

    it('multiple posts, one user', async () => {
        const expectedUsers = [{id: 1}];
        const mockDataService: DataService = getMockDataService(
            expectedUsers,
            [{id: 10, userId: 1}, {id: 20, userId: 1}],
            [{id: 100, postId: 10}, {id: 101, postId: 10},
                {id: 102, postId: 20}, {id: 103, postId: 20}]
        );

        const userService = new UserService(mockDataService);

        const usersWithPopularPosts = await userService.getUsersWithPopularPosts(commentThreshold);

        expect(usersWithPopularPosts).to.deep.equal(expectedUsers);
    });
});

function getMockDataService(users: User[], posts: Post[], comments: Comment[]): DataService {
    return {
        getUsers() {
            return Promise.resolve(users);
        },
        getPosts() {
            return Promise.resolve(posts);
        },
        getComments() {
            return Promise.resolve(comments);
        }
    };
}
