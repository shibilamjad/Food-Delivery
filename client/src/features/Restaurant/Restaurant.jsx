import styled from 'styled-components';
import io from 'socket.io-client';
import { useEffect } from 'react';

import { Empty } from '../../ui/Empty';
import { useRestaurant } from './useRestaurant';
import { RestaurantsItem } from './RestaurantsItem';
import { useGeoLocation } from '../../utils/useGeoLocation';
import { AvailableItem } from './AvailableItem';
import { device } from '../../ui/device';
import { LoaderSkelten } from '../../ui/LoaderSkelten';
import { useAvailable } from './useAvailable';

export function Restaurant() {
  const { allRestaurant, isLoading, isError } = useRestaurant();
  const { availableRestaurants, isLoading: isAvailable } = useAvailable();
  const { city } = useGeoLocation();

  useEffect(() => {
    const socket = io('http://localhost:3006');
    const token = localStorage.getItem('token');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          socket.emit('userLocationUpdate', {
            token: token,
            latitude,
            longitude,
          });
        },
        (error) => {
          console.error('Error getting location', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading || isAvailable) return <LoaderSkelten />;
  if (isError) return <Empty>Something went wrong. Please try again.</Empty>;

  return (
    <>
      <StyledContainer>
        <Header>
          <h1>
            Restaurants Available in your Location <span>{city}</span>
          </h1>
        </Header>
        {availableRestaurants.length === 0 ? (
          <Emptys>
            <img src="../../../public/not-item-available.png" alt="" />
          </Emptys>
        ) : (
          <StyledRestaurant>
            {availableRestaurants &&
              availableRestaurants.map((item) => (
                <AvailableItem items={item} key={item._id} />
              ))}
          </StyledRestaurant>
        )}
        <Header>
          <h1>Our Popular Restaurants</h1>
        </Header>
        <StyledRestaurant>
          {allRestaurant.map((item) => (
            <RestaurantsItem items={item} key={item._id} />
          ))}
        </StyledRestaurant>
      </StyledContainer>
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
const Emptys = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  font-size: 20px;
  color: red;
`;
