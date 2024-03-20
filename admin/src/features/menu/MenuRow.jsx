import { HiPencil, HiTrash } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";

import {
  Discount,
  EditSection,
  Img,
  IsAvailable,
  Menu,
  Price,
  StyledButton,
  StyledIcon,
  TableRow,
} from "../../ui/TableRowUi";
import { useState } from "react";
import { useRestaurantsMenu } from "./useRestaurantsMenu";
import { Loader } from "../../ui/Loader";
import { Empty } from "../../ui/Empty";
import ModalConfirm from "../../ui/ModalConfirm";
import ConfirmMenuDelete from "./ConfirmMenuDelete";

export function MenuRow() {
  const { restaurantId } = useParams();
  const { restaurantMenu, isLoading, isError } =
    useRestaurantsMenu(restaurantId);
  const [restaurantDelete, setRestaurantDelete] = useState(false);

  const navigate = useNavigate();

  function onEditMenu(menuId) {
    navigate(`/menu/${menuId}`);
  }

  const statusToTagName = {
    true: "green",
    false: "red",
  };
  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching menu data</div>;
  if (restaurantMenu.menu.length === 0) return <Empty>empty</Empty>;
  return (
    <>
      {restaurantMenu.menu.map((menuItem) => (
        <TableRow role="row" key={menuItem._id}>
          <Img src={menuItem.imageUrl} />
          <Menu>{menuItem.name}</Menu>
          <Price>₹{menuItem.unitPrice}</Price>
          {menuItem.discount ? (
            <Discount>₹{menuItem.discount}</Discount>
          ) : (
            <span>&mdash;</span>
          )}
          <IsAvailable color={statusToTagName[menuItem.isAvailable]}>
            {menuItem.isAvailable ? "True" : "False"}
          </IsAvailable>
          <StyledIcon>
            <StyledButton onClick={() => onEditMenu(menuItem._id)}>
              <EditSection>
                <HiPencil />
              </EditSection>
            </StyledButton>
            <StyledButton
              onClick={() => setRestaurantDelete(!restaurantDelete)}
            >
              <EditSection>
                <HiTrash />
              </EditSection>
            </StyledButton>
          </StyledIcon>
          <div>
            {restaurantDelete && (
              <ModalConfirm
                handleClose={() => setRestaurantDelete(!restaurantDelete)}
              >
                <ConfirmMenuDelete
                  name={menuItem.name}
                  menuItem={menuItem._id}
                  onClose={() => setRestaurantDelete(!restaurantDelete)}
                />
              </ModalConfirm>
            )}
          </div>
        </TableRow>
      ))}
    </>
  );
}
