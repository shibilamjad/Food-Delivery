import { HiMiniStar } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function SearchList({ items }) {
  const {
    _id: restaurantId,
    address,
    location,
    image,
    restaurant,
    menu,
    reviews,
  } = items;
  const navigate = useNavigate();

  const handleMenuItems = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };
  const ratings = reviews.map((review) => parseFloat(review.ratings));
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;

  return (
    <>
      <>
        {menu.length > 0 && (
          <a
            role="button"
            tabIndex="0"
            onClick={() => handleMenuItems(restaurantId)}
            className="m-5 w-[250px] scale-100 cursor-pointer sm:w-[300px]"
          >
            <div className="flex h-[290px] flex-col  transition-all duration-300 sm:h-[300px] sm:hover:scale-[0.9]">
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

                <p>&bull;{address}</p>
              </StyledMenu>
            </div>
          </a>
        )}
      </>
    </>
  );
}

export default SearchList;

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
