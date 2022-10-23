import React from "react";
import {Panel, RowPanel, RowPanelTitle} from "./PanelStyled";
import Dialog from "../Dialog/Dialog";

const PanelComponent = ({data, onChange, handleButton}) => {

  const [ state, setState ] = React.useState(false)

  return (
    <Panel>
      {
        data.map(input =>
          <RowPanel key={input.name}>
            <RowPanelTitle>
              <label htmlFor={input.name}>
                {input.label}
              </label>
            </RowPanelTitle>
            <button disabled={input.quantity===0} onClick={(e) => handleButton('-', input.name)}>-</button>
            <input
              id={input.name}
              name={input.name}
              onChange={onChange}
              type='number'
              value={input.quantity}
            />
            <button onClick={(e) => handleButton('+', input.name)}>+</button>
            <button onClick={(e) => setState(true)}>Info</button>

            <Dialog
              text={input.modal}
              isOpen={state}
              onClose={(e) => setState(false)}
            />
          </RowPanel>
        )
      }
    </Panel>
  )
}

export default PanelComponent