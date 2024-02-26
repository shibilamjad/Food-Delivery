import styled from 'styled-components';

const Skeleton = () => {
  return (
    <div className=" flex w-72 flex-col gap-4">
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-full"></div>
    </div>
  );
};

export const Skeletons = () => {
  return (
    <StyledContainer>
      <StyledLoader>
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </StyledLoader>
    </StyledContainer>
  );
};
const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 10px;
`;
const StyledContainer = styled.div`
  width: 100%;
  max-width: 1840px;
  margin: 0 auto;
  padding: 70px;
`;
