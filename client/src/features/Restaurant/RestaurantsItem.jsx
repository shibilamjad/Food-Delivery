import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import { HiMiniStar } from 'react-icons/hi2';

import { Loader } from '../../ui/Loader';
import { useAddCart } from '../cart/useAddCart';
import { useCart } from '../cart/useCart';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getLocation } from '../../utils/getLocation';

export function RestaurantsItem({ items }) {
  const [totalDistance, setTotalDistance] = useState(null);
  const navigate = useNavigate();
  const {
    _id: restaurantId,
    address,
    location,
    image,
    lat,
    long,
    openTime,
    closeTime,
    restaurant,
    menu,
  } = items;
  const { addCart } = useAddCart();
  const { cart, isLoading } = useCart();

  useEffect(() => {
    getLocation(lat, long, setTotalDistance);
  }, [lat, long]);

  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  if (isLoading) return <Loader />;
  return (
    <>
      {menu.length > 0 && (
        <a
          onClick={() => handleMenuItems(restaurantId)}
          className="m-10 h-[400px] w-[200px] scale-100 cursor-pointer sm:w-[300px]"
        >
          <div className="flex h-[330px] flex-col justify-between transition-all duration-300 sm:h-[380px] sm:hover:scale-[0.9]">
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
                {totalDistance > 30 ? (
                  <h2 className="text-sm text-red-600">
                    Very Long your distance
                  </h2>
                ) : (
                  `30 - 40 (${totalDistance})`
                )}
              </div>

              <p>Open</p>
              <p>&bull;{address}</p>
            </StyledMenu>
          </div>
        </a>
      )}
    </>
  );
}
const Button = styled.button`
  display: flex;
  align-items: start;
  justify-content: start;
`;

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