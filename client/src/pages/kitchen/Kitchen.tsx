import { Link } from "react-router";

const Kitchen = () => {
  return (
    <div>
      <h2>Kitchen :</h2>
      <ul>
        <li><Link to="/kitchen/myrecipes">My Recipes</Link></li>
        <li><Link to="/kitchen/fridge">Fridge</Link></li>
        <li><Link to="/kitchen/shoppinglist">Shopping List</Link></li>
        <li><Link to="/kitchen/settings">Settings</Link></li>
        <li><Link to="/kitchen/planner">Planner</Link></li>
      </ul>
    </div>
  )
}

export default Kitchen;
