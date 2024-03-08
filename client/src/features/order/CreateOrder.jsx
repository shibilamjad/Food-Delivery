import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { device } from '../../ui/device';
import { useCreateOrder } from './useCreateOrder';
import { Loader } from '../../ui/Loader';
import { useCart } from '../cart/useCart';
import { EmptyCart } from '../cart/EmptyCart';
import { useGeoLocation } from '../../utils/useGeoLocation';
import Map from '../../ui/Map';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const { createOrder } = useCreateOrder();
  const { cart, isLoading } = useCart();

  const { position, address } = useGeoLocation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createOrder(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoading) return <Loader />;
  if (cart.length === 0) return <EmptyCart />;

  return (
    <StyledContainer>
      <div className="h-screen px-4 py-6">
        <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

        <form>
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">First Name</label>
            <div className="grow">
              <input
                className="input w-full"
                type="text"
                id="userName"
                {...register('userName', {
                  required: 'This field is required',
                })}
              />
            </div>
          </div>
          <ErrorMessage>{errors?.userName?.message}</ErrorMessage>

          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                className="input w-full"
                type="tel"
                name="mobile"
                {...register('mobile', {
                  required: 'This field is required',
                  validate: (value) =>
                    isValidPhone(value) || 'Invalid phone number',
                })}
              />
            </div>
          </div>
          <ErrorMessage>{errors?.mobile?.message}</ErrorMessage>
          <Map />
          <div>
            <Button onClick={handleSubmit(onSubmit, onError)} type="submit">
              Order now
            </Button>
          </div>
        </form>
      </div>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  padding: 20px;
`;
const ErrorMessage = styled.p`
  display: flex;
  align-items: start;
  margin-left: 170px;
  justify-content: start;
  color: red;
  @media ${device.tablet} {
    margin-left: 0px;
  }
  @media ${device.mobileL} {
    margin-left: 0px;
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
    background-color: #ffee36; /* Adjusting hover color */
  }
`;
