import MenuCard from "../../components/ui/menuCard/MenuCard";
import "./products.css";
import { productsMenuList } from "./productsMenuData";

const Products = () => {
  return (
    <section className="products">
      <h2>Produits</h2>
      <ul>
        {productsMenuList.map((menuItem) => {
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

export default Products;
