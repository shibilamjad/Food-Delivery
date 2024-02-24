import { HiPencil, HiTrash } from "react-icons/hi2";
import { FaRegEye } from "react-icons/fa6";

import {
  Address,
  EditSection,
  StyledButton,
  StyledIcon,
  TableRowRestaurant,
  Title,
} from "../../ui/TableRowUi";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRestaurantDelete } from "./useRestaurantDelete";
import styled from "styled-components";
import { device } from "../../ui/device";

export function RestaurantList({ restaurants }) {
  const { restaurant: name, image, _id, location } = restaurants;
  console.log(restaurants);
  const { deleteRestaurant } = useRestaurantDelete();

  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const navigate = useNavigate();

  function handleMenu(restaurantId) {
    setSelectedRestaurantId(restaurantId);
    navigate(`/restaurants/${restaurantId}`);
  }

  function handleEdit(restaurantId) {
    setSelectedRestaurantId(restaurantId);
    navigate(`/new-restaurants/${restaurantId}`);
  }

  function handleDelete(restaurantId) {
    setSelectedRestaurantId(restaurantId);
    deleteRestaurant(restaurantId);
  }

  return (
    <TableRowRestaurant>
      <Img src={image} />
      <Title>{name}</Title>
      <Address>{location}</Address>
      <Address>Open</Address>
      <StyledIcon>
        <StyledButton>
          <EditSection>
            <FaRegEye onClick={() => handleMenu(_id)} />
          </EditSection>
        </StyledButton>
        <StyledButton>
          <EditSection>
            <HiPencil onClick={() => handleEdit(_id)} />
          </EditSection>
        </StyledButton>

        <StyledButton>
          <EditSection>
            <HiTrash onClick={() => handleDelete(_id)} />
          </EditSection>
        </StyledButton>
      </StyledIcon>
    </TableRowRestaurant>
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
