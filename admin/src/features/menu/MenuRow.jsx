import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { useMenuUpdateContext } from "../../context/MenuUpdateContext";
import { useMenuDelete } from "./useMenuDelete";
import {
  Discount,
  EditSection,
  Img,
  IsAvailable,
  Price,
  StyledButton,
  StyledIcon,
  TableRow,
} from "../../ui/TableRowUi";
import { Menu } from "@material-tailwind/react";

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
