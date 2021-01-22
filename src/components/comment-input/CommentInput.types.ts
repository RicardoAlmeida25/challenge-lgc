import type { Comment } from "../../utils/constants";

export interface PropTypes {
  postId: number;
  hasComments?: boolean;
  replyingTo?: Comment;
  clearReplyingTo?: () => void;
}

export type StylingProps = Pick<PropTypes, "hasComments">;
