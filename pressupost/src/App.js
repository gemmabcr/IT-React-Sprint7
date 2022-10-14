import React from "react";
import {productData, webFeatures} from "./data";
import Panel from "./components/Panel/Panel";

function App() {
  const title = '¿Qué quieres hacer?';

  const [formData, setFormData] = React.useState(productData);
  const [total, setTotal] = React.useState(0);
  const [webFormData, setWebFormData] = React.useState(webFeatures)

  function handleChange(event) {
    const {name, checked} = event.target
    setFormData(prevFormData => {
      const newFormData = []
      for (let i = 0 ; i < prevFormData.length; i++){
        const currentItem = prevFormData[i]
        if (currentItem.name === name) {
          const updatedItem = {
            ...currentItem,
            selected: checked,
          }
          newFormData.push(updatedItem)
          if (updatedItem.name === 'web' && !updatedItem.selected){resetWebFeatures()}
        }
        else {
          newFormData.push(currentItem)
        }
      }
      return newFormData
    })
  }

  function webHandleChange(event){
    const {name, value} = event.target
    setWebFormData(prevFormData => {
      const newFormData = []
      for (let i = 0; i < prevFormData.length; i++) {
        const currentInput = prevFormData[i]
        if (currentInput.name === name) {
          const updatedInput = {
            ...currentInput,
            quantity: parseInt(value),
          }
          newFormData.push(updatedInput)
        } else {
          newFormData.push(currentInput)
        }
      }
      return newFormData
    })
  }

  function resetWebFeatures() {
    setWebFormData(prevFormData => {
      const newFormData = []
      for (let i = 0; i < prevFormData.length; i++) {
        const updatedInput = {
          ...prevFormData[i],
          quantity: 0,
        }
        newFormData.push(updatedInput)
      }
      return newFormData
    })
  }

  function decrement (name) {
    setWebFormData(prevFormData => {
      const newFormData = []
      for (let i = 0; i < prevFormData.length; i++) {
        const currentInput = prevFormData[i]
        if (currentInput.name === name) {
          const updatedInput = {
            ...currentInput,
            quantity: parseInt(currentInput.quantity)-1,
          }
          newFormData.push(updatedInput)
        } else {
          newFormData.push(currentInput)
        }
      }
      return newFormData
    })
  }

  function increment (name) {
    setWebFormData(prevFormData => {
      const newFormData = []
      for (let i = 0; i < prevFormData.length; i++) {
        const currentInput = prevFormData[i]
        if (currentInput.name === name) {
          const updatedInput = {
            ...currentInput,
            quantity: parseInt(currentInput.quantity)+1,
          }
          newFormData.push(updatedInput)
        } else {
          newFormData.push(currentInput)
        }
      }
      return newFormData
    })
  }

  React.useEffect(()=>{
    let total = 0;
    formData.map((item) => {
      if (item.selected) total += item.price
    })
    webFormData.map((item) => {
      let amount = item.quantity * item.priceUnity
      total += amount
    })
    setTotal(total)
  }, [formData, webFormData]);

  return (
    <div>
      <h2>{title}</h2>
      {formData.map(item =>
        <div key={item.name}>
          <input
            checked={item.selected}
            id={item.name}
            name={item.name}
            type='checkbox'
            onChange={handleChange}
          />
          <label htmlFor={item.name}>
            {item.product}
          </label>
          {
            item.name === 'web' &&
            item.selected &&
            <Panel
              data={webFormData}
              decrement={decrement}
              increment={increment}
              onChange={webHandleChange}
            />
          }
        </div>
      )}
      <p>Preu: {total}€</p>
    </div>
  );
}

export default App;
