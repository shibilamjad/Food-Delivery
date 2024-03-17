import styled from 'styled-components';
import LinkButton from '../../ui/LinkButton';
import FormRow from '../../ui/FormRow';
import { useForm } from 'react-hook-form';
import { device } from '../../ui/device';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useReviewCreate } from './useReviewCreate';
import { useOrderReview } from './useOrderReview';
import { useParams } from 'react-router-dom';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { Loader } from '../../ui/Loader';

function Review() {
  const { orderId } = useParams();
  const { orderReview, isLoading } = useOrderReview(orderId);
  const { reviewCreate } = useReviewCreate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [ratings, setRatings] = useState(0);
  const [error, setError] = useState(false);

  const order = orderReview && orderReview._id;
  const userId = orderReview && orderReview.userId;
  const restaurantId =
    orderReview && orderReview.cart.map((item) => item.restaurant._id);
  const restaurant = restaurantId && restaurantId[0];
  const reviews = orderReview && orderReview.reviews;

  async function onSubmit(data) {
    const formData = { ...data, ratings: ratings, order, userId, restaurant };
    if (formData.ratings === 0) {
      return setError(true);
    }
    await reviewCreate(formData, {
      onSuccess: (formData) => {
        reset();
        setError(false);
      },
    });
  }
  function onError(errors) {
    console.log(errors);
  }
  function handleRatings(e) {
    const ratingValue = parseFloat(e.target.value);
    setRatings(ratingValue);
  }
  if (isLoading) return <Loader />;
  return (
    <StyledContainer>
      <div className="px-3 py-3">
        <LinkButton to="/order">&larr; Back to order List</LinkButton>
      </div>
      <StyledReview>
        <StyledBox>
          {reviews ? (
            <Reviews>
              <div>
                <h1>User:{reviews.userId.userName}</h1>
                <p>({getTimeDifference(reviews.updatedAt)})</p>
              </div>
              <h2>Content:{reviews.content}</h2>
              <div>
                <h2>Ratings:</h2>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={parseFloat(reviews.ratings)}
                    precision={0.5}
                    readOnly
                  />
                </Stack>
              </div>
              <img src={reviews.imageUrl} alt="" />
            </Reviews>
          ) : (
            !reviews && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormRow label="Content" error={errors?.content?.message}>
                  <Textarea
                    type="number"
                    id="content"
                    {...register('content', {
                      required: 'This field is required',
                    })}
                  />
                </FormRow>
                <Stack spacing={1}>
                  <FormRow label="Ratings">
                    <Rating
                      name="half-rating"
                      id="ratings"
                      precision={0.5}
                      size="large"
                      value={parseFloat(ratings)}
                      onChange={handleRatings}
                    />
                  </FormRow>
                  {error && <Error>This field is required</Error>}
                </Stack>
                <FormRow label="Item photo">
                  <FileInput
                    type="file"
                    id="imageUrl"
                    accept="image/*"
                    {...register('imageUrl')}
                  />
                </FormRow>
                <div>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )
          )}
        </StyledBox>
      </StyledReview>
    </StyledContainer>
  );
}

export default Review;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
`;

const Error = styled.p`
  color: red;
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    gap: 3px;
  }
  h1 {
    font-weight: 600;
  }
  p {
    font-size: 12px;
    color: #434343;
  }
`;

const StyledReview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const StyledBox = styled.div`
  border-color: 1px solid green;
  padding: 50px 30px;
  width: 540px;
  height: auto;
  border-radius: 10px;
  background-color: #e8e8e8;
  @media ${device.tablet} {
    width: 440px;
  }
  @media ${device.mobileL} {
    width: 340px;
  }
`;

const Button = styled.button`
  background-color: #f0bf40;
  width: 100%;
  margin-top: 50px;
  padding: 10px 15px;
  border-radius: 40px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #d0a22d;
  }
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  width: 100%;
  height: 8rem;
`;

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: 3px;
  @media ${device.tablet} {
    font-size: 1rem;
  }
  @media ${device.mobileL} {
    font-size: 0.8rem;
  }

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    margin-right: 1.2rem;
    border-radius: 3px;
    border: none;
    color: #eef2ff;
    background-color: #f0bf40;
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;
    @media ${device.laptopL} {
      padding: 0.8rem 1.2rem;
      margin-right: 1.2rem;
    }
    @media ${device.laptop} {
      padding: 0.3rem 0.6rem;
      margin-right: 1.2rem;
    }
    @media ${device.tablet} {
      padding: 0.3rem 0.5rem;
      margin-right: 0.8rem;
    }

    &:hover {
      background-color: #d0a22d;
    }
  }
`;
