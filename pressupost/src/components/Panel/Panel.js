import React from "react";
import styled from "styled-components";

const Panel = styled.div `
  border: 1px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const PanelComponent = ({data, onChange}) => {
  return (
    <Panel>
      {
        data.map(input =>
          <div key={input.name}>
            <label htmlFor={input.name}>
              {input.label}
            </label>
            <input
              id={input.name}
              name={input.name}
              onChange={onChange}
              type='number'
              value={input.number}
            />
          </div>
        )
      }
    </Panel>
  )
}

export default PanelComponent