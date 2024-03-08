import styled from 'styled-components';
import { Loader } from '../../ui/Loader';
import { MenuItem } from './MenuItem';
import { useRestaurantsMenu } from '../Restaurant/useRestaurantsMenu';
import { useParams } from 'react-router-dom';
import { WiTime8 } from 'react-icons/wi';
export function Menu() {
  const { restaurantId } = useParams();
  const { isLoading, restaurantMenu } = useRestaurantsMenu(restaurantId);

  if (isLoading) return <Loader />;

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

    return (
      <>
        <StyledContainer>
          <StyledConent>
            <li>
              <h1>{restaurantMenu.restaurant}</h1>
              <h2>{restaurantMenu.location}</h2>
              <p>{restaurantMenu.address}</p>
              <p>open</p>
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
          </StyledConent>
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
        </StyledContainer>
      </>
    );
  }
}

const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 70px;
`;
const StyledConent = styled.ul`
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 30px;
  h1 {
    font-size: 28px;
    font-weight: 700;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
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
