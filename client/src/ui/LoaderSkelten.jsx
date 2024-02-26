import React from 'react';
import styled from 'styled-components';
import { Skeletons } from './Skeleton';
import { device } from './device';

export const LoaderSkelten = () => {
  return (
    <StyledContainer>
      <Header>
        <h1>Loading ...</h1>
      </Header>
      <StyledRestaurant>
        <Skeletons />
      </StyledRestaurant>
      <Header>
        <h1>Loading ...</h1>
      </Header>
      <StyledRestaurant>
        <Skeletons />
        <Skeletons />

        <Skeletons />
      </StyledRestaurant>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
  padding: 70px;
`;
const StyledRestaurant = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
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
