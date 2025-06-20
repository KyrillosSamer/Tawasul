// User information
export interface User {
  _id: string;
  name: string;
  photo: string;
}

// Comment structure
export interface Comment {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
}

// Post structure
export interface PostData {
  _id: string;
  body: string;
  image?: string;
  user: User;
  createdAt: string;
  comments: Comment[]; 
}

// Payload for creating a new comment
export interface CommentPayload {
  postId: string;
  content: string;
}

// Payload for updating an existing comment
export interface UpdateCommentPayload {
  id: string;
  content: string;
}

// Redux state for comment operations
export interface CommentState {
  isCreating: boolean;
  isUpdating?: boolean;
  success?: boolean;
  updateSuccess?: boolean;
  error?: string;
}
