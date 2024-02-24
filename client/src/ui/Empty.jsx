import styled from 'styled-components';

export function Empty({ children }) {
  return (
    <Container>
      <Styled>
        <p>{children}</p>
      </Styled>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
`;
const Styled = styled.div`
  margin-top: 60px;
  border-radius: 30px;
  background-color: #252525;
  color: #fff;
  width: 300px;
  padding: 20px;
`;
