import styled from "styled-components";

export const DialogContainer = styled.div `
  background-color: #eee;
  border-radius: 8px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  left: 50%;
  margin: 0 auto;
  max-width: 100%;
  padding: 10px 20px 40px;
  position: fixed;
  transform: translate(-50%,-50%);
  width: 500px;
  z-index: 999;
`;

export const DialogCloseButtonStyles = styled.div `
  align-self: flex-end;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  height: 30px;
  margin-bottom: 15px;
  padding: 3px 8px;
  width: 30px;
`;