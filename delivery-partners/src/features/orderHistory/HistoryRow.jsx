import { FaRegEye } from "react-icons/fa6";

import {
  Address,
  Charge,
  EditSection,
  StyledButton,
  StyledIcon,
  Title,
} from "../../ui/TableRowUi";
import styled from "styled-components";
import { device } from "../../ui/device";
import { useNavigate } from "react-router-dom";

export function HistoryRow({ cart, delivery, orderId }) {
  const navigate = useNavigate();

  const restaurantImageSet = new Set(cart.map((item) => item.restaurant.image));
  const restaurantImages = [...restaurantImageSet];
  function handleMenu(orderId) {
    navigate(`/completed/${orderId}`);
  }

  const statusToTagName = {
    pending: "red",
    inprogress: "blue",
    success: "green",
  };
  return (
    <>
      <Img src={restaurantImages} />
      {cart.map((items) => (
        <Title key={items._id}>&#x2022; {items.menuItem.name}</Title>
      ))}
      <Tag type={statusToTagName[delivery]}>{delivery}</Tag>
      <Charge>20rs</Charge>
      <StyledIcon>
        <StyledButton>
          <EditSection onClick={() => handleMenu(orderId)}>
            <FaRegEye />
          </EditSection>
        </StyledButton>
      </StyledIcon>
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
    object-fit: cover;
    object-position: center;
    /* transform: scale(1.5) translateX(-7px); */
  }
  @media ${device.mobileL} {
    object-fit: cover;
    width: 30px;
    margin: 5px;
    height: 28px;
    object-fit: cover;
    object-position: fill;
    /* transform: scale(1.5) translateX(-7px); */
  }
`;

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  @media ${device.tablet} {
    font-size: 0.5rem;
    padding: 0.4rem 0.8rem;
  }
  @media ${device.mobileL} {
    font-size: 0.5rem;
    padding: 0.3rem 0.6rem;
  }
  @media ${device.mobileS} {
    font-size: 0.5rem;
    padding: 0.3rem 0.6rem;
  }
`;
