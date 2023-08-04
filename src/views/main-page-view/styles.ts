import { colors } from "src/shared/styles/colors";
import { styled } from "styled-components";

export const MainWrap = styled.div`
  width: 100%;
`;
export const MainPopup = styled.div<{ height?: string }>`
  background-color: ${colors.blue[500]};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  z-index: 1000;
  transition: all 0.3s linear;
  height: ${(props) => (props.height ? `${props.height}` : "35%")};
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
  width: 100%;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding-top: 10px;
  background-color: ${colors.white[1000]};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  padding: 0 10px;
`;

export const MainLine = styled.div`
  width: 100%;
  height: 2px;
  width: 30px;
  display: flex;
  margin: 10px 0 0;
  background-color: ${colors.grey[300]};
`;

export const MainDistance = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  width: 100%;
`;

export const RouteWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const RouteWithScroll = styled.ul`
  width: 100%;
  transition: all 0.3s linear;
  height: 120px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  align-items: center;
  list-style: none;

  li {
    border-bottom: 1px solid black;
    width: 100%;
  }
`;
