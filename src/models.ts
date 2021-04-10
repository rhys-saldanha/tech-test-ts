export interface User {
    id: number
}

export interface Post {
    id: number,
    userId: number
}

export interface Comment {
    id: number,
    postId: number,
}

export interface UserWithPosts extends User {
    posts: Post[]
}
