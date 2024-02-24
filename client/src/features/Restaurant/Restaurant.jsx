import styled from 'styled-components';
import { Loader } from '../../ui/Loader';
import { Empty } from '../../ui/Empty';
import { useRestaurant } from './useRestaurant';
import { RestaurantsItem } from './RestaurantsItem';

export function Restaurant() {
  const { restaurants, isLoading, isError } = useRestaurant();

  if (isLoading) return <Loader />;
  if (isError) return <Empty>Something went wrong. Please try again.</Empty>;
  return (
    <StyledContainer>
      <Header>
        <h1>Our Popular Restaurants</h1>
      </Header>
      <StyledRestaurant>
        {restaurants.map((item) => (
          <RestaurantsItem items={item} key={item._id} />
        ))}
      </StyledRestaurant>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
  padding: 70px;
`;

const StyledRestaurant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dfdfdf;
  font-weight: 700;
`;
