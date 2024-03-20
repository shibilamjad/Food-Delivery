import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import styled, { keyframes } from "styled-components";
import { SideBar } from "./SideBar";
import { device } from "./device";
import { useEffect, useState } from "react";

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const navIsOpen = localStorage.getItem("isOpen");
    setIsOpen(navIsOpen === "true");
  }, []);

  function handleIsOpen() {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    localStorage.setItem("isOpen", newIsOpen.toString());
  }
  return (
    <>
      <SyledBg>
        {isOpen ? (
          <StyledIsCloseApp>
            <Header isOpen={isOpen} handleIsOpen={handleIsOpen} />
            {!isOpen && <SideBar />}
            <Main>
              <Outlet />
            </Main>
          </StyledIsCloseApp>
        ) : (
          <StyledeApp>
            <Header handleIsOpen={handleIsOpen} />
            <SideBar isOpen={isOpen} />
            <Main>
              <Outlet />
            </Main>
          </StyledeApp>
        )}
      </SyledBg>
    </>
  );
}

const SyledBg = styled.div`
  height: 100vh;
  overflow: scroll;
`;

const StyledIsCloseApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
`;

const StyledeApp = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  width: 100vw;
  transition: all 0.5;
  @media ${device.laptopL} {
    grid-template-columns: 18rem 1fr;
    transition: all 0.5;
  }
  @media ${device.laptop} {
    grid-template-columns: 15rem 1fr;
    transition: all 0.5;
  }
  @media ${device.tablet} {
    grid-template-columns: 8rem 1fr;
    transition: all 0.5;
  }
  @media ${device.mobileL} {
    grid-template-columns: 5rem 1fr;
    transition: all 0.5;
  }
  @media ${device.mobileS} {
    grid-template-columns: 3rem 1fr;
    transition: all 0.5;
  }
`;

const Main = styled.main`
  color: #ffffff;
  padding: 20px;
  width: auto;
  flex-grow: 1;
`;
