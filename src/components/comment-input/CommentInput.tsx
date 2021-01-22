import { useState } from "react";

import { FormStyled } from "./CommentInput.styles";
import type { PropTypes } from "./CommentInput.types";

export default function CommentInput(props: PropTypes) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  const { postId, replyingTo, clearReplyingTo, hasComments } = props;

  const onSubmit = async function (event) {
    event.preventDefault();

    if (username && comment) {
      console.log("posting");
      const currentDate = new Date();
      await fetch(`http://localhost:9001/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          parent_id: replyingTo ? replyingTo.id : null,
          user: username,
          date: `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDay()}`,
          content: comment,
        }),
      });
      setComment("");
    }
  };

  return (
    <FormStyled onSubmit={onSubmit} hasComments={hasComments}>
      {replyingTo && (
        <div>
          <p>Replying to:</p>
          <p>{replyingTo.content}</p>
          <button onClick={clearReplyingTo}>Clear</button>
        </div>
      )}
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <div>
        <label htmlFor="username">Name: </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button>Submit</button>
      </div>
    </FormStyled>
  );
}
