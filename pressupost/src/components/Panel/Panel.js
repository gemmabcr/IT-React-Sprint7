import React from "react";
import styled from "styled-components";

const Panel = styled.div `
  border: 1px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const PanelComponent = ({data, onChange, decrement, increment}) => {
  return (
    <Panel>
      {
        data.map(input =>
          <div key={input.name}>
            <label htmlFor={input.name}>
              {input.label}
            </label>
            <button disabled={input.quantity===0} onClick={() => decrement(input.name)}>-</button>
            <input
              id={input.name}
              name={input.name}
              onChange={onChange}
              type='number'
              value={input.quantity}
            />
            <button onClick={() => increment(input.name)}>+</button>
          </div>
        )
      }
    </Panel>
  )
}

export default PanelComponent