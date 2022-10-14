import React from "react";
import styled from "styled-components";

const Panel = styled.div `
  border: 1px solid black;
  margin: 0.5rem;
  padding: 0.5rem;
`;

const PanelComponent = () => {
  const [formData, setFormData] = React.useState([
    {
      label: 'Número de pàgines',
      name: 'numPagines',
      quantity: 1,
      priceUnity: 30,
    },
    {
      label: 'Número de idiomes',
      name: 'numIdiomes',
      quantity: 1,
      priceUnity: 30,
    }
  ])

  function handleChange(event){
    const {name, value} = event.target
    setFormData(prevFormData => {
        const newFormData = []
        for (let i = 0; i < prevFormData.length; i++) {
          const currentInput = prevFormData[i]
          if (currentInput.name === name) {
            const updatedInput = {
              ...currentInput,
              quantity: value,
            }
            newFormData.push(updatedInput)
          } else {
            newFormData.push(currentInput)
          }
        }
        return newFormData
    })
  }

  return (
    <Panel>
      {
        formData.map(input =>
          <div key={input.name}>
            <label htmlFor={input.name}>
              {input.label}
            </label>
            <input
              id={input.name}
              name={input.name}
              onChange={handleChange}
              placeholder={input.label}
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