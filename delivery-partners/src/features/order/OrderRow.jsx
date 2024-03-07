import styled from "styled-components";

import { Dates, Stacked, TableRowOrder } from "../../ui/TableRowUi";
import { device } from "../../ui/device";
import { getTimeDifference } from "../../utils/getTimeDifference";
import { useTakeOrder } from "./useTakeOrder";

export function OrderRow({ order }) {
  const { delivery, createdAt, cart, _id: orderId } = order;
  const { takeOrder } = useTakeOrder();

  const handleTakeOrder = (orderId) => {
    takeOrder(orderId);
  };

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
                <h1>{items.restaurant.restaurant}</h1>
              </StyledCart>
            ))}
          </Stacked>
          <Dates>{getTimeDifference(createdAt)}</Dates>
          <Tag type={statusToTagName[delivery]}>{delivery}</Tag>

          <StyledButton onClick={() => handleTakeOrder(orderId)}>
            Take Order
          </StyledButton>
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
    font-size: 0.5rem;
    padding: 0.3rem 0.6rem;
  }
  @media ${device.mobileS} {
    font-size: 0.5rem;
    padding: 0.3rem 0.6rem;
  }
`;

const StyledButton = styled.button`
  background-color: var(--color-brand-700);
  border: none;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.2s;
  font-size: 0.9rem;

  @media ${device.mobileL} {
    font-size: 0.7rem;
  }
  @media ${device.mobileS} {
    font-size: 0.7rem;
  }
  &:hover {
    background-color: var(--color-brand-500);
  }
  &:active {
    border: var(--color-grey-500);
  }
`;
