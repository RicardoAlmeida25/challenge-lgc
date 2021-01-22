import styled from "styled-components";

export const ListingPostStyled = styled.div`
  cursor: pointer;
  max-width: 80rem;
  width: 100%;
  box-shadow: 0px 0px 8px 2px #c9c9c9;
  margin-bottom: 4rem;
  padding: 1.6rem;

  & :first-of-type {
    margin-top: 4rem;
  }
`;

export const ContentWrapper = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  border-width: 0.1rem 0 0;
  border-style: solid;
  border-color: #c9c9c9;
  padding-top: 0.8rem;
  margin-top: 0.8rem;
`;

export const PostInfo = styled.p`
  margin-top: 0.6rem;
`;
