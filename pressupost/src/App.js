import React from "react";

function App() {
  const title = '¿Qué quieres hacer?';
  const data = [
    {
      name: 'web',
      price: 500,
      product: 'Una pàgina web',
      selected: false,
    },
    {
      name: 'seo',
      price: 300,
      product: 'Una campanya SEO',
      selected: false,
    },
    {
      name: 'ads',
      price: 200,
      product: 'Una campanya de Google Ads',
      selected: false,
    },
  ]

  const [formData, setFormData] = React.useState(data);
  const [total, setTotal] = React.useState(0);

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
        }
        else {
          newFormData.push(currentItem)
        }
      }
      return newFormData
    })
  }

  React.useEffect(()=>{
    let total = 0;
    formData.map(item => {
        if (item.selected) {
          total += item.price
        }
      }
    )
    setTotal(total)
  }, formData);

  return (
    <div className="App">
      <header className="App-header">
        <h2>{title}</h2>
        {formData.map(item=>
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
          </div>
        )}
        <p>Preu: {total}€</p>
      </header>
    </div>
  );
}

export default App;
