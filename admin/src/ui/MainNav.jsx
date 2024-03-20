import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi2";
import { BsBoxArrowLeft } from "react-icons/bs";

import LogoVechle from "../assets/deliverylogo.png";
import { device } from "./device";
import {
  FaBabyCarriage,
  FaKitchenSet,
  FaPersonBiking,
  FaRegSquarePlus,
} from "react-icons/fa6";
import { BiRestaurant } from "react-icons/bi";
import { useState } from "react";
import ModalConfirm from "./ModalConfirm";
import Logout from "../features/Authentication/Logout";

function MainNav() {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <NavList>
      <Logo>
        <Img src={LogoVechle} alt="img" />
        <h1>DOOR DASH DINE</h1>
      </Logo>
      <HiddenText>
        <img src={LogoVechle} alt="" />
      </HiddenText>
      <NavItem to="/dashboard">
        <HiHome />

        <span>Home</span>
      </NavItem>
      <NavItem to="/order">
        <FaBabyCarriage />

        <span>Order</span>
      </NavItem>

      <NavItem to="/restaurants">
        <BiRestaurant />
        <span>Restuarants List</span>
      </NavItem>
      <NavItem to="/deliveryBoys">
        <FaPersonBiking />
        <span>DeliveryBoy List</span>
      </NavItem>
      <NavItem to="/new-restaurants">
        <FaKitchenSet />
        <span>Create New Restuarant</span>
      </NavItem>
      <NavItem to="/menu">
        <FaRegSquarePlus />
        <span>Add Menu</span>
      </NavItem>
      <NavItem to="/city">
        <FaRegSquarePlus />
        <span>Add City</span>
      </NavItem>
      <Btn onClick={openModal}>
        <BsBoxArrowLeft />
        <span>Logout</span>
      </Btn>
      {modalOpen && (
        <ModalConfirm handleClose={closeModal}>
          <Logout onClose={closeModal} />
        </ModalConfirm>
      )}
    </NavList>
  );
}
export default MainNav;

const HiddenText = styled.h1`
  width: 0px;
  transition: all 0.5s;
  @media ${device.tablet} {
    padding-left: 16px;
    width: 60px;
    transition: all 0.5;
  }

  @media ${device.mobileL} {
    padding-left: 10px;
    width: 60px;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    padding-left: 0px;
    width: 30px;
    transition: all 0.5;
  }
`;
const Img = styled.img`
  width: 80px;
  transition: all 0.5;
  @media ${device.tablet} {
    width: 0px;

    transition: all 0.5;
  }
`;

const Logo = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  font-size: 40px;
  font-weight: 700;
  margin-top: 80px;
  padding-bottom: 40px;
  transition: all 0.5s;
  @media ${device.laptopL} {
    font-size: 35px;
    transition: all 0.5;
    padding-bottom: 40px;
  }
  @media ${device.laptop} {
    font-size: 30px;
    padding-bottom: 40px;
    transition: all 0.5;
  }
  @media ${device.tablet} {
    font-size: 0px;
    transition: all 0.5;
  }
  @media ${device.mobileL} {
    font-size: 0px;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    font-size: 0px;
    transition: all 0.5;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  /* align-items: ce; */
  gap: 0.8rem;
`;

const NavItem = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    color: var(--color-grey-500);
    font-size: 1rem;
    font-weight: 500;
    padding: 0.6rem 1rem;
    transition: all 0.3s;

    @media ${device.laptopL} {
      font-size: 1.2rem;
      font-weight: 500;
      padding: 0.6rem 1rem;
      transition: all 0.5;
    }
    @media ${device.laptop} {
      font-size: 1.2rem;
      padding: 0.6rem 1rem;
      transition: all 0.5;
    }
    @media ${device.tablet} {
      font-size: 0rem;
      padding: 0.6rem 1rem;
      transition: all 0.5;
    }
    @media ${device.mobileL} {
      font-size: 0rem;
      padding: 0.4rem 0.7rem;
      transition: all 0.5;
    }
    @media ${device.mobileS} {
      font-size: 0rem;
      font-weight: 500;
      padding: 0.2rem 0.4rem;
      transition: all 0.5;
    }
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-600);
    background-color: var(--color-grey-50);
    border-radius: 10px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-300);
    transition: all 0.3s;
    @media ${device.laptopL} {
      width: 2.4rem;
      height: 2.4rem;
      transition: all 0.5;
    }
    @media ${device.laptop} {
      width: 2.4rem;
      height: 2.4rem;
      transition: all 0.5;
    }
    @media ${device.tablet} {
      width: 2.4rem;
      height: 2.4rem;
      padding-left: 6px;
      transition: all 0.5;
    }
    @media ${device.mobileL} {
      width: 2rem;
      height: 2rem;
      padding-left: 6px;
      transition: all 0.5;
    }
    @media ${device.mobileS} {
      width: 1.4rem;
      height: 1.4rem;
      padding-left: 3px;
      transition: all 0.5;
    }
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-indigo-100);
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #09090a;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  transition: all 0.3s;
  span {
    display: flex;
    align-items: center;
    color: var(--color-grey-500);
    font-size: 1.2rem;
    font-weight: 500;
    gap: 0.2rem;
    transition: all 0.3s;
  }

  @media ${device.laptopL} {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.6rem 1rem;
    transition: all 0.5;
  }
  @media ${device.laptop} {
    font-size: 1.2rem;
    padding: 0.6rem 1rem;
    transition: all 0.5;
  }
  @media ${device.tablet} {
    font-size: 0rem;
    padding: 0.6rem 1rem;
    transition: all 0.5;
    span {
      display: none;
    }
  }
  @media ${device.mobileL} {
    font-size: 0rem;
    padding: 0.4rem 0.7rem;
    transition: all 0.5;
    span {
      display: none;
    }
  }
  @media ${device.mobileS} {
    font-size: 0rem;
    font-weight: 500;
    padding: 0.2rem 0.4rem;
    transition: all 0.5;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-50);
    background-color: var(--color-grey-50);
    border-radius: 10px;
    span {
      display: flex;
      align-items: center;
      color: var(--color-grey-500);
      font-size: 1.2rem;
      font-weight: 500;
      gap: 0.2rem;
      transition: all 0.3s;
      @media ${device.tablet} {
        display: flex;
        align-items: center;
        color: #535353;
        display: none;
        gap: 0.2rem;
        transition: all 0.3s;
      }
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-300);
    transition: all 0.3s;
    @media ${device.laptopL} {
      width: 2.4rem;
      height: 2.4rem;
      transition: all 0.5;
    }
    @media ${device.laptop} {
      width: 2.4rem;
      height: 2.4rem;
      transition: all 0.5;
    }
    @media ${device.tablet} {
      width: 2.4rem;
      height: 2.4rem;
      padding-left: 6px;
      transition: all 0.5;
    }
    @media ${device.mobileL} {
    }
    @media ${device.mobileS} {
    }
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-indigo-100);
  }
`;
