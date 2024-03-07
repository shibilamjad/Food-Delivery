import styled from "styled-components";
import Buttons from "../../ui/Buttons";
import { device } from "../../ui/device";
import { useConfirm } from "./useConfirm";

const StyledConfirmDelete = styled.div`
  /* width: 40rem; */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${device.mobileL} {
    width: 80%;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 0.8rem;
  }
`;

export function ConfirmOrder({ onClose, orderId }) {
  const { confirm } = useConfirm();

  function handleDelete() {
    confirm(orderId);
    onClose((close) => !close);
  }

  return (
    <StyledConfirmDelete>
      <H1>Order Confirm </H1>
      <p>
        Are you sure Order Confirm permanently? This action cannot be undone.
      </p>

      <div>
        <Buttons variation="secondary" size="medium" onClick={onClose}>
          Cancel
        </Buttons>
        <Buttons variation="primary" size="medium" onClick={handleDelete}>
          Confirm
        </Buttons>
      </div>
    </StyledConfirmDelete>
  );
}

const H1 = styled.h1`
  color: var(--color-grey-700);
  font-size: 30px;
`;
