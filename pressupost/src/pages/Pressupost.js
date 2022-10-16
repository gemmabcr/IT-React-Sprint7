import React from "react";
import {llistatPressupostos, productData, webFeatures} from "../data";
import Panel from "../components/Panel/Panel";
import {RowPanel} from "../components/Panel/PanelStyled";
import {PressupostContainer, borderBox, productListStyle} from "../components/FormPressupost/FormPressupost";

function Pressupost() {
  const titleForm = 'Què necessites fer?';
  const titleList = 'Llistat de pressupostos';

  const [nomPressupost, setNomPressupost] = React.useState('');
  const [nomClient, setNomClient] = React.useState('');
  const [formData, setFormData] = React.useState(() => {
    if (localStorage.getItem('productData') === null) return productData
    else return JSON.parse(localStorage.getItem('productData'))
  });
  const [webFormData, setWebFormData] = React.useState(()=>{
    if (localStorage.getItem('webFeatures') === null) return webFeatures
    else return JSON.parse(localStorage.getItem('webFeatures'))
  });
  const [total, setTotal] = React.useState(0);
  const [pressupostosList, setPressupostosList] = React.useState(llistatPressupostos);

  function handleNomPressupost(event){
    setNomPressupost(event.target.value)
  }

  function handleNomClient(event){
    setNomClient(event.target.value)
  }

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
      localStorage.setItem('productData', JSON.stringify(newFormData))
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
      localStorage.setItem('webFeatures', JSON.stringify(newFormData))
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
    formData.forEach((item) => {
      if (item.selected) total += item.price
    })
    webFormData.forEach((item) => {
      let amount = item.quantity * item.priceUnity
      total += amount
    })
    setTotal(total)
  }, [formData, webFormData]);

  function onSubmit(){
    const productesArray = []
    const productesWebArray = []
    formData.forEach(product => {
      if (product.selected){
        if (product.name === 'web') {
          webFormData.forEach(item => productesWebArray.push(item))
          productesArray.push(product)
        }
        else productesArray.push(product)
      }
    })
    setPressupostosList(prevState => [...prevState, {
      id: pressupostosList.length,
      pressupost: nomPressupost,
      client: nomClient,
      productes: productesArray,
      paginaWeb: productesWebArray,
      data: (new Date()).toLocaleDateString("en-US"),
      preuTotal: total,
    }])
  }

  return (
    <PressupostContainer>
      <div>
        <h2>{titleForm}</h2>
        <form onSubmit={onSubmit}>
          <RowPanel>
            <label htmlFor='nomPressupost'>
              Nom del pressupost
            </label>
            <input
              id='nomPressupost'
              name='nomPressupost'
              onChange={handleNomPressupost}
              type='text'
              value={nomPressupost}
            />
          </RowPanel>
          <RowPanel>
            <label htmlFor='nomClient'>
              Nom del client
            </label>
            <input
              id='nomClient'
              name='nomClient'
              onChange={handleNomClient}
              type='text'
              value={nomClient}
            />
          </RowPanel>
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
        </form>
        <p>Preu: {total}€</p>
        <button onClick={onSubmit}>Guardar</button>
      </div>
      <div>
        <h2>{titleList}</h2>
        {pressupostosList.length !== 0 && pressupostosList.map(item=>
          <div style={borderBox} key={item.id}>
            <p>Nom del pressupost: {item.pressupost}</p>
            <p>Nom del client: {item.client}</p>
            <p>Productes:</p>
            {item.productes.map(product => {
              if (product.name === 'web') {
                return (
                  <div key={product.name} style={borderBox}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <p>{product.product}</p>
                      <p>{product.price}€</p>
                    </div>
                    <ul>
                      {item.paginaWeb.map(web =>
                        (<li key={web.label} style={{display: 'flex', justifyContent: 'space-between'}}>
                          <span>{web.label}: {web.quantity}</span>
                          <span>{(web.quantity)*(web.priceUnity)}€</span>
                        </li>)
                      )}
                    </ul>
                  </div>
                )
              } else {
                return (
                  <div key={product.name} style={productListStyle}>
                    <p>{product.product}</p>
                    <p>{product.price}€</p>
                  </div>
                )
              }
            })}
            <p>Creat: {item.data}</p>
            <p>Total: {item.preuTotal}€</p>
          </div>
        )}
      </div>
    </PressupostContainer>
  );
}

export default Pressupost;
