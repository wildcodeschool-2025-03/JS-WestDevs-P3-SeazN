import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Mon tableau de bord</h1>

      <section>
        <article>
          <h2>Mes recettes cuisinées</h2>
          <img
            src="/images/recettes-cuisinees.png"
            alt="Graphique recettes cuisinées"
          />
        </article>

        <article>
          <h2>Mon temps en cuisine</h2>
          <img
            src="/images/temps-cuisine.png"
            alt="Graphique temps en cuisine"
          />
        </article>

        <article>
          <h2>Mes recettes postées</h2>
          <p>
            <strong>Depuis la création :</strong> 22
          </p>
          <p>
            <strong>Ma dernière recette :</strong> mousse au chocolat
          </p>
        </article>

        <article>
          <h2>Une idée pour ce soir ?</h2>
          <img src="/images/carbonara.png" alt="Carbonara traditionnelle" />
          <p>Carbonara traditionnelle</p>
        </article>
      </section>

      <div className="footer-advice">
        <h2>Le conseil de la semaine :</h2>
        <p>
          Conseils personnalisés d'un nutritionniste en fonction des préférences
          et produits de saison.
        </p>
        <span className="premium-badge">Vue Premium</span>
      </div>
    </div>
  );
};

export default Dashboard;
