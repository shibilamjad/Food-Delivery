import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa6";

import {
  Address,
  EditSection,
  StyledButton,
  StyledIcon,
  StyledIcons,
  TableRowRestaurant,
  Title,
} from "../../ui/TableRowUi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import { device } from "../../ui/device";
import ModalOption from "../../ui/ModalOption";
import ModalConfirm from "../../ui/ModalConfirm";
import ConfirmDelete from "../../ui/ConfirmDelete";

export function RestaurantList({ restaurants, curOpen, onOpen }) {
  const [restaurantDelete, setRestaurantDelete] = useState(false);
  const { restaurant: name, image, _id, location } = restaurants;
  const isOpen = _id === curOpen;

  function handleToggle() {
    onOpen(isOpen ? null : _id);
  }
  const navigate = useNavigate();
  function handleMenu(restaurantId) {
    navigate(`/restaurants/${restaurantId}`);
  }
  function handleEdit(restaurantId) {
    navigate(`/new-restaurants/${restaurantId}`);
  }
  const handleOpen = () => setRestaurantDelete(true);
  const handleClose = () => setRestaurantDelete(false);
  return (
    <>
      <TableRowRestaurant>
        <Img src={image} />
        <Title>{name}</Title>
        <Address>{location}</Address>
        <Address>Open</Address>
        <StyledIcon>
          <StyledButton onClick={handleToggle}>
            <EditSection>
              <HiEllipsisVertical />
            </EditSection>
          </StyledButton>
        </StyledIcon>
      </TableRowRestaurant>
      {isOpen && (
        <ModalOption onClose={() => onOpen((show) => !show)}>
          <StyledIcons>
            <StyledButton onClick={() => handleMenu(_id)}>
              <EditSection>
                <FaRegEye />
                <h1>Details</h1>
              </EditSection>
            </StyledButton>
            <StyledButton onClick={() => handleEdit(_id)}>
              <EditSection>
                <HiPencil />
                <h1>Edit</h1>
              </EditSection>
            </StyledButton>
            <StyledButton onClick={handleOpen}>
              <EditSection>
                <HiTrash />
                <h1>Delete</h1>
              </EditSection>
            </StyledButton>
            <div>
              {restaurantDelete && (
                <ModalConfirm handleClose={handleClose}>
                  <ConfirmDelete
                    closeOption={onOpen}
                    name={name}
                    restaurantId={_id}
                    handleClose={handleClose}
                  />
                </ModalConfirm>
              )}
            </div>
          </StyledIcons>
        </ModalOption>
      )}
    </>
  );
}

export const Img = styled.img`
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
