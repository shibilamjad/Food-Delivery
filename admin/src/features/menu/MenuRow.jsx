import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../ui/device";
import { useMenuUpdateContext } from "../../context/MenuUpdateContext";
import { useMenuDelete } from "./useMenuDelete";

export function MenuRow({ menu }) {
  const { _id, name, unitPrice, discount, ingredients, isAvailable, imageUrl } =
    menu;
  const { deleteMenu } = useMenuDelete();
  const { setSelectedMenu, setSelectedMenuId, setIsEditing } =
    useMenuUpdateContext();
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
      value
    );
  const navigate = useNavigate();

  function onEditMovie(menuId) {
    setIsEditing(true);
    setSelectedMenuId(menuId);
    setSelectedMenu(menu);
    navigate(`/menu/${menuId}`);
  }

  const statusToTagName = {
    true: "green",
    false: "red",
  };

  return (
    <>
      <TableRow role="row">
        <Img src={imageUrl} />
        <Menu>{name}</Menu>
        <Price>{formatCurrency(unitPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <IsAvailable color={statusToTagName[isAvailable]}>
          {isAvailable ? "True" : "False"}
        </IsAvailable>

        <StyledIcon>
          <StyledButton onClick={() => onEditMovie(_id)}>
            <EditSection>
              <HiPencil />
            </EditSection>
          </StyledButton>

          <StyledButton onClick={() => deleteMenu(_id)}>
            <EditSection>
              <HiTrash />
            </EditSection>
          </StyledButton>
        </StyledIcon>
      </TableRow>
    </>
  );
}

const TableRow = styled.div`
  display: grid;
  font-size: 1.4rem;
  grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  box-shadow: var(--shadow-sm);
  position: relative;
  @media ${device.tablet} {
    font-size: 1rem;
    column-gap: 1rem;
    padding: 1.4rem 2.4rem;
    /* grid-template-columns: 1fr 1fr 0.2fr 0.2fr 0.2fr 0.6fr; */
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 0.4rem 1rem;
    /* grid-template-columns: 0.5fr 0.5fr 0.2fr 0.2fr 0.2fr 0.4fr; */
    font-size: 0.8rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.5rem;
    padding: 0.1rem 1rem;
    /* grid-template-columns: 0.4fr 0.4fr 0.2fr 0.2fr 0.2fr 0.4fr; */
    font-size: 0.6rem;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  height: 100px;
  width: 100px;
  margin: 10px;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  @media ${device.tablet} {
    display: flex;
    width: 50px;
    margin: 5px;
    height: 50px;
    object-fit: fill;
    object-position: center;
    /* transform: scale(1.5) translateX(-7px); */
  }
  @media ${device.mobileL} {
    object-fit: cover;
    width: 30px;
    margin: 5px;
    height: 28px;
    object-fit: fill;
    object-position: fill;
    /* transform: scale(1.5) translateX(-7px); */
  }
`;

const Menu = styled.div`
  font-weight: 600;
  color: var(--color-grey-500);
  height: auto;
  width: 200px;
  overflow-wrap: break-word;
  @media ${device.tablet} {
    width: 100px;
  }
  @media ${device.mobileL} {
    width: 150px;
  }
  @media ${device.mobileL} {
    width: 70px;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  color: var(--color-grey-500);
`;
const IsAvailable = styled.div`
  font-weight: 600;
  color: ${(props) => props.color};
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: #08a843;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: 5px;
  /* transform: translateX(0.8rem); */
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }
  &:active {
    border: var(--color-grey-500);
  }
`;

const StyledIcon = styled.div`
  display: flex;
  flex-wrap: wrap;
  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-300);
    transition: all 0.3s;
    &:hover {
      color: var(--color-brand-500);
    }
    @media ${device.tablet} {
      width: 1.2rem;
      height: 1.2rem;
    }
    @media ${device.mobileL} {
      width: 0.8rem;
      height: 0.8rem;
    }
    @media ${device.mobileL} {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

const EditSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;
