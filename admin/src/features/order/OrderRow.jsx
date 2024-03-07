import styled from "styled-components";
import { FaRegEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import {
  Dates,
  EditSection,
  Menu,
  Stacked,
  StyledButton,
  StyledIcon,
  TableRowOrder,
} from "../../ui/TableRowUi";
import { device } from "../../ui/device";

export function OrderRow({ order }) {
  const { delivery, createdAt, cart, _id } = order;
  const navigate = useNavigate();
  function handleClick(orderId) {
    navigate(`/order/${orderId}`);
  }

  const restaurantImageSet = new Set(cart.map((item) => item.restaurant.image));
  const restaurantImages = [...restaurantImageSet];

  const statusToTagName = {
    pending: "red",
    inprogress: "blue",
    success: "green",
  };
  return (
    <>
      {cart.length > 0 && (
        <TableRowOrder>
          <Stacked>
            <Img src={restaurantImages} />
          </Stacked>

          <Stacked>
            {cart.map((items) => (
              <StyledCart key={items._id}>
                <h1>{items.menuItem.name}</h1>
              </StyledCart>
            ))}
          </Stacked>
          <Stacked>
            {cart.map((items) => (
              <StyledCart key={items._id}>
                <div>{items.quantity}</div>
              </StyledCart>
            ))}
          </Stacked>
          <Dates>{new Date(createdAt).toLocaleString()}</Dates>
          <Tag type={statusToTagName[delivery]}>
            {delivery.replace("-", " ")}
          </Tag>

          <StyledIcon>
            <StyledButton onClick={() => handleClick(_id)}>
              <EditSection>
                <FaRegEye />
              </EditSection>
            </StyledButton>
          </StyledIcon>
        </TableRowOrder>
      )}
    </>
  );
}

export const Img = styled.img`
  display: block;
  height: 100px;
  width: 100px;
  padding-right: 10px;
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

const StyledCart = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  h1 {
    margin-left: 10px;
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
    font-size: 0.3rem;
    padding: 0.3rem 0.6rem;
  }
  @media ${device.mobileS} {
    font-size: 0.3rem;
    padding: 0.3rem 0.6rem;
  }
`;
