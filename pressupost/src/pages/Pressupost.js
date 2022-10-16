import React from "react";
import {llistatPressupostos, productData, webFeatures} from "../data";
import Panel from "../components/Panel/Panel";
import {RowPanel} from "../components/Panel/PanelStyled";
import {PressupostContainer, BorderBox, ProductListStyle, FlexBetween} from "../components/FormPressupost/FormPressupost";

function Pressupost() {
  const titleForm = 'Què necessites fer?';
  const titleList = 'Llistat de pressupostos';

  const [nomPressupost, setNomPressupost] = React.useState(()=>{
    if (localStorage.getItem('nomPressupost') === null) return ''
    else return JSON.parse(localStorage.getItem('nomPressupost'))
  });
  const [nomClient, setNomClient] = React.useState(()=>{
    if (localStorage.getItem('nomClient') === null) return ''
    else return JSON.parse(localStorage.getItem('nomClient'))
  });
  const [formData, setFormData] = React.useState(() => {
    if (localStorage.getItem('productData') === null) return productData
    else return JSON.parse(localStorage.getItem('productData'))
  });
  const [webFormData, setWebFormData] = React.useState(()=>{
    if (localStorage.getItem('webFeatures') === null) return webFeatures
    else return JSON.parse(localStorage.getItem('webFeatures'))
  });
  const [total, setTotal] = React.useState(0);
  const [pressupostosList, setPressupostosList] = React.useState(()=>{
    if (localStorage.getItem('llistatPressupostos') === null) return llistatPressupostos
    else return JSON.parse(localStorage.getItem('llistatPressupostos'))
  });

  function handleNomPressupost(event){
    const {name, value} = event.target
    setNomPressupost(value)
    localStorage.setItem(name, JSON.stringify(value))
  }

  function handleNomClient(event){
    const {name, value} = event.target
    setNomClient(value)
    localStorage.setItem(name, JSON.stringify(value))

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

  function handleButton (type, name) {
    setWebFormData(prevFormData => {
      const newFormData = []
      for (let i = 0; i < prevFormData.length; i++) {
        const currentInput = prevFormData[i]
        if (currentInput.name === name) {
          if (type==='-'){
            const updatedInput = {
              ...currentInput,
              quantity: parseInt(currentInput.quantity)-1,
            }
            newFormData.push(updatedInput)
          } else {
            const updatedInput = {
              ...currentInput,
              quantity: parseInt(currentInput.quantity)+1,
            }
            newFormData.push(updatedInput)
          }
        } else {
          newFormData.push(currentInput)
        }
      }
      localStorage.setItem('webFeatures', JSON.stringify(newFormData))
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

  function onSubmit(e){
    e.preventDefault();
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
    const newPressupost = {
      id: pressupostosList.length,
      pressupost: nomPressupost,
      client: nomClient,
      productes: productesArray,
      paginaWeb: productesWebArray,
      data: (new Date()).toLocaleDateString("en-US"),
      preuTotal: total,
    }
    setPressupostosList(prevState =>{
      const newPressupostArray = [...prevState, newPressupost]
      localStorage.setItem('llistatPressupostos', JSON.stringify(newPressupostArray))
      return newPressupostArray
    })
  }

  return (
    <PressupostContainer>
      <div>
        <h2>{titleForm}</h2>
        <form>
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
                  handleButton={handleButton}
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
          <BorderBox key={item.id}>
            <p>Nom del pressupost: {item.pressupost}</p>
            <p>Nom del client: {item.client}</p>
            <p>Productes:</p>
            {item.productes.map(product => {
              if (product.name === 'web') {
                return (
                  <BorderBox key={product.name}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <p>{product.product}</p>
                      <p>{product.price}€</p>
                    </div>
                    <ul>
                      {item.paginaWeb.map(web =>
                        (<FlexBetween key={web.label}>
                          <span>{web.label}: {web.quantity}</span>
                          <span>{(web.quantity)*(web.priceUnity)}€</span>
                        </FlexBetween>)
                      )}
                    </ul>
                  </BorderBox>
                )
              } else {
                return (
                  <ProductListStyle key={product.name}>
                    <p>{product.product}</p>
                    <p>{product.price}€</p>
                  </ProductListStyle>
                )
              }
            })}
            <p>Creat: {item.data}</p>
            <p>Total: {item.preuTotal}€</p>
          </BorderBox>
        )}
      </div>
    </PressupostContainer>
  );
}

export default Pressupost;
