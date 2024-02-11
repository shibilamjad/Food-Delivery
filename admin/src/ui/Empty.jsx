import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function Empty({ children }) {
  const navigate = useNavigate();
  return (
    <StyledEmpty>
      <div>
        <p>{children}</p>
      </div>
      <div>
        <Button onClick={() => navigate("/menu")}>Go to AddMenu</Button>
      </div>
    </StyledEmpty>
  );
}
const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  color: red;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #3730a3;
  border: 1px solid #3730a3;
  color: #fff;
  padding: 4px;
  margin-top: 10px;
  font-size: 10px;
  border-radius: 4px;
  &:hover,
  &:focus {
    border: 1px solid #3730a3;
    background-color: #fff;
    color: #3730a3;
  }
`;
