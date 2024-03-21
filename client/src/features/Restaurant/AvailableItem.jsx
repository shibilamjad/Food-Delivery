import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import { HiMiniStar } from 'react-icons/hi2';
import { forwardRef } from 'react';
import styled from 'styled-components';

export const AvailableItem = forwardRef(({ items }, ref) => {
  const navigate = useNavigate();
  const {
    _id: restaurantId,
    address,
    location,
    image,
    restaurant,
    distance,
    estimatedTime,
    reviews,
  } = items;
  let estimatedTimeRange = '';

  if (estimatedTime < 10) {
    estimatedTimeRange = '20-30';
  } else if (estimatedTime < 20) {
    estimatedTimeRange = '30-40';
  } else if (estimatedTime < 30) {
    estimatedTimeRange = '40-50';
  } else if (estimatedTime < 40) {
    estimatedTimeRange = '50-60';
  } else {
    estimatedTimeRange = '60+';
  }
  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const ratings = reviews.map((review) => parseFloat(review.ratings));
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;

  if (!items) return null;
  return (
    <>
      <a
        role="button"
        ref={ref}
        tabIndex="0"
        onClick={() => handleMenuItems(restaurantId)}
        className=" m-5 mt-1 w-[250px] scale-100 cursor-pointer p-1  sm:w-[300px]"
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

            {isNaN(parseFloat(average)) ? (
              <div className="flex items-center">
                <HiMiniStar />: 0
              </div>
            ) : (
              <div className="flex items-center">
                <HiMiniStar />: {average}
              </div>
            )}

            <div className="flex items-center">
              <WiTime8 /> :{estimatedTimeRange} mins ({Math.round(distance)}
              km)
            </div>
            <p>&bull;{address}</p>
          </StyledMenu>
        </div>
      </a>
    </>
  );
});
AvailableItem.displayName = 'AvailableItem';

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
