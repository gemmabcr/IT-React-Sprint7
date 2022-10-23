import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Benvingut/da</h1>
      <h3>Estàs a punt de posar en marxa el teu projecte.</h3>
      <Link to={'/pressupost'}>Calcula pressupost</Link>
    </div>
  )
}

export default Home;