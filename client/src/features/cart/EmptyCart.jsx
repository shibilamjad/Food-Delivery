import styled from 'styled-components';
import Button from '../../ui/Button';
import { device } from '../../ui/device';

export function EmptyCart() {
  return (
    <Emptys>
      <p className="mb-6">
        <img src="../../../shopping2.png" alt="" />
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
  img {
    width: 500px;
    @media ${device.tablet} {
      width: 400px;
    }
    @media ${device.mobileL} {
      width: 200px;
    }
  }
`;
