import DOMPurify from "dompurify";
import { format } from "date-fns";

import { WrapperStyled, Content } from "./PagePost.styles";
import type { PropTypes } from "./PagePost.types";

export default function PagePost(props: PropTypes) {
  const { post } = props;
  return (
    <WrapperStyled>
      <h1>{post.title}</h1>
      <h2>
        By {post.author}, {format(post.publishDate, "d MMMM yyyy")}
      </h2>
      <h3>{post.description}</h3>
      <Content
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
    </WrapperStyled>
  );
}
