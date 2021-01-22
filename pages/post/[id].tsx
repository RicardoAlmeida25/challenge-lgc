import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import PageWrapper from "../../src/components/page-wrapper/PageWrapper";
import PagePost from "../../src/components/page-post/PagePost";
import CommentInput from "../../src/components/comment-input/CommentInput";

import fetcher from "../../src/utils/fetcher";
import { Comment } from "../../src/utils/constants";
import {
  normalizePostData,
  normalizeCommentsList,
} from "../../src/utils/normalizer";

export default function Post() {
  const [replyingTo, setReplyingTo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const { data: postData, error: postError } = useSWR(
    id ? `http://localhost:9001/posts/${id}` : null,
    fetcher
  );
  const { data: commentsData, error: commentsError } = useSWR(
    id ? `http://localhost:9001/posts/${id}/comments` : null,
    fetcher
  );

  if (!postData && !postError) {
    return "loading";
  }

  if (postError) {
    return "error page";
  }

  const normalizedPostData = normalizePostData(postData);
  const normalizedCommentsData = normalizeCommentsList(commentsData);

  const renderReply = function (comment: Comment, depth: number) {
    return (
      <div
        key={comment.id}
        style={{ marginLeft: `calc((20px * ${depth}) + 20px)` }}
      >
        <p>User: {comment.user}</p>
        <p> {comment.content}</p>
        <button onClick={() => setReplyingTo(comment)}>Reply</button>
        {comment.replies.map((reply) => renderReply(reply, depth + 1))}
      </div>
    );
  };

  return (
    <PageWrapper title={normalizedPostData.title}>
      <PagePost post={normalizedPostData} />
      <div>
        {normalizedCommentsData.map((comment) => (
          <div key={comment.id}>
            <p>User: {comment.user}</p>
            <p>{comment.content}</p>
            <button onClick={() => setReplyingTo(comment)}>Reply</button>
            {comment.replies.map((reply) => renderReply(reply, 0))}
          </div>
        ))}
      </div>
      <CommentInput
        hasComments={normalizedCommentsData.length > 0}
        postId={normalizedPostData.id}
        replyingTo={replyingTo}
        clearReplyingTo={() => setReplyingTo(null)}
      />
    </PageWrapper>
  );
}
