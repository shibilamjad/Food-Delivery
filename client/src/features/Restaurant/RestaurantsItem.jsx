import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import haversine from 'haversine-distance';
import styled from 'styled-components';
import { forwardRef, useEffect, useState } from 'react';
import { HiMiniStar } from 'react-icons/hi2';

import { getCurrentPosition } from '../../utils/getCurrentPostion';
import { useCity } from './useCity';

export const RestaurantsItem = forwardRef(({ items }, ref) => {
  const locations = localStorage.getItem('location');
  const [distnaces, setDistance] = useState([]);
  const navigate = useNavigate();
  const {
    _id: restaurantId,
    address,
    location,
    image,
    restaurant,
    menu,
    lat,
    long,
  } = items;
  const { distance } = distnaces && distnaces;
  const { getCity } = useCity();
  const cityCurrent =
    getCity &&
    getCity.reduce((acc, city) => {
      acc[city.cityName] = {
        latitude: city.latitude,
        longitude: city.longitude,
      };
      return acc;
    }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the user's current position
        const position = await getCurrentPosition();

        if (locations === 'current') {
          const distance = haversine(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            { latitude: lat, longitude: long },
          );
          const restaurantWithDistance = {
            ...items,
            distance: Math.round(distance / 1000),
          };
          setDistance(restaurantWithDistance);
        } else {
          const cityCoordinated = cityCurrent && cityCurrent[locations];

          if (cityCoordinated) {
            const { latitude, longitude } = cityCoordinated;

            const distance = haversine(
              {
                latitude: latitude,
                longitude: longitude,
              },
              { latitude: lat, longitude: long },
            );
            const restaurantWithDistance = {
              ...items,
              distance: Math.round(distance / 1000),
            };
            setDistance(restaurantWithDistance);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  return (
    <>
      {menu.length > 0 && (
        <a
          role="button"
          ref={ref}
          tabIndex="0"
          onClick={() => handleMenuItems(restaurantId)}
          className="m-5 w-[250px] scale-100 cursor-pointer sm:w-[300px]"
        >
          <div className="flex h-[290px] flex-col justify-between transition-all duration-300 sm:h-[380px] sm:hover:scale-[0.9]">
            <div>
              <img
                src={image}
                alt={restaurant}
                className="h-36 w-full rounded-[30px] object-cover sm:h-52 sm:w-full"
              />
            </div>
            <StyledMenu>
              <h1>
                {restaurant}({location})
              </h1>

              <div className="flex items-center">
                <HiMiniStar />: 3.4
              </div>
              <div className="flex items-center">
                <WiTime8 /> :
                {distance > 30 ? (
                  <h2 className="text-sm text-red-600">
                    Very Long your distance
                  </h2>
                ) : (
                  `30 - 40 (${distance}km)`
                )}
              </div>
              <p>&bull;{address}</p>
            </StyledMenu>
          </div>
        </a>
      )}
    </>
  );
});
RestaurantsItem.displayName = 'RestaurantsItem';

const StyledMenu = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 3px;
    font-weight: 600;
  }
  p {
    font-size: 12px;
    color: #7e7e7e;
    font-style: italic;
  }
  svg {
    width: 20px;
    height: 20px;
    margin: 5px 0px;
    color: green;
  }
  div {
    font-size: 16px;
    font-weight: 500;
  }
`;
