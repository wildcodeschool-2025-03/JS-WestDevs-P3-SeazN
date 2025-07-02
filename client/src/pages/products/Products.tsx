import { Link } from "react-router";

const Products = () => {
  return (
    <div>
      Products :
      <ul>
        <li>
          <Link to="/products/seasonnal">Seasonnal</Link>
        </li>
        <li>
          <Link to="/products/analysis">Analysis</Link>
        </li>
      </ul>
    </div>
  )
}

export default Products;
