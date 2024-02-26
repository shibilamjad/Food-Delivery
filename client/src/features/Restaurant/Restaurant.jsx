import styled from 'styled-components';
import { Loader } from '../../ui/Loader';
import { Empty } from '../../ui/Empty';
import { useRestaurant } from './useRestaurant';
import { RestaurantsItem } from './RestaurantsItem';
import { useGeoLocation } from '../../utils/useGeoLocation';
import { AvailableItem } from './AvailableItem';
import { device } from '../../ui/device';
import { Skeletons } from '../../ui/Skeleton';
import { LoaderSkelten } from '../../ui/LoaderSkelten';

export function Restaurant() {
  const { restaurants, isLoading, isError } = useRestaurant();

  const { city, position } = useGeoLocation();
  console.log(city);
  if (isLoading) return <LoaderSkelten />;
  if (isError) return <Empty>Something went wrong. Please try again.</Empty>;
  console.log(city);
  return (
    <>
      {city ? (
        <StyledContainer>
          <Header>
            <h1>
              Restaurants Available in your Location <span>{city}</span>
            </h1>
          </Header>
          <StyledRestaurant>
            {restaurants.map((item) => (
              <AvailableItem items={item} key={item._id} />
            ))}
          </StyledRestaurant>
          <Header>
            <h1>Our Popular Restaurants</h1>
          </Header>
          <StyledRestaurant>
            {restaurants.map((item) => (
              <RestaurantsItem items={item} key={item._id} />
            ))}
          </StyledRestaurant>
        </StyledContainer>
      ) : (
        <StyledContainer>
          <Header>
            <h1>Loading ...</h1>
          </Header>
          <StyledRestaurant>
            <Skeletons />
          </StyledRestaurant>
          <Header>
            <h1>Loading ...</h1>
          </Header>
          <StyledRestaurant>
            <Skeletons />
            <Skeletons />
          </StyledRestaurant>
        </StyledContainer>
      )}
    </>
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
  span {
    color: green;
  }
  h1 {
    @media ${device.tablet} {
      font-size: 25px;
    }
    @media ${device.mobileL} {
      font-size: 20px;
    }
  }
`;
