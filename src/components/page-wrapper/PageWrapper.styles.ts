import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
