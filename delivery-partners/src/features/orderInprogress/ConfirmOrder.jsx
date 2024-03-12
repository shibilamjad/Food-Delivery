import styled from "styled-components";
import Buttons from "../../ui/Buttons";
import { device } from "../../ui/device";
import { useOtp } from "./useOtp";
import { useOtpVerify } from "./useOtpVerify";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
export function ConfirmOrder({
  onClose,
  orderId,
  mobile,
  otpOpen,
  setOtpOpen,
}) {
  const { otpSend } = useOtp();
  const { otpVerify } = useOtpVerify();
  const [otp, setOtp] = useState("");
  const [isOtpComplete, setIsOtpComplete] = useState(false);

  useEffect(() => {
    setIsOtpComplete(otp.length === 4);
  }, [otp]);

  function handleOtpSend(mobile) {
    otpSend(mobile);
    setOtpOpen(true);
  }

  function handleConfirm(orderId, mobile, otp) {
    try {
      const data = { mobile, otp, orderId };
      otpVerify(data);
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
    }
  }

  return (
    <StyledConfirmDelete>
      <H1>{!otpOpen ? "Order Confirm?" : "Confirm OTP"}</H1>
      {!otpOpen ? (
        <p>
          Are you sure Order Confirm permanently? This action cannot be undone.
        </p>
      ) : (
        <InputContainer>
          <StyledOtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="text-white">-</span>}
            renderInput={(props, index) => (
              <StyledInput {...props} key={index} />
            )}
          ></StyledOtpInput>
        </InputContainer>
      )}
      <StlyedButton>
        {!otpOpen && (
          <>
            <Buttons variation="secondary" size="medium" onClick={onClose}>
              Cancel
            </Buttons>
            <Buttons
              variation="primary"
              size="medium"
              onClick={() => handleOtpSend(mobile)}
            >
              Confirm
            </Buttons>
          </>
        )}
        {isOtpComplete && (
          <Buttons
            variation="primary"
            size="medium"
            onClick={() => handleConfirm(orderId, mobile, otp)}
          >
            Confirm Otp
          </Buttons>
        )}
      </StlyedButton>
    </StyledConfirmDelete>
  );
}

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${device.mobileL} {
    width: auto;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    /* justify-content: flex-end; */
    gap: 0.8rem;
  }
`;

const StlyedButton = styled.button`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
`;

const H1 = styled.h1`
  color: var(--color-grey-700);
  font-size: 30px;
`;

const StyledOtpInput = styled(OtpInput)`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  min-width: 45px;
  height: 50px;
  border: 1px solid var(--color-grey-400);
  margin: 0 1px;
  text-align: center;
  font-size: 18px;
  outline: none;
  background-color: var(--color-grey-200);
  border-radius: 5px;
  color: var(--color-grey-700);
  @media ${device.tablet} {
    min-width: 35px;
    height: 40px;
  }
  @media ${device.mobileL} {
    min-width: 35px;
    height: 40px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  width: 100%;
  margin-bottom: 10px;
`;
