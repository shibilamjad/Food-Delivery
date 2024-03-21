import styled from 'styled-components';
import Button from './Button';

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: #c5c5c5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: #ffffff;
  border: 1px solid #6e6e6e;
  border-radius: 5px;

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
    font-size: 20px;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 3.2rem;
    color: #2b2b2b;
  }
`;
export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <StyledErrorFallback>
        <Box>
          <h1>Something went wrong 🧐</h1>
          <p>{error.message}</p>
          <Button type="primery" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
