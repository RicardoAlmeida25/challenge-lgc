import { Post, Comment } from "./constants";

export function normalizePostData(post: any): Post {
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    publishDate: new Date(post.publish_date),
    slug: post.slug,
    description: post.description,
    content: post.content,
  };
}

export function normalizePostListData(posts: any[]): Post[] {
  if (!posts || posts.length === 0) {
    return [];
  }

  const normalizedPosts: Post[] = posts.map((post: any) =>
    normalizePostData(post)
  );

  return normalizedPosts.sort(
    (postA, postB) => postB.publishDate.getTime() - postA.publishDate.getTime()
  );
}

function normalizeReplies(parentId: string, comments: any[]): Comment[] {
  const commentReplies = comments.filter(
    (comment) => comment.parent_id === parentId
  );

  if (commentReplies.length === 0) {
    return [];
  }

  return commentReplies.map((comment) => ({
    id: comment.id,
    postId: comment.postId,
    user: comment.user,
    date: new Date(comment.date),
    content: comment.content,
    replies: normalizeReplies(comment.id, comments),
  }));
}

export function normalizeCommentsList(comments: any[]): Comment[] {
  if (!comments || comments.length === 0) {
    return [];
  }

  const rootLevel = comments.filter((comment) => comment.parent_id === null);
  const nonRootLevel = comments.filter((comment) => comment.parent_id !== null);

  const normalizedComments: Comment[] = rootLevel.map((comment) => ({
    id: comment.id,
    postId: comment.postId,
    user: comment.user,
    date: new Date(comment.date),
    content: comment.content,
    replies: normalizeReplies(comment.id, nonRootLevel),
  }));

  return normalizedComments;
}
