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
  const { userName, delivery, createdAt, cart, _id } = order;
  const navigate = useNavigate();
  function handleClick(orderId) {
    navigate(`/order/${orderId}`);
  }
  const statusToTagName = {
    pending: "red",
    ongoing: "blue",
    success: "green",
  };
  return (
    <>
      {cart.length > 0 && (
        <TableRowOrder>
          <Stacked>
            {cart.map((items) => (
              <StyledCart key={items._id}>
                <li></li>
              </StyledCart>
            ))}
          </Stacked>
          <Stacked>
            {cart.map((items) => (
              <StyledCart key={items._id}>
                <h1>{items.menuItem.name}</h1>
              </StyledCart>
            ))}
          </Stacked>
          <Menu>{userName}</Menu>
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

const StyledCart = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
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
