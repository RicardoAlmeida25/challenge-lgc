import Link from "next/link";
import DOMPurify from "dompurify";
import { format } from "date-fns";

import {
  ListingPostStyled,
  ContentWrapper,
  PostInfo,
} from "./ListingPost.styles";

import type { PropTypes } from "./ListingPost.types";

export default function ListingPost(props: PropTypes) {
  const {
    post: { id, title, author, publishDate, description, content },
  } = props;

  return (
    <Link href={`/post/${id}`}>
      <ListingPostStyled>
        <h2>{title}</h2>
        <PostInfo>
          By {author}, {format(publishDate, "d MMMM yyyy")}
        </PostInfo>
        <ContentWrapper
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </ListingPostStyled>
    </Link>
  );
}
