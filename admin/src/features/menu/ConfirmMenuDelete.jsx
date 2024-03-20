import styled from "styled-components";
import { useMenuDelete } from "./useMenuDelete";
import Heading from "../../ui/Heading";
import Buttons from "../../ui/Buttons";

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
function ConfirmMenuDelete({ name, menuItem, onClose }) {
  const { deleteMenu } = useMenuDelete();

  function handleDelete() {
    deleteMenu(menuItem);
    onClose();
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

export default ConfirmMenuDelete;
