import React from 'react';
import {DialogContainer, DialogCloseButtonStyles} from './DialogStyled';

const Dialog = ({isOpen, onClose, text}) => {
  if (!isOpen) {
    <></>
  }
  else {
    return (
      <DialogContainer>
        <DialogCloseButtonStyles onClick={onClose}>x</DialogCloseButtonStyles>
        <div>{text}</div>
      </DialogContainer>
    )
  }
}

export default Dialog;