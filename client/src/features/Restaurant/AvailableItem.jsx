import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import { HiMiniStar } from 'react-icons/hi2';

import styled from 'styled-components';

export function AvailableItem({ items }) {
  const navigate = useNavigate();
  const {
    _id: restaurantId,
    address,
    location,
    image,
    restaurant,
    distance,
    estimatedTime,
  } = items;

  let estimatedTimeRange = '';

  if (estimatedTime < 10) {
    estimatedTimeRange = '20-30';
  } else if (estimatedTime < 20) {
    estimatedTimeRange = '20-30';
  } else if (estimatedTime < 30) {
    estimatedTimeRange = '20-30';
  } else if (estimatedTime < 40) {
    estimatedTimeRange = '30-40';
  } else if (estimatedTime < 50) {
    estimatedTimeRange = '40-50';
  } else {
    estimatedTimeRange = '50+';
  }

  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  if (!items) return null;
  return (
    <>
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
              <WiTime8 /> :{estimatedTimeRange} ({Math.round(distance)}
              km)
            </div>

            <p>Open</p>
            <p>&bull;{address}</p>
          </StyledMenu>
        </div>
      </a>
    </>
  );
}

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
