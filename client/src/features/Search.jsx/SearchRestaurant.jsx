import styled from 'styled-components';
import { device } from '../../ui/device';
import { Input } from '../../ui/Input';
import { useSearch } from './useSearch';
import SearchList from './SearchList';
import { useState } from 'react';
import { SpinnerMini } from '../../ui/SpinnerMini';

function SearchRestaurant() {
  const [search, setSearch] = useState('');
  const { isLoading, restaurants } = useSearch(search);

  return (
    <StyledContainer>
      <StyledSearch>
        <Input
          type="text"
          placeholder="Search Restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </StyledSearch>
      <StyledRestaurant>
        {isLoading ? (
          <StyledSPinner>
            <SpinnerMini />
          </StyledSPinner>
        ) : (
          <>
            {search.length > 0 ? (
              <>
                {restaurants &&
                  restaurants.map((items) => (
                    <SearchList key={items._id} items={items} />
                  ))}
              </>
            ) : (
              <img src="/7718875.png" alt="image" />
            )}
          </>
        )}
      </StyledRestaurant>
      {restaurants && restaurants.length === 0 && (
        <StyledRestaurant>
          <img src="/7718875.png" alt="image" />
        </StyledRestaurant>
      )}
    </StyledContainer>
  );
}

export default SearchRestaurant;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
  padding: 70px;
  @media ${device.tablet} {
    padding: 50px;
  }
`;

const StyledSearch = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const StyledRestaurant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  /* margin-top: 10px; */
`;

const StyledSPinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;
