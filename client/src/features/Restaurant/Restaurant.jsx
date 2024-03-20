import styled from 'styled-components';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { Empty } from '../../ui/Empty';
import { useRestaurant } from './useRestaurant';
import { RestaurantsItem } from './RestaurantsItem';
import { useGeoLocation } from '../../utils/useGeoLocation';
import { AvailableItem } from './AvailableItem';
import { device } from '../../ui/device';
import { Loader } from '../../ui/Loader';
import { useAvailable } from './useAvailable';
import { useCity } from './useCity';
import UserLocation from './UserLocation';
import { SpinnerMini } from '../../ui/SpinnerMini';

export function Restaurant() {
  const location = localStorage.getItem('location');
  const {
    isLoading,
    isError,
    hasNextPage: resturantNextPage,
    fetchNextPage: resturantFetchNextPage,
    isFetchingNextPage: restaurantIsFetchNextPage,
    restaurants,
  } = useRestaurant();
  const {
    availableRestaurants,
    isLoading: isAvailable,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAvailable();
  const { city } = useGeoLocation();
  const { getCity } = useCity();
  const { ref, inView } = useInView({ threshold: 0.5 });
  // extract the city
  const cityCurrent =
    getCity &&
    getCity.reduce((acc, city) => {
      acc[city.cityName] = {
        latitude: city.latitude,
        longitude: city.longitude,
      };
      return acc;
    }, {});
  // socket io and the current location change
  useEffect(() => {
    const socket = io('http://localhost:3006');
    const token = localStorage.getItem('token');

    const handleLocationUpdate = (position) => {
      const { latitude, longitude } = position.coords;

      socket.emit('userLocationUpdate', {
        token: token,
        latitude,
        longitude,
      });
    };

    const handleLocationError = (error) => {
      console.error('Error getting location', error);
    };

    if (location === 'current') {
      navigator.geolocation.getCurrentPosition(
        handleLocationUpdate,
        handleLocationError,
      );
    } else {
      const cityCoordinated = cityCurrent && cityCurrent[location];
      if (cityCoordinated) {
        const { latitude, longitude } = cityCoordinated;
        socket.emit('userLocationUpdate', {
          token: token,
          latitude,
          longitude,
        });
      }
    }
    return () => {
      socket.disconnect();
    };
  }, [getCity, location]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (inView && resturantNextPage) {
      resturantFetchNextPage();
    }
  }, [inView, resturantNextPage, resturantFetchNextPage]);

  // check if empty array
  const allPagesEmpty =
    availableRestaurants &&
    availableRestaurants.pages.every((page) => page.length === 0);

  if (isLoading || isAvailable) return <Loader />;
  if (isError) return <Empty>Something went wrong. Please try again.</Empty>;

  return (
    <>
      <StyledContainer>
        <Header>
          {location === 'current' ? (
            <h1>
              Restaurants Available in your Location <span>{city}</span>
            </h1>
          ) : (
            <h1>
              Restaurants Available in <span>{location}</span>
            </h1>
          )}
        </Header>
        {allPagesEmpty ? (
          <Emptys>
            <img src="/not-item-available.png" alt="" />
            <p>You can change your location to view available restaurants:</p>
            <UserLocation />
          </Emptys>
        ) : (
          <StyledRestaurant>
            {availableRestaurants &&
              availableRestaurants.pages.map((page, pageIndex) =>
                page.map((item, itemIndex) => {
                  const isLastAvailableRes =
                    pageIndex === availableRestaurants.pages.length - 1 &&
                    itemIndex === page.length - 1;
                  return (
                    <AvailableItem
                      items={item}
                      key={item._id}
                      ref={isLastAvailableRes ? ref : null}
                    />
                  );
                }),
              )}
          </StyledRestaurant>
        )}
        {isFetchingNextPage && (
          <StyledSpinn>
            <SpinnerMini />
          </StyledSpinn>
        )}
        <Header className="mt-[50px]">
          <h1>Our Restaurants</h1>
        </Header>
        <StyledRestaurant>
          {restaurants &&
            restaurants.pages.map((page, pageIndex) =>
              page.map((item, itemIndex) => {
                const isLastRestaurant =
                  pageIndex === restaurants.pages.length - 1 &&
                  itemIndex === page.length - 1;
                return (
                  <RestaurantsItem
                    items={item}
                    key={item._id}
                    ref={isLastRestaurant ? ref : null}
                  />
                );
              }),
            )}
        </StyledRestaurant>
        {restaurantIsFetchNextPage && (
          <StyledSpinn>
            <SpinnerMini />
          </StyledSpinn>
        )}
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
  padding: 50px;
  @media ${device.tablet} {
    padding: 30px;
  }
`;

const StyledRestaurant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const StyledSpinn = styled.div`
  display: flex;
  /* padding-bottom: 50px; */
  padding: 10px;
  align-items: center;
  justify-content: center;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  font-size: 20px;
  color: red;
  p {
    padding-bottom: 10px;
    font-size: 14px;
  }
`;
