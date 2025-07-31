import "./Seasonal.css";

const harvestList = [
  {
    mois: "Janvier",
    fruits: [
      "Citron",
      "Kiwi",
      "Mandarine",
      "Orange",
      "Pamplemousse",
      "Poire",
      "Pomme",
    ],
    legumes: [
      "Ail",
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou de Bruxelles",
      "Endive",
      "Épinards",
      "Mâche",
      "Navet",
      "Oignon",
      "Poireau",
      "Pomme de terre",
    ],
  },
  {
    mois: "Février",
    fruits: [
      "Citron",
      "Kiwi",
      "Mandarine",
      "Orange",
      "Pamplemousse",
      "Poire",
      "Pomme",
    ],
    legumes: [
      "Ail",
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou de Bruxelles",
      "Endive",
      "Épinards",
      "Mâche",
      "Navet",
      "Oignon",
      "Poireau",
      "Pomme de terre",
    ],
  },
  {
    mois: "Mars",
    fruits: ["Citron", "Kiwi", "Orange", "Pamplemousse", "Poire", "Pomme"],
    legumes: [
      "Ail",
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou-fleur",
      "Endive",
      "Épinards",
      "Mâche",
      "Navet",
      "Oignon",
      "Poireau",
      "Radis",
      "Pomme de terre",
    ],
  },
  {
    mois: "Avril",
    fruits: ["Citron", "Kiwi", "Orange", "Pomme"],
    legumes: [
      "Artichaut",
      "Carotte",
      "Chou",
      "Chou-fleur",
      "Épinards",
      "Fèves",
      "Navet",
      "Oignon",
      "Radis",
      "Salade",
      "Asperge",
    ],
  },
  {
    mois: "Mai",
    fruits: ["Cerise", "Fraise", "Framboise", "Pomme", "Rhubarbe"],
    legumes: [
      "Artichaut",
      "Asperge",
      "Carotte",
      "Chou-fleur",
      "Concombre",
      "Épinards",
      "Fèves",
      "Haricot vert",
      "Navet",
      "Petit pois",
      "Radis",
      "Salade",
    ],
  },
  {
    mois: "Juin",
    fruits: [
      "Abricot",
      "Cerise",
      "Fraise",
      "Framboise",
      "Melon",
      "Nectarine",
      "Pêche",
    ],
    legumes: [
      "Artichaut",
      "Aubergine",
      "Carotte",
      "Concombre",
      "Courgette",
      "Fèves",
      "Haricot vert",
      "Petit pois",
      "Poivron",
      "Radis",
      "Salade",
      "Tomate",
    ],
  },
  {
    mois: "Juillet",
    fruits: [
      "Abricot",
      "Fraise",
      "Framboise",
      "Melon",
      "Mûre",
      "Nectarine",
      "Pêche",
      "Prune",
    ],
    legumes: [
      "Aubergine",
      "Carotte",
      "Concombre",
      "Courgette",
      "Haricot vert",
      "Poivron",
      "Salade",
      "Tomate",
    ],
  },
  {
    mois: "Août",
    fruits: [
      "Figue",
      "Framboise",
      "Melon",
      "Mûre",
      "Nectarine",
      "Pêche",
      "Poire",
      "Prune",
      "Raisin",
    ],
    legumes: [
      "Aubergine",
      "Betterave",
      "Carotte",
      "Concombre",
      "Courgette",
      "Haricot vert",
      "Poivron",
      "Salade",
      "Tomate",
    ],
  },
  {
    mois: "Septembre",
    fruits: [
      "Figue",
      "Framboise",
      "Melon",
      "Mûre",
      "Pomme",
      "Poire",
      "Prune",
      "Raisin",
    ],
    legumes: [
      "Aubergine",
      "Carotte",
      "Chou",
      "Concombre",
      "Courge",
      "Courgette",
      "Haricot vert",
      "Poivron",
      "Tomate",
    ],
  },
  {
    mois: "Octobre",
    fruits: ["Figue", "Kiwi", "Pomme", "Poire", "Prune", "Raisin"],
    legumes: [
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou",
      "Courge",
      "Endive",
      "Mâche",
      "Navet",
      "Pomme de terre",
      "Poireau",
    ],
  },
  {
    mois: "Novembre",
    fruits: ["Kiwi", "Orange", "Pomme", "Poire"],
    legumes: [
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou",
      "Courge",
      "Endive",
      "Épinards",
      "Mâche",
      "Navet",
      "Poireau",
      "Pomme de terre",
    ],
  },
  {
    mois: "Décembre",
    fruits: ["Kiwi", "Mandarine", "Orange", "Pamplemousse", "Poire", "Pomme"],
    legumes: [
      "Ail",
      "Betterave",
      "Carotte",
      "Céleri",
      "Chou de Bruxelles",
      "Endive",
      "Épinards",
      "Mâche",
      "Navet",
      "Oignon",
      "Poireau",
      "Pomme de terre",
    ],
  },
];

const Seasonal = () => {
  return (
    <div className="seasonal">
      <h1>Fruits et légumes de saison</h1>
      <section className="months-wrapper">
        {harvestList.map((item) => (
          <div key={item.mois} className="month">
            <h2>{item.mois.toUpperCase()}</h2>

            <h3>Fruits</h3>
            <ul>
              {item.fruits.map((fruit) => (
                <li key={fruit}>{fruit}</li>
              ))}
            </ul>

            <h3>Légumes</h3>
            <ul>
              {item.legumes.map((legume) => (
                <li key={legume}>{legume}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Seasonal;
