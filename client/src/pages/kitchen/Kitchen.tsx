import MenuCard from "../../components/ui/menuCard/MenuCard";
import "./kitchen.css";
import { kitchenMenuList } from "./kitchenMenuData";

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
