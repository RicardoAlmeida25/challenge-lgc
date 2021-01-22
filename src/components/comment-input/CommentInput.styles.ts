import styled from "styled-components";

import type { StylingProps } from "./CommentInput.types";

export const FormStyled = styled.form<StylingProps>`
  max-width: 80rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.6rem 0;

  ${({ hasComments }) =>
    hasComments && {
      borderWidth: "0.1rem 0 0",
      borderStyle: "solid",
      borderColor: "#c9c9c9",
      paddingTop: "1.6rem",
    }};
`;
