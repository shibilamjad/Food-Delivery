import styled from 'styled-components';
import Button from '../../ui/Button';

export function EmptyOrder() {
  return (
    <Emptys>
      <p className="mb-6">
        <img src="../../../7718875.png" alt="" />
      </p>
      <Button type="small" to="/restaurant">
        Go to Restaurant
      </Button>
    </Emptys>
  );
}

const Emptys = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  font-size: 20px;
  color: red;
`;
