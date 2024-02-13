import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import styled from 'styled-components';
import { device } from '../../ui/device';
import { useOrder } from './useOrder';
import { useCreateOrder } from './useCreateOrder';
import { Loader } from '../../ui/Loader';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../cart/useCart';
import { EmptyCart } from '../cart/EmptyCart';
import { useCreateOrderApi } from '../../services/apiOrder';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const createOrderMutation = useCreateOrderApi();

  const navigate = useNavigate();
  const { createOrder } = useCreateOrder();
  const { order, refetch } = useOrder();
  const { cart, isLoading } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const orderId = await createOrderMutation.mutateAsync(data);

      if (orderId) {
        await refetch();
        navigate(`/status/${orderId}`);
      } else {
        throw new Error('OrderId is undefined');
      }
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
    <div className="h-screen px-4 py-6">
      <h2 className=" mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="mb-5 flex flex-col gap-2  sm:flex-row sm:items-center">
          <label className=" sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full "
              type="text"
              id="userName"
              {...register('userName', {
                required: 'This field is required',
              })}
            />
          </div>
        </div>
        <P>{errors?.userName?.message}</P>

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
        <P>{errors?.mobile?.message}</P>
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <div className=" grow ">
            <input
              className="input w-full"
              type="text"
              name="address"
              {...register('address', {
                required: 'This field is required',
              })}
            />
          </div>

          <span className=" absolute right-0.5 top-[37px] z-50 sm:top-1 md:right-[5px] md:top-[3px]">
            <Button
              type="small"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Get position
            </Button>
          </span>
        </div>
        <P>{errors?.address?.message}</P>
        <div>
          {/* <input type="hidden" name="cart" /> */}
          <Button type="primery">Order now</Button>
        </div>
      </form>
    </div>
  );
}
const P = styled.p`
  display: flex;
  align-items: start;
  margin-left: 170px;
  /* margin-bottom: 20px; */
  justify-content: start;
  color: red;
  @media ${device.tablet} {
    margin-left: 0px;
  }
  @media ${device.mobileL} {
    margin-left: 0px;
  }
`;
