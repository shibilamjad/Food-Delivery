import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { HiHome } from "react-icons/hi2";
import { BsBoxArrowLeft } from "react-icons/bs";

import { useLogout } from "../features/Authentication/useLogout";
import { device } from "./device";
import { FaFolderPlus, FaIdCard } from "react-icons/fa6";

function MainNav() {
  const { logout } = useLogout();

  function handleLogout() {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Navigation>
      <NavList>
        <Logo>🍟usePopcorn</Logo>
        <HiddenText>🍟</HiddenText>
        <NavItem to="/dashboard">
          <HiHome />
          <span>Menu</span>
        </NavItem>
        <NavItem to="/menu">
          <FaIdCard />
          <span>Add Menu</span>
        </NavItem>
        <NavItem to="/genre">
          <FaFolderPlus />
          <span>Genre</span>
        </NavItem>
        <Btn onClick={handleLogout}>
          <BsBoxArrowLeft />
          <span> Logout</span>
        </Btn>
      </NavList>
    </Navigation>
  );
}
export default MainNav;

const Navigation = styled.nav`
  // Add any common styles for the navigation here
`;

const HiddenText = styled.h1`
  font-size: 0px;
  transition: all 0.5s;
  @media ${device.tablet} {
    padding-left: 16px;
    font-size: 30px;
    transition: all 0.5;
  }

  @media ${device.mobileL} {
    padding-left: 10px;
    font-size: 30px;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    padding-left: 0px;
    font-size: 30px;
    transition: all 0.5;
  }
`;
const Logo = styled.h1`
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

const NavList = styled.ul`
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
    color: #3730a3;
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
    color: #efefef;
    background-color: #3730a3;
    border-radius: 10px;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #3730a3;
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
    color: #efefef;
  }
`;

const Btn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  color: #3730a3;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.6rem 1rem;
  transition: all 0.3s;
  span {
    display: flex;
    align-items: center;
    color: #3730a3;
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
    color: #efefef;
    background-color: #3730a3;
    border-radius: 10px;
    span {
      display: flex;
      align-items: center;
      color: #ffffff;
      font-size: 1.2rem;
      font-weight: 500;
      gap: 0.2rem;
      transition: all 0.3s;
      @media ${device.tablet} {
        display: flex;
        align-items: center;
        color: #ffffff;
        display: none;
        gap: 0.2rem;
        transition: all 0.3s;
      }
    }
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: #3730a3;
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
    color: #efefef;
  }
`;
