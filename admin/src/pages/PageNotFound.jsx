import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Buttons from "../ui/Buttons";
import Notfound from "../assets/404.png";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <img src={Notfound} alt="" />
        <Heading as="h3">
          The page you are looking for could not be found 😢
        </Heading>
        <Buttons onClick={moveBack} size="medium">
          &larr; Go back
        </Buttons>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);

  padding: 4rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;
