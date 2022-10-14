import React from "react";
import {Panel, RowPanel, RowPanelTitle} from "./PanelStyled";

const PanelComponent = ({data, onChange, decrement, increment}) => {
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
            <button disabled={input.quantity===0} onClick={() => decrement(input.name)}>-</button>
            <input
              id={input.name}
              name={input.name}
              onChange={onChange}
              type='number'
              value={input.quantity}
            />
            <button onClick={() => increment(input.name)}>+</button>
          </RowPanel>
        )
      }
    </Panel>
  )
}

export default PanelComponent