import styled from "styled-components";
import { Loader } from "../../ui/Loader";
import { Table } from "../../ui/Row";
import { RestaurantList } from "./RestaurantList";
import { useRestaurant } from "./useRestaurant";
import { device } from "../../ui/device";
import { useState } from "react";
import empty from "../../assets/empty.png";

export const RestaurantTable = ({ search }) => {
  const [showOptionsId, setShowOptionsId] = useState(null);
  const { restaurants, isLoading } = useRestaurant(search);
  if (isLoading) return <Loader />;

  return (
    <Table role="table">
      <TableHeaderOrder>
        <div>IMG</div>
        <div>Restaurant</div>
        <div>Location</div>
        <div>Active</div>
        <div></div>
        <div></div>
      </TableHeaderOrder>
      {restaurants.length === 0 ? (
        <Empty>
          <img src={empty} alt="image" />
        </Empty>
      ) : (
        restaurants.map((items) => (
          <RestaurantList
            restaurants={items}
            key={items._id}
            curOpen={showOptionsId}
            onOpen={setShowOptionsId}
          />
        ))
      )}
    </Table>
  );
};

const TableHeaderOrder = styled.header`
  display: grid;
  font-size: 1rem;
  grid-template-columns: 2fr 2fr 2fr 1fr 1fr;
  font-weight: 600;
  column-gap: 0.4rem;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-100);
  border-bottom: 1px solid var(--color-grey-200);
  text-transform: uppercase;
  color: var(--color-grey-400);
  padding: 1rem 1rem;
  @media ${device.tablet} {
    font-size: 0.8rem;
    column-gap: 0.5rem;
    padding: 1rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.3rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px;
`;
