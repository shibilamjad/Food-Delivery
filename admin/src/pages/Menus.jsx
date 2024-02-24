import { useNavigate, useParams } from "react-router-dom";
import { MenuTable } from "../features/menu/menuTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";
import { useRestaurantsMenu } from "../features/menu/useRestaurantsMenu";
import { Loader } from "../ui/Loader";
import { useMoveBack } from "../hooks/useMoveBack";
import styled from "styled-components";
import { device } from "../ui/device";

export function Menus() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { restaurantId } = useParams();
  const { restaurantMenu, isLoading } = useRestaurantsMenu(restaurantId);
  if (isLoading) return <Loader />;
  return (
    <>
      <Row>
        <StyledHeader>
          <Heading as="h1">{restaurantMenu.restaurant} Menus</Heading>
          <Button onClick={moveBack}>&larr; Back</Button>
        </StyledHeader>
        <MenuTable />
        <Button onClick={() => navigate("/menu")}>Add Menus</Button>
      </Row>
    </>
  );
}

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

const StyledHeader = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
`;
