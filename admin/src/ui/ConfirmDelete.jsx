import styled from "styled-components";
import Buttons from "./Buttons";
import Heading from "./Heading";
import { useRestaurantDelete } from "../features/Restaurant/useRestaurantDelete";

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    gap: 1.2rem;
  }
`;

const StlyedButton = styled.button`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;
function ConfirmDelete({ name, restaurantId, onClose, closeOption }) {
  const { deleteRestaurant } = useRestaurantDelete();

  function handleDelete() {
    deleteRestaurant(restaurantId);
    closeOption((close) => !close);
  }
  return (
    <StyledConfirmDelete>
      <Heading className=" text-sky-100" as="h1">
        Delete {name}
      </Heading>
      <p>
        Are you sure you want to delete this {name} permanently? This action
        cannot be undone.
      </p>
      <StlyedButton>
        <Buttons variation="secondary" size="medium" onClick={onClose}>
          Cancel
        </Buttons>
        <Buttons variation="danger" size="medium" onClick={handleDelete}>
          Delete
        </Buttons>
      </StlyedButton>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
