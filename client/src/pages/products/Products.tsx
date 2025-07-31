import { Link } from "react-router";
import "./products.css";

const Products = () => {
  return (
    <div className="products">
      <h2>Les produits</h2>
      <ul>
        <li>
          <Link to="/products/seasonal">Produits de saison</Link>
          <p>
            Manger selon les saisons, c’est renouer avec le rythme naturel des
            saveurs.
          </p>
        </li>
        <li>
          <Link to="/products/analysis">Analyses des produits</Link>
          <p>
            Décortiquer chaque ingrédient pour mieux comprendre ce que nous
            consommons au quotidien.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Products;
