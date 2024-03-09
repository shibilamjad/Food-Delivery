import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { device } from '../../ui/device';
import { useCreateOrder } from './useCreateOrder';
import { Loader } from '../../ui/Loader';
import { useCart } from '../cart/useCart';
import { EmptyCart } from '../cart/EmptyCart';
import Map from '../../ui/Map';
import { getDistance } from '../../utils/getDistance';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export function CreateOrder() {
  const { createOrder } = useCreateOrder();
  const { cart, isLoading } = useCart();
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState({
    cityName: '',
    districtName: '',
    villageName: '',
    stateName: '',
  });
  const [lattitude, setLattitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [totalAmt, setTotalAmt] = useState(null);
  const [distance, setDistance] = useState(null);

  // hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // form submission
  const onSubmit = async (data) => {
    try {
      if (!country) {
        toast.error('Address is required');

        return;
      }
      if (error) {
        toast.error(
          'Our Delivery Service Not Available in Your Location Please Click Correct Location',
        );

        return;
      }

      const formData = { ...data, address, lattitude, longitude };
      createOrder(formData);
    } catch (error) {
      console.error(error.message);
    }
  };
  // form error handling
  const onError = (errors) => {
    console.log(errors);
  };
  // total amount calculate
  useEffect(() => {
    if (cart) {
      const totalAmount = calculateTotal(cart);
      setTotalAmt(totalAmount);
    }
    if (lattitude && longitude) {
      getDistances();
    }
  }, [cart, lattitude, longitude]);

  // discount total
  const discount =
    cart &&
    cart.reduce(
      (totalDiscount, item) => totalDiscount + item.menuItem.discount,
      0,
    );
  // restaurant postion
  const restaurantLat = cart && cart.map((item) => item.restaurant.lat);
  const restaurantLong = cart && cart.map((item) => item.restaurant.long);
  // calculate distance
  async function getDistances() {
    try {
      const distance = await getDistance(
        restaurantLat[0],
        restaurantLong[0],
        lattitude,
        longitude,
      );
      setDistance(distance);
    } catch (error) {
      console.error('Error calculating distance:', error);
      setDistance(null);
    }
  }
  // calculate delivery boy charges
  let deliveryCharge = '';

  if (distance < 5) {
    deliveryCharge = 30;
  } else if (distance < 10) {
    deliveryCharge = 40;
  } else if (distance < 20) {
    deliveryCharge = 50;
  } else if (distance < 30) {
    deliveryCharge = 60;
  } else {
    deliveryCharge = 100;
  }

  // calculate in expected time
  const espectedTimeInHours = distance / 40; // 40km speed in hours
  const estimatedTimeInMinutes = espectedTimeInHours * 60;

  let estimatedTimeRange = '';

  if (estimatedTimeInMinutes < 10) {
    estimatedTimeRange = '20-30';
  } else if (estimatedTimeInMinutes < 20) {
    estimatedTimeRange = '30-40';
  } else if (estimatedTimeInMinutes < 30) {
    estimatedTimeRange = '40-50';
  } else if (estimatedTimeInMinutes < 40) {
    estimatedTimeRange = '50-60';
  } else {
    estimatedTimeRange = '60+';
  }
  // totoal payable amount
  const totalPayableAmt = totalAmt + deliveryCharge;

  if (isLoading) return <Loader />;
  if (cart.length === 0) return <EmptyCart />;
  return (
    <StyledContainer>
      <div className="h-screen px-4 py-6">
        <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

        <form>
          <h2 className="pb-3 text-xl font-semibold">Step1</h2>
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
          <h2 className="pb-3 text-xl font-semibold ">Step2</h2>

          <Map
            setAddress={setAddress}
            setLattitude={setLattitude}
            setLongitude={setLongitude}
            setCountry={setCountry}
            setError={setError}
          />
          <div className="cart-items pt-5 ">
            <ul>
              {cart.map((item) => (
                <li key={item.menuItem._id}>
                  <p>Item: {item.menuItem.name}</p>
                  <p>
                    Quantity:
                    <span className="font-semibold">{item.quantity}</span>
                  </p>
                  <p>
                    Price:
                    <span className="font-semibold">{item.totalPrice}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p>
              Total Distance :
              {distance && distance <= 30 ? (
                <span className="mx-[5px] font-semibold">{distance}km</span>
              ) : distance && distance > 30 ? (
                <span className="mx-[5px] text-red-500">
                  {address.villageName} {distance}
                  Km Distance Not Available In Our Service,Only Delivery In 30Km
                  Inside Only.
                </span>
              ) : (
                '--'
              )}
            </p>

            <p>
              Expected Estimated Time:
              {distance && distance < 30 ? (
                <span className="font-semibold">{estimatedTimeRange} mint</span>
              ) : distance && distance > 30 ? (
                <span className="text-red-500">Not Available</span>
              ) : (
                '--'
              )}
            </p>
          </div>
          <div className="mt-2 border-t-2  border-black pt-1 text-[20px] font-semibold ">
            <p>Total Amount: ₹{totalAmt + discount}</p>
            <p className="text-green-700 ">
              DeliveryCharge:
              {distance && distance <= 30 ? (
                <span>₹{deliveryCharge}</span>
              ) : distance && distance > 30 ? (
                <span className="text-red-500">--</span>
              ) : (
                '--'
              )}
            </p>
            <p className="text-red-500 ">Discount: ₹{discount}</p>
            <p className="mt-4 border-t-2  text-green-700">
              Total Payable Amount:
              {distance && distance < 30 ? (
                <span>₹{totalPayableAmt}</span>
              ) : distance && distance > 30 ? (
                <span className="text-red-500">₹{totalAmt}</span>
              ) : (
                '--'
              )}
            </p>
          </div>
          <div>
            <Button
              onClick={handleSubmit(onSubmit, onError)}
              // disabled={distance && distance > 30}
              type="submit"
            >
              Order now
            </Button>
          </div>
        </form>
      </div>
    </StyledContainer>
  );
}

function calculateTotal(cart) {
  return cart.reduce((total, item) => total + item.totalPrice, 0);
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
  margin-bottom: 100px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ffee36; /* Adjusting hover color */
  }
`;
