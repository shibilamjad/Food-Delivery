import { useNavigate } from "react-router-dom";
import Button from "../../ui/Buttons";
import styled from "styled-components";

export function EmptyOrder() {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <div>
        <p>Order Not available inprogress, you can select a new order.</p>
        <Button
          variation="secondary"
          size="medium"
          onClick={() => navigate("/order")}
        >
          Go Order Now!!
        </Button>
      </div>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  padding-top: 30px;

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    justify-content: center;
    border-radius: 30px;
    color: var(--color-grey-400);
    background-color: var(--color-grey-100);
    width: auto;
    padding: 20px;
  }
`;
