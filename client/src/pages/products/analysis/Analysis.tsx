import "./Analysis.css";

const productsData = [
  {
    name: "Carotte",
    category: "Légume racine",
    nutrition: ["41 kcal", "2.8 g fibres", "9.6 g glucides"],
    benefits: ["Bonne vision", "Antioxydant", "Facilite la digestion"],
    uses: ["Râpée", "Soupe", "Jus"],
  },
  {
    name: "Tomate",
    category: "Fruit légume",
    nutrition: ["18 kcal", "1.2 g fibres", "3.9 g glucides"],
    benefits: ["Hydratante", "Antioxydante", "Riche en lycopène"],
    uses: ["Crue", "Sauce", "Grillée"],
  },
  {
    name: "Courgette",
    category: "Légume",
    nutrition: ["17 kcal", "1.1 g fibres", "2.1 g glucides"],
    benefits: ["Peu calorique", "Facilite la digestion", "Riche en eau"],
    uses: ["Gratin", "Poêlée", "Crue râpée"],
  },
  {
    name: "Poivron",
    category: "Légume",
    nutrition: ["20 kcal", "1.7 g fibres", "4.6 g glucides"],
    benefits: ["Antioxydant", "Tonifiant", "Renforce l’immunité"],
    uses: ["Farcis", "Cru en salade", "Sauté"],
  },
  {
    name: "Haricot vert",
    category: "Légume à gousse",
    nutrition: ["31 kcal", "3.4 g fibres", "7 g glucides"],
    benefits: ["Bon pour le transit", "Riche en fibres", "Peu calorique"],
    uses: ["Vapeur", "Sauté", "Salade"],
  },
  {
    name: "Aubergine",
    category: "Légume",
    nutrition: ["25 kcal", "3 g fibres", "5.7 g glucides"],
    benefits: ["Effet détox", "Antioxydant", "Réduit le cholestérol"],
    uses: ["Gratin", "Poêlée", "Rôtie"],
  },
];

const Analysis = () => {
  return (
    <div className="Analysis">
      <table className="nutrient-table">
        <thead>
          <tr>
            <th>Légume</th>
            <th>Calories</th>
            <th>Fibres</th>
            <th>Glucides</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((veg) => {
            const [cal, fib, glu] = veg.nutrition;
            return (
              <tr key={veg.name}>
                <td>{veg.name}</td>
                <td>{cal.replace(" kcal", "")}</td>
                <td>{fib}</td>
                <td>{glu}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <section className="cards-wrapper">
        {productsData.map((veg) => (
          <div key={veg.name} className="veg-card">
            <h2>{veg.name}</h2>
            <p className="veg-category">{veg.category}</p>

            <section>
              <h3>Profil Nutritionnel</h3>
              <ul>
                {veg.nutrition.map((item) => (
                  <li key={`${veg.name}-nutrition-${item}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Bienfaits Santé</h3>
              <ul>
                {veg.benefits.map((item) => (
                  <li key={`${veg.name}-benefit-${item}`}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Modes de consommation</h3>
              <ul>
                {veg.uses.map((item) => (
                  <li key={`${veg.name}-use-${item}`}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Analysis;
