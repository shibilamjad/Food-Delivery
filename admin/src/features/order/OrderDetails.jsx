import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Row } from "../../ui/Row";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Tag } from "../../ui/TableRowUi";
import { useOrderDetails } from "./useOrderDetails";
import { Loader } from "../../ui/Loader";
import { OrderData } from "./OrderData";
import { device } from "../../ui/device";

export function OrderDetails() {
  const { orderId } = useParams();
  const { details, isLoading } = useOrderDetails(orderId);
  const moveBack = useMoveBack();
  if (isLoading) return <Loader />;

  const statusToTagName = {
    pending: "red",
    ongoing: "blue",
    success: "green",
  };
  return (
    <StyledContainer>
      <Row type="vertical">
        <HeadingGroup>
          <Heading>
            <>Booking #id </>
            {details._id}
          </Heading>
          <Tag type={statusToTagName[details.delivery]}>
            {details.delivery.replace("-", " ")}
          </Tag>
          <ButtonGroup>
            <Button onClick={moveBack}>&larr; Back</Button>
          </ButtonGroup>
        </HeadingGroup>
        <OrderData details={details} />
      </Row>
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
