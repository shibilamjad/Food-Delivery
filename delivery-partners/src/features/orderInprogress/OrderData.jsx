import styled from "styled-components";
import {
  FaCartArrowDown,
  FaCity,
  FaLocationDot,
  FaMobileScreenButton,
  FaRegUser,
} from "react-icons/fa6";

import { DataItem } from "../../ui/DataItem";
import { device } from "../../ui/device";
import { BiRestaurant } from "react-icons/bi";
import { getTimeDifference } from "../../utils/getTimeDifference";
import ModalConfirm from "../../ui/ModalConfirm";
import { useState } from "react";
import { ConfirmOrder } from "./ConfirmOrder";

export function OrderData({ details }) {
  const {
    userName,
    mobile,
    address,
    delivery,
    createdAt,
    cart,
    _id: orderId,
    deliveryCharge,
  } = details;
  console.log(details);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // 1) restaurant name
  const restaurantNames = [
    ...new Set(cart.map((item) => item.restaurant.restaurant)),
  ];

  // 2) restaurant Address
  const restaurantAddresses = [
    ...new Set(cart.map((item) => item.restaurant.address)),
  ];

  // 3) restaurant location
  const restaurantLocations = [
    ...new Set(cart.map((item) => item.restaurant.location)),
  ];

  // 4) discount
  const discount = details.cart.reduce(
    (totalDiscount, item) =>
      totalDiscount + (item.menuItem.discount || 0) * item.quantity,
    0
  );

  // 5) normalPrice
  const normalPrice = details.cart.reduce(
    (totalPrice, item) =>
      totalPrice + (item.menuItem.unitPrice || 0) * item.quantity,
    0
  );

  const totalAmount = normalPrice - discount;

  const statusToTagName = {
    pending: "red",
    inprogress: "blue",
    success: "green",
  };
  return (
    <StyledBookingDataBox>
      <Header>
        <FaCartArrowDown />
        <p>Order in {userName}</p>
        <p>{getTimeDifference(createdAt)}</p>
      </Header>

      <Section>
        <StyledRestaurant>
          <DataItem label="Details of Restaurant"></DataItem>
          <DataItem icon={<BiRestaurant />} label="Restaurant">
            {restaurantNames}
          </DataItem>
          <DataItem icon={<FaCity />} label="location">
            {restaurantLocations}
          </DataItem>
          <DataItem icon={<FaLocationDot />} label="Address">
            {restaurantAddresses}
          </DataItem>
        </StyledRestaurant>
        <DataItem label="Details of users"></DataItem>
        <DataItem icon={<FaRegUser />} label="userName">
          {userName}
        </DataItem>
        <DataItem icon={<FaMobileScreenButton />} label="Mobile">
          {mobile}
        </DataItem>
        <DataItem icon={<FaLocationDot />} label="Address">
          {address.villageName}-{address.cityName} {address.disrictName}-
          {address.stateName}
        </DataItem>

        <Guest>
          {cart.map((item) => {
            return (
              <li key={item._id}>
                <Img src={item.menuItem.imageUrl} alt={item.menuItem.name} />
                <P>
                  Item: <span>{item.menuItem.name}</span>
                </P>
                <P>
                  Quantity: <span>{item.quantity}</span>
                </P>
              </li>
            );
          })}
        </Guest>
        <Price type={statusToTagName[delivery]}>
          <StyledBill>
            <p>Bill</p>
            <p>Total Amount: ₹{normalPrice + discount}</p>
            <p>Delivery Charge: ₹{deliveryCharge}</p>
            <p>Discount: ₹{discount}</p>
            <p>Total Payable Amount: ₹{totalAmount + deliveryCharge}</p>
          </StyledBill>
        </Price>
      </Section>

      <Footer>
        <Button onClick={openModal} type={statusToTagName[delivery]}>
          Complete Order
        </Button>
        {modalOpen && (
          <ModalConfirm onClose={closeModal}>
            <ConfirmOrder onClose={closeModal} orderId={orderId} />
          </ModalConfirm>
        )}
      </Footer>
    </StyledBookingDataBox>
  );
}

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  max-width: 1000px;
  overflow: hidden;
  margin: 10px;
  @media ${device.tablet} {
    max-width: 750px;
  }
  @media ${device.tabletS} {
    max-width: 400px;
  }
  @media ${device.mobileL} {
    max-width: 320px;
  }
  @media ${device.mobileS} {
    max-width: 300px;
  }
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
  @media ${device.tablet} {
    padding: 1.5rem 2rem;
    font-size: 1.4rem;
  }
  @media ${device.tabletS} {
    padding: 1rem 1rem;
    font-size: 1rem;
  }
  @media ${device.mobileL} {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
  svg {
    height: 3.2rem;
    width: 3.2rem;
    @media ${device.tablet} {
      height: 2.4rem;
      width: 2.4rem;
    }
    @media ${device.tabletS} {
      height: 1.4rem;
      width: 1.4rem;
    }
    @media ${device.mobileL} {
      height: 2rem;
      width: 2rem;
    }
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;
const StyledRestaurant = styled.div`
  border-bottom: 1px solid var(--color-grey-200);
`;

const Guest = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 4px;
  margin-bottom: 40px;
  justify-content: start;
  align-items: center;
  gap: 2.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  border-top: 1px solid var(--color-grey-200);
  /* & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  } */
`;

const Img = styled.img`
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-top: 15px;
`;
const P = styled.p`
  font-size: 18px;
  color: var(--color-grey-600);
  text-transform: capitalize;
`;
const StyledBill = styled.div`
  padding: 10px 15px;
  font-size: 18px;
  text-transform: capitalize;
  & p:first-child {
    font-size: 22px;
    text-transform: uppercase;
    font-weight: 600;
  }
  & p:nth-child(2) {
    margin-top: 4px;
  }
  & p:nth-child(4) {
    font-weight: 700;
    margin-top: 10px;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${(props) => props.type}-700);
  background-color: var(--color-${(props) => props.type}-100);
  @media ${device.tablet} {
    margin-top: 1rem;
    padding: 1rem 1rem;
  }
  @media ${device.tabletS} {
    margin-top: 1rem;
    padding: 0.7rem 0.7rem;
  }
  @media ${device.mobileL} {
    margin-top: 1rem;
    padding: 0.4rem 0.4rem;
  }
  & p:last-child {
    text-transform: uppercase;
    padding-top: 20px;
    border-top: 1px solid var(--color-${(props) => props.type}-700);
    font-size: 1.4rem;
    font-weight: 600;

    @media ${device.tabletS} {
      font-size: 1.2rem;
    }
    @media ${device.mobileL} {
      font-size: 1rem;
    }
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;

    @media ${device.tablet} {
      height: 2rem;
      width: 2rem;
    }
    @media ${device.mobileL} {
      height: 1.8rem;
      width: 1.8rem;
    }
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

const Button = styled.button`
  color: var(--color-${(props) => props.type}-700);
  padding: 10px;
  background-color: var(--color-${(props) => props.type}-100);
  border-radius: 40px;
`;

const H1 = styled.h1`
  color: var(--color-grey-500);
`;
