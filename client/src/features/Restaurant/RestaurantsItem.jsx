import { useNavigate } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
import { HiMiniStar } from 'react-icons/hi2';
import styled from 'styled-components';

export function RestaurantsItem({ items }) {
  const navigate = useNavigate();
  const {
    _id: restaurantId,
    address,
    location,
    image,
    openTime,
    closeTime,
    restaurant,
    menu,
    distance,
  } = items;

  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  return (
    <>
      {menu.length > 0 && (
        <a
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

              <p>Open</p>
              <p>&bull;{address}</p>
            </StyledMenu>
          </div>
        </a>
      )}
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
