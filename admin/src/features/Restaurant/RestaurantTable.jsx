import styled from "styled-components";
import { getRestaurants } from "../../service/apiRestaurants";
import { Loader } from "../../ui/Loader";
import { Table } from "../../ui/Row";
import { RestaurantList } from "./RestaurantList";
import { useRestaurant } from "./useRestaurant";
import { device } from "../../ui/device";

export const RestaurantTable = () => {
  const { restaurants, isLoading } = useRestaurant();
  if (isLoading) return <Loader />;

  return (
    <Table role="table">
      <TableHeaderOrder>
        <div>Image</div>
        <div>Restaurant</div>
        <div>Location</div>
        <div>Active</div>
        <div>More</div>
        <div></div>
      </TableHeaderOrder>
      {restaurants.map((items) => (
        <RestaurantList restaurants={items} key={items._id} />
      ))}
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
    font-size: 0.7rem;
    column-gap: 0.5rem;
    padding: 1rem 2rem;
  }
  @media ${device.mobileL} {
    column-gap: 0.6rem;
    padding: 1rem 1rem;
    font-size: 0.5rem;
  }
  @media ${device.mobileS} {
    column-gap: 0.1rem;
    padding: 1rem 1rem;
    font-size: 0.6rem;
  }
`;
