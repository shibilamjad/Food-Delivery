import styled from "styled-components";
import { useState } from "react";
import { RestaurantTable } from "../features/Restaurant/RestaurantTable";
import Heading from "../ui/Heading";
import { Row } from "../ui/Row";
import { device } from "../ui/device";

export function Restaurant() {
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Row>
        <StyledContainer>
          <Heading as="h1">All Restaurats</Heading>
          <Input
            type="text"
            value={search}
            id={search}
            onChange={handleSearchChange}
            placeholder="Search restaurants..."
          />
        </StyledContainer>
        <RestaurantTable search={search} />
      </Row>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
`;

const Input = styled.input`
  padding: 10px 15px;
  background-color: var(--color-grey-100);
  margin-right: 20px;
  border-radius: 4px;
  width: 300px;
  border: 1px solid var(--color-grey-200);
`;
