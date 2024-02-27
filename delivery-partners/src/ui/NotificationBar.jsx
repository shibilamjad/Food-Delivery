import styled, { keyframes } from "styled-components";
import { FaRegClock } from "react-icons/fa6";
import { useNotify } from "../features/order/useNotify";
import { useNavigate } from "react-router-dom";
import { SpinnerMini } from "./SpinnerMini";
import { useOutsideClick } from "../hooks/useOutsideClick";

function getTimeDifference(timestamp) {
  const currentTime = new Date();
  const previousTime = new Date(timestamp);
  const difference = currentTime - previousTime;

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
}

export function NotificationBar({ setIsNotify }) {
  const ref = useOutsideClick(setIsNotify);

  const { notify, isLoading } = useNotify();
  const navigate = useNavigate();
  function handleClick(orderId) {
    navigate(`/order/${orderId}`);
    setIsNotify(false);
  }

  return (
    <StyledNotification ref={ref}>
      {isLoading ? (
        <StyledLoader>
          <SpinnerMini />
        </StyledLoader>
      ) : (
        <>
          {notify.map((notifyItem) => (
            <StyledButton
              key={notifyItem._id}
              onClick={() => handleClick(notifyItem._id)}
            >
              <StyledItem>
                {notifyItem.cart.map((cartItem) => (
                  <Li key={cartItem._id}>
                    <Img src={cartItem.menuItem.imageUrl} />
                    <div>
                      <p>{cartItem.menuItem.name}</p>
                    </div>
                  </Li>
                ))}
                <StyledTime>
                  <FaRegClock />
                  <p>{getTimeDifference(notifyItem.createdAt)}</p>
                  {notifyItem.delivery === "pending" && <P>New</P>}
                </StyledTime>
              </StyledItem>
            </StyledButton>
          ))}
        </>
      )}
    </StyledNotification>
  );
}
const slideIn = keyframes`
from {
  transform: translateZ(-100%);
  opacity: 0;
}
to {
  transform: translateZ(0);
  opacity: 1;
}
`;
const StyledNotification = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: start;
  justify-content: start;
  padding: 20px 20px;
  right: 30px;
  top: 44px;
  width: 300px;
  height: 200px;
  background-color: var(--color-grey-200);
  position: absolute;
  border-radius: 0 0 10px 10px;
  overflow-y: scroll;
  animation: ${slideIn} 0.5s cubic-bezier(0.1, 0.46, 0.45, 0.94) forwards;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button`
  color: var(--color-grey-500);
  border-bottom: 1px solid var(--color-grey-300);
  width: 100%;
  transition: background-color 0.5s ease;
  :hover {
    background-color: var(--color-grey-100);
    transition: background-color 0.5s ease;
  }
`;
const StyledItem = styled.ul`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: var(--color-grey-500);
  border-bottom: 1px solid var(--color-grey-300);
  width: 100%;
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const Li = styled.li`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  /* padding-bottom: 5px; */
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 49px;
`;
const P = styled.p`
  background-color: #0b960b;
  padding: 0px 10px;
  border-radius: 40px;
  color: #fff;
  opacity: 0.8;
  :hover {
  }
`;
const StyledTime = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-left: 50px;
  color: var(--color-grey-400);
`;
