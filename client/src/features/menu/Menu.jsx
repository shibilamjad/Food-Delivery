import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { WiTime8 } from 'react-icons/wi';

import { Loader } from '../../ui/Loader';
import { MenuItem } from './MenuItem';
import { useRestaurantsMenu } from '../Restaurant/useRestaurantsMenu';
import ReviewsContent from './ReviewsContent';
import { device } from '../../ui/device';

export function Menu() {
  const { restaurantId } = useParams();
  const { isLoading, restaurantMenu } = useRestaurantsMenu(restaurantId);
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(false);
  };

  const handleReview = () => {
    setIsOpen(true);
  };

  let estimatedTimeRange = '';

  if (restaurantMenu) {
    const { estimatedTime, distance } = restaurantMenu;

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

    const { reviews } = restaurantMenu;
    if (isLoading) return <Loader />;
    return (
      <StyledContainer>
        <StyledConent>
          <li>
            <h1>{restaurantMenu.restaurant}</h1>
            <h2>{restaurantMenu.location}</h2>
            <p>{restaurantMenu.address}</p>
            {distance > 30 ? (
              <h3 style={{ color: 'red' }}>
                Your distance is very long ({Math.round(distance)} km), only
                available within 30km
              </h3>
            ) : (
              <h3 style={{ color: 'green' }}>
                <WiTime8 />: {estimatedTimeRange} ({Math.round(distance)}
                km)
              </h3>
            )}
          </li>
          <StyledNav>
            <Button $active={!isOpen} onClick={handleMenu}>
              Menus
            </Button>
            <Button $active={isOpen} onClick={handleReview}>
              Reviews
            </Button>
          </StyledNav>
        </StyledConent>
        {!isOpen ? (
          <ul className="divide-y divide-stone-200 px-2">
            {restaurantMenu.menu.map((items) => (
              <MenuItem
                items={items}
                restaurantId={restaurantId}
                distance={distance}
                key={items._id}
              />
            ))}
          </ul>
        ) : (
          <ul className="divide-y divide-stone-200 px-2">
            {reviews.length === 0 ? (
              <img src="/not-item-available.png" alt="empty" />
            ) : (
              <>
                {restaurantMenu.reviews.map((items) => (
                  <ReviewsContent review={items} key={items._id} />
                ))}
              </>
            )}
          </ul>
        )}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 70px;
  @media ${device.tablet} {
    padding: 50px;
  }
  @media ${device.mobileL} {
    padding: 30px;
  }
`;
const StyledConent = styled.ul`
  margin-bottom: 20px;
  border-bottom: 1px dashed #ababab;
  padding-bottom: 20px;
  h1 {
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 10px;
    border-bottom: 1px dashed #ababab;
  }
  h2 {
    padding-top: 20px;
    font-size: 18px;
    font-weight: 500;
  }
  p {
    color: grey;
  }
  h3 {
    font-size: 18px;
    display: flex;
    align-items: center;
    font-weight: 500;
  }
`;

const StyledNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 100px;
  padding-top: 40px;
  @media ${device.tablet} {
    gap: 2px;
  }
`;

const Button = styled.button`
  border-bottom: 2px solid ${(props) => (props.$active ? '#436fff' : 'white')};
  color: ${(props) => (props.$active ? '#436fff' : '#2a2a2a')};
  font-weight: 600;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.5s;
  &:hover:not(:disabled) {
    color: ${(props) => (props.$active ? '#436fff' : '#4f4f4f')};
  }
  @media ${device.tablet} {
    font-size: 1.2rem;
  }
`;
