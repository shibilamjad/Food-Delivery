import styled from 'styled-components';
import { getTimeDifference } from '../../utils/getTimeDifference';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function ReviewsContent({ review }) {
  const { content, createdAt, ratings, userId, imageUrl } = review;
  return (
    <StyledConatainer>
      <UserDetails>
        <h1>{userId.userName}</h1>
        <p>({getTimeDifference(createdAt)})</p>
      </UserDetails>
      <p>Content:{content}</p>
      <Stack spacing={2}>
        <Rating
          name="half-rating-read"
          defaultValue={parseFloat(ratings)}
          precision={0.5}
          readOnly
        />
      </Stack>
      {imageUrl && <Img src={imageUrl} alt="image" />}
    </StyledConatainer>
  );
}

export default ReviewsContent;

const StyledConatainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  padding-bottom: 40px;
  padding-top: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
`;

const Img = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
