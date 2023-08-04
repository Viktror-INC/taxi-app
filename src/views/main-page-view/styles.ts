import { colors } from "src/shared/styles/colors";
import { styled } from "styled-components";

export const MainWrap = styled.div`
  width: 100%;
`;
export const MainPopup = styled.div`
  background-color: ${colors.blue[500]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  z-index: 1000;
  height: 200px;
`;

export const BlueBorder = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.white[1000]};
  font-size: 14px;
`;

export const MainPopupBody = styled.div`
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-top: 10px;
  background-color: ${colors.white[1000]};
  height: 100%;
  display: flex;
`;

export const MainLine = styled.div`
  width: 100%;
  height: 2px;
  width: 30px;
  display: flex;
  margin: 0 auto;
  background-color: ${colors.grey[300]};
`;
