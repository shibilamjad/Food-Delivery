import styled from "styled-components";

import { Row } from "../../ui/Row";
import { Tag } from "../../ui/TableRowUi";
import { OrderData } from "./OrderData";
import { device } from "../../ui/device";

export function OrderDetails({ inprogress }) {
  const statusToTagName = {
    pending: "red",
    inprogress: "blue",
    success: "green",
  };
  return (
    <StyledContainer>
      {inprogress.map((detail) => (
        <Row type="vertical" key={detail._id}>
          <HeadingGroup>
            <Heading>
              Order #id
              <span>{detail._id}</span>
            </Heading>
            <Tag type={statusToTagName[detail.delivery]}>{detail.delivery}</Tag>
          </HeadingGroup>
          <OrderData details={detail} />
        </Row>
      ))}
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const HeadingGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  @media ${device.tablet} {
    gap: 1.4rem;

    transition: all 0.5;
  }
  @media ${device.mobileL} {
    gap: 0.6rem;
    transition: all 0.5;
  }
`;
const Heading = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin: 5px;
  span {
    margin-left: 10px;
  }
  @media ${device.tablet} {
    font-size: 20px;

    transition: all 0.5;
  }
  @media ${device.mobileL} {
    font-size: 16px;
    transition: all 0.5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 10px 15px;
  color: var(--color-grey-600);
  background: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  transition: all 0.3s;
  &:hover {
    background-color: var(--color-brand-500);
  }
  border: none;
  border-radius: var(--border-radius-sm);

  box-shadow: var(--shadow-sm);
  @media ${device.tablet} {
    padding: 7px 12px;
  }
  @media ${device.mobileL} {
    padding: 5px 8px;
  }
`;
