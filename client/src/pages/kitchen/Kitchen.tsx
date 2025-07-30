import MenuCard from "../../components/ui/menuCard/MenuCard";
import { kitchenMenuList } from "./kitchenMenuData";
import "./kitchen.css";

const Kitchen = () => {
  return (
    <section className="my-kitchen">
      <h2>Ma Cuisine</h2>
      <ul>
        {kitchenMenuList.map((menuItem) => {
          return (
            <li key={menuItem.id}>
              <MenuCard item={menuItem} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Kitchen;
