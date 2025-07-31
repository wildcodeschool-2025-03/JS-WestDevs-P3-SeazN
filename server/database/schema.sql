CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  image VARCHAR(250),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL,
  is_major BOOLEAN DEFAULT FALSE,
  zip_code INT,
  country VARCHAR(100) NOT NULL,
  last_active DATE NOT NULL, 
  is_premium BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO user (username, email, password, is_major, country, last_active, is_premium, is_admin)
  VALUES 
    ("Michel Compte", "michel.compte@gmail.com","$argon2i$v=19$m=16,t=2,p=1$RE1QbFNZMlR2aWhVU094SQ$WreuRjApcTLM1lJZnUEOgQ", true, "France", "2025-04-19", false, false),
    ("Jean Premium", "jean.premium@gmail.com","$argon2i$v=19$m=16,t=2,p=1$cUJaWUkzYmVmanhiSXUxWQ$kVaZ6+UC/hNsZ3Snd0iMSw", true, "France", "2025-06-19", true, false),
    ("Denis Admin", "denis.admin@gmail.com","$argon2i$v=19$m=16,t=2,p=1$WHRvNXhhNGNGT3lNbnR6Ng$XRmjrazKwAdqmGTfmKhAvg", true, "France", "2025-05-15", true, true);

CREATE TABLE recipe (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(200) NOT NULL,
  image VARCHAR(255), 
  price TINYINT,
  is_validated BOOLEAN NOT NULL DEFAULT FALSE,
  guest_number INT NOT NULL,
  nutrition_average DECIMAL(3,2), 
  eco_average DECIMAL(3,2),
  duration TIME,
  user_id INT NULL,
  CONSTRAINT fk_user_recipe
   FOREIGN KEY (user_id)
   REFERENCES user(id)
   ON DELETE SET NULL
);

INSERT INTO recipe (name, image, price, is_validated, guest_number, nutrition_average, eco_average, duration, user_id)
VALUES 
    ("Riz au curry haricots coco et champignons", "https://img.cuisineaz.com/660x495/2015/10/22/i100924-riz-champignons.webp", 1, true, 5, 4.6, 4.3, "000:25:00", 1),
    ("Biscuits sans farine au cacao parfumé", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVU6TUuP6uXEqU3PoWYJRfg-tKUT3qror_Q&s", 1, true, 6, 4.2, 3.9, "000:25:00", 1),
    ("Blanquette de veau", "https://assets.afcdn.com/recipe/20190529/93191_w600.jpg", 2, true, 4, 4.2, 3.9, "002:15:00", 2),
    ("Gratin de courgettes au chèvre", "https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/e2e48d2a-cb44-4d06-800e-45b352428815_jvtMTsI.jpg", 1, true, 4, 2.75, 3.91, "0:58:00", 3),
    ("Soupe de lentilles corail", "https://www.cuisinelolo.fr/wp-content/uploads/2010/04/20221102-veloute-de-lentilles-corail-1.jpg", 2, true, 2, 4.3, 2.29, "0:49:00", 3),
    ("Pâtes aux brocolis et citron", "https://cache.marieclaire.fr/data/photo/w1731_ci/6q/recette-tagliatelles-citron-brocoli.webp", 2, true, 6, 3.26, 3.91, "1:10:00", 2),
    ("Salade de quinoa aux légumes grillés", "https://menu-vegetarien.com/wp-content/uploads/2022/10/recette-vegan-quinoa-legumes-hiver.png", 3, true, 6, 4.7, 3.66, "0:42:00", 1),
    ("Curry de pois chiches", "https://lacerisesurlemaillot.fr/wp-content/uploads/2021/04/curry-poischiches-epinards.jpg", 3, true, 4, 3.4, 3.98, "0:39:00", 1),
    ("Pizza aux légumes", "https://media.hachette.fr/fit-in/750x488/5/2025-05/2_2.jpg", 2, true, 6, 4.48, 2.08, "1:00:00", 1),
    ("Tacos de haricots noirs", "https://cdn.pratico-pratiques.com/app/uploads/sites/3/2021/06/02130742/tacos-aux-haricots-noirs.jpg", 1, true, 4, 3.36, 3.85, "0:22:00", 3),
    ("Bowl riz-avocat-tofu", "https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF210426_R212_W24_FR_RFR20162026-1_MB_Main_low-3b59c9b3.jpg", 2, true, 4, 4.94, 2.95, "0:30:00", 2),
    ("Omelette aux fines herbes", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe_A4q3p1vBP5-pXKZc2SukoR7nI93uaF63g&s", 1, true, 4, 4.86, 4.9, "0:27:00", 3),
    ("Galettes de patates douces", "https://menu-vegetarien.com/wp-content/uploads/2025/02/recette-vegetarienne-galettes-patates-douces.jpg", 3, true, 4, 4.08, 3.12, "0:28:00", 3),
    ("Wraps de laitue au poulet", "https://wordpress.potagercity.fr/wp-content/uploads/2019/02/Bouchées-apéritives-de-laitue-1-768x576.jpg", 2, true, 4, 3.69, 2.44, "0:17:00", 2),
    ("Salade de pâtes méditerranéenne", "https://www.cookomix.com/wp-content/uploads/2022/06/salade-pates-mediterraneenne-thermomix-800x600.jpg", 2, true, 4, 4.67, 3.9, "1:03:00", 1),
    ("Tarte rustique aux poireaux", "https://www.jeanmartin.fr/img/cms/tarte%20rustique%20poireaux%20et%20oignons%20pissaladi%C3%A8re%20Jean%20Martin.jpg", 3, true, 6, 4.5, 3.66, "1:21:00", 1),
    ("Croquettes de légumes", "https://img.passeportsante.net/1200x675/2021-02-19/i99794-croquettes-de-legumes.webp", 3, true, 4, 3.57, 4.12, "1:01:00", 1),
    ("Soupe froide de concombre et yaourt", "https://images.radio-canada.ca/q_auto,w_844/v1/alimentation/16x9/soupe-froide-concombre-menthe-yogourt.jpg", 3, true, 6, 2.87, 3.63, "0:13:00", 3),
    ("Risotto aux champignons", "https://img.cuisineaz.com/660x660/2016/08/29/i79702-risotto-aux-champignons-romarin-et-vin-blanc.jpg", 3, true, 6, 2.76, 2.6, "0:20:00", 2),
    ("Gratin dauphinois", "https://ffcuisine.fr/wp-content/uploads/2024/10/1727999215_gratin-dauphinois-aux-pommes-de-terre-et-gruyere-recette-traditionnelle.jpg", 1, true, 6, 4.11, 3.63, "1:04:00", 2),
    ("Poêlée de légumes au sésame", "https://cache.marieclaire.fr/data/photo/w1000_ci/5h/saute-de-legumes-a-l-indonesienne.jpg", 2, true, 4, 3.06, 3.73, "0:40:00", 3),
    ("Chili sin carne", "https://www.lesfruitsetlegumesfrais.com/app/uploads/2023/11/chili-sin-carne-horizontale-img-0007-1.jpg", 2, true, 6, 3.92, 2.46, "0:37:00", 2),
    ("Soupe de courge", "https://recipecontent.fooby.ch/16973_10-9_480-432@2x.jpg", 3, true, 4, 4.23, 3.17, "0:53:00", 2),
    ("Légumes farcis végétariens", "https://mademoisellecoccinelle.com/wp-content/uploads/2021/02/legumes-farcis-vegetariens-quinoa-recette-vegan-sans-gluten.jpg", 2, true, 4, 3.83, 2.41, "1:14:00", 3),
    ("Couscous de légumes", "https://www.papillesetpupilles.fr/wp-content/uploads/2013/04/Couscous-Marocain-aux-l%C3%A9gumes.jpg", 1, true, 8, 4.35, 3.67, "0:40:00", 1),
    ("Poêlée de gnocchis aux épinards", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ96HE34DcX2brPYr0WSyI7uMJe_4G71Ey22g&s", 2, true, 4, 4.11, 3.97, "0:58:00", 2),
    ("Quiche sans pâte aux épinards", "https://www.cuisinelolo.fr/wp-content/uploads/2024/01/20240116-quiche-sans-pate-boursin-epinards-3.jpg", 1, true, 4, 3.06, 3.2, "0:38:00", 1),
    ("Velouté de carottes au cumin", "https://img.cuisineaz.com/660x660/2016/08/15/i87541-veloute-de-carotte-au-cumin-et-au-curcuma.jpg", 2, true, 4, 3.81, 4.27, "0:58:00", 2),
    ("Bœuf bourguignon traditionnel", "https://www.epicurien.be/magazine/00-img-epicurien/recettes-w800/boeuf-bourguignon-cocotte-4.jpg", 3, true, 8, 4.86, 2.31, "1:58:00", 1),
    ("Tajine d'agneau aux pruneaux", "https://img.cuisineaz.com/660x495/2018/03/19/i137999-tajine-d-agneau-aux-pruneaux.jpeg", 2, true, 8, 4.88, 2.11, "1:10:00", 3),
    ("Hamburgers maison au bœuf", "https://resize-elle.ladmedia.fr/rcrop/638,,forcex/img/var/plain_site/storage/images/elle-a-table/les-dossiers-de-la-redaction/dossier-de-la-redac/hamburger-maison/94060670-1-fre-FR/Comment-preparer-le-meilleur-hamburger-maison-du-monde.jpg", 2, true, 4, 4.91, 2.28, "1:47:00", 2),
    ("Curry d'agneau épicé", "https://www.atelierdeschefs.fr/_next/image/?url=https%3A%2F%2Fadc-dev-images-recipes.s3.eu-west-1.amazonaws.com%2Fshutterstock_468970754.jpg&w=3840&q=75" , 2, true, 6, 4.37, 1.96, "1:01:00", 2),
    ("Boulettes de bœuf à la sauce tomate", "https://api-prod-fam.mangerbouger.fr/storage/recettes/shutterstock_1522421264-boulettes-de-boeuf-a-la-sauce-tomate.jpg", 3, true, 4, 4.18, 2.34, "1:30:00", 3),
    ("Poulet basquaise", "https://maxi.cdnartwhere.eu/wp-content/uploads/recipe/2021-04/poulet-basquaise-scaled-963x542-c-default.jpg?ck=37a6259cc0c1dae299a7866489dff0bd", 2, true, 8, 4.39, 2.71, "1:23:00", 2),
    ("Porc au caramel", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwYuNZJOplbcpNi1FTUK6slqPzRg75gLlrbg&s", 3, true, 6, 3.94, 2.08, "1:25:00", 1),
    ("Émincé de poulet au curry", "https://www.papillesetpupilles.fr/wp-content/uploads/2005/07/Poulet-au-curry.jpg", 3, true, 4, 4.32, 2.91, "0:50:00", 3),
    ("Côtes de porc grillées", "https://www.leporcduquebec.com/wp-content/uploads/2021/06/319_Cotelettes-et-legumes-a-la-provencale_web.jpg", 2, true, 6, 4.1, 3.17, "0:37:00", 2),
    ("Sauté de porc aux champignons", "https://img.fourchette-et-bikini.fr/660x495/2022-06/shutterstock_445762072.jpg", 3, true, 4, 3.72, 2.73, "0:25:00", 3);

CREATE TABLE eco_score (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  is_meat BOOLEAN,
  is_fish BOOLEAN,
  is_vegetable BOOLEAN,
  january BOOLEAN,
  february BOOLEAN,
  march BOOLEAN,
  april BOOLEAN,
  may BOOLEAN,
  june BOOLEAN,
  july BOOLEAN,
  august BOOLEAN,
  september BOOLEAN,
  october BOOLEAN,
  november BOOLEAN,
  december BOOLEAN
);

CREATE TABLE ingredient (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name VARCHAR(100) NOT NULL,
  is_vegan BOOLEAN,
  is_vegetarian BOOLEAN,
  is_glutenfree BOOLEAN,
  is_expensive TINYINT,
  nutrition_score TINYINT,
  eco_score_id INT NULL,
  CONSTRAINT fk_ingredient_eco_score
    FOREIGN KEY (eco_score_id) 
    REFERENCES eco_score(id)
    ON DELETE CASCADE
);

INSERT INTO ingredient (name, is_vegan, is_vegetarian, is_glutenfree, is_expensive, nutrition_score)
  VALUES 
  ("riz", true, true, true, 1, 4),
  ("champignons", true, true, true, 1, 5),
  ("haricot coco", true, true, true, 1, 5),
  ("oignons", true, true, true, 1, 5),
  ("eau", true, true, true, 1, 5),
  ("curry", true, true, true, 1, 4),
  ("bouillon de légumes", true, true, true, 1, 3),
  ("sel", true, true, true, 1, 3),
  ("poivre", true, true, true, 1, 4),
  ("cacao", true, true, true, 1, 4),
  ("sucre", true, true, true, 1, 2),
  ("oeufs", false, true, true, 1, 4),
  ("jaune.s d'oeufs", false, true, true, 1, 4),
  ("blanc.s d'oeufs", false, true, true, 1, 4),
  ("noix", true, true, true, 1, 5),
  ("carottes", true, true, true, 1, 5),
  ("crème fraîche", false, true, true, 1, 5),
  ("farine", true, true, false, 1, 5),
  ("veau", false, false, true, 2, 4),
  ("bouillon de poule", false, false, true, 1, 4),
  ("citron", true, true, true, 1, 5),
  ("vin blanc", true, true, true, 2, 4),
  ("courgettes", true, true, true, 1, 5),
  ("chèvre", false, true, true, 2, 4),
  ("lentilles corail", true, true, true, 1, 5),
  ("brocolis", true, true, true, 1, 5),
  ("quinoa", true, true, true, 2, 4),
  ("pois chiches", true, true, true, 1, 5),
  ("pâte à pizza", true, true, false, 2, 3),
  ("haricots noirs", true, true, true, 1, 4),
  ("avocat", true, true, true, 2, 4),
  ("tofu", true, true, true, 1, 4),
  ("œufs entiers", false, true, true, 1, 4),
  ("patates douces", true, true, true, 1, 5),
  ("laitue", true, true, true, 1, 4),
  ("pâtes", true, true, false, 1, 3),
  ("poireaux", true, true, true, 1, 5),
  ("yaourt", false, true, true, 1, 3),
  ("riz arborio", true, true, true, 2, 4),
  ("gnocchis", true, true, false, 2, 3),
  ("carottes", true, true, true, 1, 5),
  ("épices", true, true, true, 1, 3),
  ("cumin", true, true, true, 1, 4),
  ("tomates", true, true, true, 1, 5),
  ("champignons de Paris", true, true, true, 1, 5),
  ("bœuf", false, false, true, 3, 4),
  ("vin rouge", true, true, true, 2, 3),
  ("pruneaux", true, true, true, 2, 4),
  ("pain burger", true, true, false, 2, 3),
  ("steak haché", false, false, true, 3, 4),
  ("fromage", false, true, true, 2, 4),
  ("agneau", false, false, true, 3, 4),
  ("coriandre", true, true, true, 1, 5),
  ("sauce tomate", true, true, true, 1, 4),
  ("boulettes de bœuf", false, false, true, 3, 4),
  ("poivrons", true, true, true, 1, 5),
  ("poulet", false, false, true, 2, 4),
  ("oignons", true, true, true, 1, 5),
  ("sauce soja", true, true, true, 1, 4),
  ("sucre", true, true, true, 1, 2),
  ("curry", true, true, true, 1, 4),
  ("porc", false, false, true, 2, 4),
  ("crème", false, true, true, 2, 4),
  ("beurre", false, true, true, 2, 4);

CREATE TABLE food_preference (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL
);
 
CREATE TABLE instruction (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    step_order TINYINT NOT NULL, 
    content VARCHAR(1000) NOT NULL,
    recipe_id INT NULL,
    CONSTRAINT fk_instruction_recipe
      FOREIGN KEY (recipe_id)
      REFERENCES recipe(id)
      ON DELETE CASCADE
);

INSERT INTO instruction (step_order, content, recipe_id)
VALUES 
       -- Riz au curry haricots coco et champignons (id 1)  
       (1,"Mettez le bouillon de légumes dans l'eau chaude.", 1),
       (2,"Faites dorer l'oignon à la poêle quelques minute puis retirez-le, réservez dans un bol.", 1),
       (3,"Mettez le riz dans la poêle. Quand le riz à bruni, mettez l'eau dessus. Laissez le riz absorber toute l'eau puis ajoutez le curry.", 1),
       (4,"Mélangez, ajoutez l'oignon, les haricots coco et les champignons, mélangez bien le tout. Laissez chauffer quelques minutes.", 1),
       (5,"Servez chaud.", 1),

       -- Biscuits sans farine au cacao parfumé (id 2)  
       (1,"Préchauffez le four sur th.6/180°.", 2),
       (2,"Couvrez la plaque du four de papier sulfurisé.", 2),
       (3,"Dans un saladier, mélangez le cacao (et l’extrait lorsque le cacao est nature), le sucre, 1 bonne pincée de sel et les noix. Ajoutez les blancs d’œufs et mélangez sans excès.", 2),
       (4,"Déposez des cuillères à soupe de pâte sur la plaque en les espaçant.", 2),
       (5,"Mettez au four 15 mn.", 2),
       (6,"Glissez le papier sur une grille et laissez refroidir avec de décoller les biscuits.", 2),

       -- Blanquette de veau (id 3)  
       (1,"Faire revenir la viande dans un peu de beurre doux jusqu'à ce que les morceaux soient un peu dorés.", 3),
       (2,"Saupoudrer de 2 cuillères de farine. Bien remuer.", 3),
       (3,"Ajouter 2 ou 3 verres d'eau, les cubes de bouillon, le vin et remuer. Ajouter de l'eau si nécessaire pour couvrir.", 3),
       (4,"Couper les carottes en rondelles et émincer les oignons puis les incorporer à la viande, ainsi que les champignons.", 3),
       (5,"Laisser mijoter à feu très doux environ 1h30 à 2h00 en remuant.", 3),
       (6,"Si nécessaire, ajouter de l'eau de temps en temps.", 3),
       (7,"Dans un bol, bien mélanger la crème fraîche, le jaune d’oeuf et le jus de citron. Ajouter ce mélange au dernier moment, bien remuer et servir tout de suite.", 3),

        -- Gratin de courgettes au chèvre (id 4)
        (1, "Préchauffez le four à 180°C.", 4),
        (2, "Lavez et coupez les courgettes en rondelles.", 4),
        (3, "Disposez les courgettes dans un plat à gratin et ajoutez le fromage de chèvre.", 4),
        (4, "Enfournez pendant 40 minutes jusqu'à ce que ce soit bien gratiné.", 4),

        -- Soupe de lentilles corail (id 5)
        (1, "Faites revenir un oignon émincé dans une casserole avec un peu d’huile.", 5),
        (2, "Ajoutez les lentilles corail rincées, les épices et couvrez d’eau.", 5),
        (3, "Laissez cuire à feu doux pendant 25 minutes.", 5),
        (4, "Mixez si souhaité, puis servez chaud.", 5),

        -- Pâtes aux brocolis et citron (id 6)
        (1, "Faites cuire les pâtes dans une grande casserole d’eau salée.", 6),
        (2, "Faites cuire les brocolis à la vapeur.", 6),
        (3, "Mélangez les pâtes et les brocolis dans un saladier.", 6),
        (4, "Ajoutez le jus et le zeste d’un citron, un filet d’huile d’olive et servez.", 6),

        -- Salade de quinoa aux légumes grillés (id 7)
        (1, "Faites cuire le quinoa selon les instructions du paquet.", 7),
        (2, "Grillez les légumes coupés en dés au four ou à la poêle.", 7),
        (3, "Mélangez le tout dans un grand saladier.", 7),
        (4, "Ajoutez une vinaigrette maison et servez frais.", 7),

        -- Curry de pois chiches (id 8)
        (1, "Faites revenir l’oignon émincé avec un peu d’huile.", 8),
        (2, "Ajoutez les pois chiches égouttés, les épices et les tomates.", 8),
        (3, "Laissez mijoter pendant 20 minutes.", 8),
        (4, "Servez avec du riz basmati.", 8),

        -- Pizza aux légumes (id 9)
        (1, "Préchauffez le four à 220°C.", 9),
        (2, "Étalez la pâte à pizza sur une plaque recouverte de papier cuisson.", 9),
        (3, "Ajoutez les légumes grillés et la sauce tomate.", 9),
        (4, "Parsemez de fromage et enfournez 20 minutes.", 9),

        -- Tacos de haricots noirs (id 10)
        (1, "Faites chauffer les haricots noirs avec les épices dans une casserole.", 10),
        (2, "Garnissez les tortillas avec le mélange de haricots et les légumes frais.", 10),
        (3, "Ajoutez une sauce au yaourt ou du guacamole.", 10),
        (4, "Servez immédiatement.", 10),

        -- Bowl riz-avocat-tofu (id 11)
        (1, "Faites cuire le riz selon les indications.", 11),
        (2, "Faites revenir les dés de tofu dans une poêle avec un peu d’huile.", 11),
        (3, "Coupez l’avocat en tranches.", 11),
        (4, "Assemblez tous les ingrédients dans un bol et ajoutez de la sauce soja.", 11),

        -- Omelette aux fines herbes (id 12)
        (1, "Battez les œufs dans un bol avec les herbes ciselées, sel et poivre.", 12),
        (2, "Faites fondre un peu de beurre dans une poêle.", 12),
        (3, "Versez le mélange et laissez cuire quelques minutes.", 12),
        (4, "Pliez et servez chaud avec une salade verte.", 12),

        -- Galettes de patates douces (id 13)
        (1, "Râpez les patates douces et égouttez-les bien.", 13),
        (2, "Mélangez avec un œuf, des épices et un peu de farine.", 13),
        (3, "Formez des galettes et faites-les dorer dans une poêle.", 13),
        (4, "Servez avec une sauce au yaourt.", 13),

        -- Wraps de laitue au poulet (id 14)
        (1, "Faites revenir les morceaux de poulet dans une poêle.", 14),
        (2, "Lavez et égouttez les feuilles de laitue.", 14),
        (3, "Disposez le poulet dans les feuilles avec quelques légumes râpés.", 14),
        (4, "Ajoutez une sauce légère et roulez.", 14),

        -- Salade de pâtes méditerranéenne (id 15)
        (1, "Faites cuire les pâtes, puis rincez-les à l’eau froide.", 15),
        (2, "Ajoutez les tomates, poivrons, olives et feta coupée en dés.", 15),
        (3, "Versez un filet d’huile d’olive et de citron.", 15),
        (4, "Mélangez et servez frais.", 15),

        -- Tarte rustique aux poireaux (id 16)
        (1, "Faites revenir les poireaux dans une poêle avec un peu de beurre.", 16),
        (2, "Déroulez la pâte et déposez-la dans un moule à tarte.", 16),
        (3, "Ajoutez les poireaux et un appareil œufs-crème.", 16),
        (4, "Repliez les bords et enfournez à 180°C pendant 35 minutes.", 16),

        -- Croquettes de légumes (id 17)
        (1, "Écrasez les légumes cuits avec un œuf et un peu de chapelure.", 17),
        (2, "Formez des boulettes ou galettes.", 17),
        (3, "Faites-les frire ou cuire au four.", 17),
        (4, "Servez avec une sauce au fromage blanc.", 17),

        -- Soupe froide de concombre et yaourt (id 18)
        (1, "Épluchez et coupez les concombres.", 18),
        (2, "Mixez avec le yaourt, l’ail, l’aneth, sel et poivre.", 18),
        (3, "Réservez au frais pendant 1 heure.", 18),
        (4, "Servez avec un filet d’huile d’olive.", 18),

        -- Risotto aux champignons (id 19)
        (1, "Faites revenir les oignons et les champignons dans du beurre.", 19),
        (2, "Ajoutez le riz et remuez pendant 2 minutes.", 19),
        (3, "Ajoutez le bouillon petit à petit jusqu’à absorption.", 19),
        (4, "Incorporez le parmesan en fin de cuisson.", 19),

        -- Gratin dauphinois (id 20)
        (1, "Épluchez et coupez les pommes de terre en fines tranches.", 20),
        (2, "Disposez-les dans un plat beurré.", 20),
        (3, "Versez la crème, l’ail, sel, poivre et muscade.", 20),
        (4, "Enfournez 1h à 180°C.", 20),

        -- Poêlée de légumes au sésame (id 21)
        (1, "Coupez tous les légumes en morceaux.", 21),
        (2, "Faites-les revenir dans une grande poêle avec un peu d’huile.", 21),
        (3, "Ajoutez les graines de sésame et la sauce soja.", 21),
        (4, "Servez bien chaud.", 21),

        -- Chili sin carne (id 22)
        (1, "Faites revenir les oignons, ail et poivrons.", 22),
        (2, "Ajoutez les haricots rouges, tomates concassées et épices.", 22),
        (3, "Laissez mijoter 25 minutes.", 22),
        (4, "Servez avec du riz ou des tortillas.", 22),

        -- Soupe de courge (id 23)
        (1, "Épluchez la courge et coupez-la en dés.", 23),
        (2, "Faites revenir un oignon avec un peu d’huile.", 23),
        (3, "Ajoutez la courge, couvrez d’eau, salez et poivrez.", 23),
        (4, "Laissez cuire 30 minutes puis mixez.", 23),

        -- Légumes farcis végétariens (id 24)
        (1, "Coupez les chapeaux des légumes (tomates, courgettes…).", 24),
        (2, "Videz-les délicatement.", 24),
        (3, "Préparez une farce à base de riz, légumes et herbes.", 24),
        (4, "Farcissez les légumes et enfournez 40 minutes.", 24),

        -- Couscous de légumes (id 25)
        (1, "Faites revenir les oignons et les épices dans une grande casserole.", 25),
        (2, "Ajoutez les légumes coupés en morceaux.", 25),
        (3, "Couvrez d’eau et laissez mijoter 30 minutes.", 25),
        (4, "Servez avec la semoule gonflée à part.", 25),

        -- Poêlée de gnocchis aux épinards (id 26)
        (1, "Faites dorer les gnocchis à la poêle avec un peu de beurre.", 26),
        (2, "Ajoutez les épinards frais ou surgelés.", 26),
        (3, "Incorporez de la crème et un peu de parmesan.", 26),
        (4, "Remuez et servez chaud.", 26),

        -- Quiche sans pâte aux épinards (id 27)
        (1, "Préchauffez le four à 180°C.", 27),
        (2, "Mélangez les œufs, la crème, les épinards et le fromage râpé.", 27),
        (3, "Versez dans un moule beurré.", 27),
        (4, "Enfournez 35 minutes.", 27),

        -- Velouté de carottes au cumin (id 28)
        (1, "Épluchez les carottes et coupez-les en rondelles.", 28),
        (2, "Faites revenir un oignon avec du cumin.", 28),
        (3, "Ajoutez les carottes, couvrez d’eau et laissez cuire 30 minutes.", 28),
        (4, "Mixez et servez chaud avec un filet de crème.", 28),

        -- Bœuf bourguignon traditionnel (id 29)
        (1, "Faites revenir les morceaux de bœuf dans une cocotte.", 29),
        (2, "Ajoutez les légumes coupés, ail, oignon et lardons.", 29),
        (3, "Versez le vin rouge et un peu de bouillon.", 29),
        (4, "Laissez mijoter à feu doux pendant 2 heures.", 29),

        -- Tajine d'agneau aux pruneaux (id 30)
        (1, "Faites revenir les morceaux d’agneau avec des oignons émincés.", 30),
        (2, "Ajoutez les épices, les amandes et les pruneaux.", 30),
        (3, "Ajoutez un peu d’eau et couvrez.", 30),
        (4, "Laissez mijoter 1h30 à feu doux.", 30),

        -- Hamburgers maison au bœuf (id 31)
        (1, "Formez des steaks avec le bœuf haché, salez et poivrez.", 31),
        (2, "Faites-les cuire à la poêle ou au grill.", 31),
        (3, "Toastez les pains à burger.", 31),
        (4, "Montez les burgers avec garniture et sauce au choix.", 31),

        -- Curry d'agneau épicé (id 32)
        (1, "Faites revenir les morceaux d’agneau avec oignon et ail.", 32),
        (2, "Ajoutez les épices, la tomate et un peu d’eau.", 32),
        (3, "Couvrez et laissez mijoter 1h.", 32),
        (4, "Servez avec du riz.", 32),

        -- Boulettes de bœuf à la sauce tomate (id 33)
        (1, "Préparez des boulettes avec le bœuf, l’œuf, l’ail et le persil.", 33),
        (2, "Faites-les dorer à la poêle.", 33),
        (3, "Ajoutez la sauce tomate et laissez mijoter 20 minutes.", 33),
        (4, "Servez avec des pâtes ou du riz.", 33),

        -- Poulet basquaise (id 34)
        (1, "Faites revenir le poulet dans une cocotte avec de l’huile.", 34),
        (2, "Ajoutez les poivrons, tomates, ail et oignons.", 34),
        (3, "Ajoutez du vin blanc ou un peu d’eau.", 34),
        (4, "Laissez mijoter à feu doux 45 minutes.", 34),

        -- Porc au caramel (id 35)
        (1, "Faites revenir les morceaux de porc dans une poêle.", 35),
        (2, "Ajoutez du sucre pour caraméliser légèrement.", 35),
        (3, "Ajoutez la sauce soja et un peu d’eau.", 35),
        (4, "Laissez mijoter à feu doux jusqu’à réduction.", 35),

        -- Émincé de poulet au curry (id 36)
        (1, "Faites revenir les morceaux de poulet dans une poêle.", 36),
        (2, "Ajoutez l’oignon, l’ail et les épices.", 36),
        (3, "Versez la crème et laissez mijoter 15 minutes.", 36),
        (4, "Servez avec du riz ou des pâtes.", 36),

        -- Côtes de porc grillées (id 37)
        (1, "Assaisonnez les côtes de porc avec sel, poivre et herbes.", 37),
        (2, "Faites-les griller à la poêle ou au barbecue.", 37),
        (3, "Retournez à mi-cuisson pour une cuisson homogène.", 37),
        (4, "Servez avec des légumes ou des pommes de terre.", 37),

        -- Sauté de porc aux champignons (id 38)
        (1, "Faites revenir les morceaux de porc dans une sauteuse.", 38),
        (2, "Ajoutez les champignons émincés et l’ail.", 38),
        (3, "Versez un peu de bouillon ou de crème.", 38),
        (4, "Laissez mijoter 20 minutes et servez chaud.", 38);

CREATE TABLE unit (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   name VARCHAR(100) NOT NULL
);

INSERT INTO unit (name)
VALUES ("g"), ("cl"), ("cuillère(s) à café"), ("cuillère(s) à soupe"), ("pièce(s)"), ("pincée(s)"), ("portion(s)");

CREATE TABLE chosen (
  user_id INT NOT NULL,
  food_preference_id INT NOT NULL,
  PRIMARY KEY (user_id, food_preference_id),
  CONSTRAINT fk_user_chosen
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_food_preference_chosen
    FOREIGN KEY (food_preference_id)
    REFERENCES food_preference(id)
    ON DELETE CASCADE
);

CREATE TABLE rating (
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  mark INT,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_recipe
    FOREIGN KEY (recipe_id)
    REFERENCES recipe(id)
    ON DELETE CASCADE
);

INSERT INTO rating (user_id, recipe_id, mark)
VALUES  (1, 1, 1),(2, 1, 2),(3, 1, 2),
        (1, 2, 3),(2, 2, 4),(3, 2, 5),
        (1, 3, 4),(2, 3, 5),(3, 3, 1),
        (1, 4, 3), (2, 4, 5), (3, 4, 4),
        (1, 5, 2), (2, 5, 4), (3, 5, 1),
        (1, 6, 5), (2, 6, 3), (3, 6, 2),
        (1, 7, 4), (2, 7, 2), (3, 7, 3),
        (1, 8, 2), (2, 8, 5), (3, 8, 4),
        (1, 9, 3), (2, 9, 3), (3, 9, 5),
        (1, 10, 4), (2, 10, 2), (3, 10, 1),
        (1, 11, 5), (2, 11, 4), (3, 11, 2),
        (1, 12, 2), (2, 12, 1), (3, 12, 3),
        (1, 13, 4), (2, 13, 5), (3, 13, 4),
        (1, 14, 3), (2, 14, 3), (3, 14, 5),
        (1, 15, 1), (2, 15, 5), (3, 15, 2),
        (1, 16, 4), (2, 16, 3), (3, 16, 4),
        (1, 17, 2), (2, 17, 4), (3, 17, 1),
        (1, 18, 5), (2, 18, 3), (3, 18, 5),
        (1, 19, 3), (2, 19, 1), (3, 19, 2),
        (1, 20, 4), (2, 20, 2), (3, 20, 4),
        (1, 21, 1), (2, 21, 4), (3, 21, 3),
        (1, 22, 2), (2, 22, 3), (3, 22, 5),
        (1, 23, 3), (2, 23, 5), (3, 23, 1),
        (1, 24, 5), (2, 24, 2), (3, 24, 3),
        (1, 25, 2), (2, 25, 3), (3, 25, 4),
        (1, 26, 4), (2, 26, 5), (3, 26, 2),
        (1, 27, 5), (2, 27, 1), (3, 27, 3),
        (1, 28, 3), (2, 28, 3), (3, 28, 2),
        (1, 29, 2), (2, 29, 4), (3, 29, 1),
        (1, 30, 5), (2, 30, 3), (3, 30, 5),
        (1, 31, 1), (2, 31, 5), (3, 31, 2),
        (1, 32, 3), (2, 32, 2), (3, 32, 4),
        (1, 33, 4), (2, 33, 1), (3, 33, 3),
        (1, 34, 2), (2, 34, 3), (3, 34, 5),
        (1, 35, 5), (2, 35, 2), (3, 35, 4),
        (1, 36, 4), (2, 36, 5), (3, 36, 1),
        (1, 37, 3), (2, 37, 1), (3, 37, 5),
        (1, 38, 1), (2, 38, 3), (3, 38, 2);

CREATE TABLE save (
  user_id INT NOT NULL,
  recipe_id INT NOT NULL,
  is_cooked BOOLEAN,
  is_favorite BOOLEAN,
  cooked_date DATE,
  PRIMARY KEY (user_id, recipe_id),
  CONSTRAINT fk_user_save
    FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_recipe_save
    FOREIGN KEY (recipe_id)
    REFERENCES recipe(id)
    ON DELETE CASCADE
);

INSERT INTO save (user_id, recipe_id, is_favorite)
VALUES  (1, 1, 1), (1, 3, 1), (1, 5, 1), (1, 8, 1), (1, 10, 1), (1, 28, 1), (1, 35, 1), (1, 36, 1), (1, 37, 1),
        (2, 2, 1), (2, 3, 1), (2, 14, 1), (2, 19, 1), (2, 20, 1), (2, 21, 1),
        (3, 30, 1), (3, 31, 1)
;

CREATE TABLE quantity (
  ingredient_id INT NOT NULL,
  recipe_id INT NOT NULL,
  quantity INT NULL,
  unit_id INT NULL, 
  PRIMARY KEY (ingredient_id, recipe_id),
  CONSTRAINT fk_ingredient_quantity
    FOREIGN KEY (ingredient_id)
    REFERENCES ingredient(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_recipe_quantity
    FOREIGN KEY (recipe_id)
    REFERENCES recipe(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_unit_quantity
    FOREIGN KEY (unit_id)
    REFERENCES unit(id)
);

INSERT INTO quantity (ingredient_id, recipe_id, quantity, unit_id)
VALUES  -- Recette 1 : Riz au curry haricots coco et champignons
        (1, 1, 200, 1), (2, 1, 200, 1), (3, 1, 100, 1), (4, 1, 1, 5), (5, 1, null, null),
        (6, 1, null, null), (7, 1, 1, 7), (8, 1, null, null), (9, 1, null, null),
        -- Recette 2 : Biscuits sans farine au cacao parfumé
        (10, 2, 40, 1), (11, 2, 140, 1), (14, 2, 2, null), (15, 2, 100, 1), (8, 2, null, null),
        -- Recette 3 : Blanquette de veau
        (7, 3, 1, 7), (16, 3, 2, 5), (4, 3, 1, 5), (17, 3, 20, 2), (18, 3, 2, 4), 
        (8, 3, null, null), (9, 3, null, null), (19, 3, 1000, 1), (20, 3, 1, 7), 
        (2, 3, 300, 1), (21, 3, 1, 5), (13, 3, 1, null), (22, 3, 25, 2),
        -- Recette 4 : Gratin de courgettes au chèvre
        (24,4,500,1),(23,4,1,5),(4,4,1,5),
        -- Recette 5 : Soupe de lentilles corail
        (26,5,200,1),(22,5,1,5),(16,5,1,5),(47,5,1,3),(6,5,2,4),
        -- Recette 6 : Pâtes aux brocolis et citron
        (28,6,150,1),(27,6,200,1),(21,6,1,5),(22,6,1,5),(6,6,1,4),
        -- Recette 7 : Salade de quinoa aux légumes grillés
        (28,7,150,1),(29,7,100,1),(21,7,1,5),(16,7,1,5),(6,7,1,4),
        -- Recette 8 : Curry de pois chiches
        (30,8,200,1),(22,8,1,5),(6,8,1,4),(47,8,1,3),(29,8,2,4),
        -- Recette 9 : Pizza aux légumes
        (31,9,250,1),(21,9,100,1),(29,9,1,5),(32,9,50,1),
        -- Recette 10 : Tacos de haricots noirs
        (33,10,150,1),(34,10,4,3),(21,10,1,5),(22,10,1,4),
        -- Recette 11 : Bowl riz-avocat-tofu
        (1,11,150,1),(35,11,100,1),(30,11,100,1),(22,11,1,4),
        -- Recette 12 : Omelette aux fines herbes
        (12,12,3,5),(46,12,5,3),(8,12,1,6),(6,12,1,6),
        -- Recette 13 : Galettes de patates douces
        (36,13,300,1),(13,13,1,5),(46,13,1,3),(18,13,2,4),
        -- Recette 14 : Wraps de laitue au poulet
        (22,14,150,1),(36,14,100,1),(21,14,4,5),(6,14,1,4),
        -- Recette 15 : Salade de pâtes méditerranéenne
        (33,15,200,1),(21,15,100,1),(16,15,2,3),(24,15,50,1),
        -- Recette 16 : Tarte rustique aux poireaux
        (37,16,300,1),(4,16,1,5),(16,16,2,4),(11,16,3,3),
        -- Recette 17 : Croquettes de légumes
        (21,17,200,1),(36,17,1,5),(18,17,50,1),(46,17,1,3),
        -- Recette 18 : Soupe froide de concombre et yaourt
        (41,18,1,5),(40,18,150,2),(47,18,1,6),(6,18,1,6),
        -- Recette 19 : Risotto aux champignons
        (2,19,100,1),(19,19,150,1),(6,19,2,4),(17,19,300,2),
        -- Recette 20 : Gratin dauphinois
        (36,20,800,1),(11,20,200,2),(6,20,1,6),(46,20,1,6),
        -- Recette 21 : Poêlée de légumes au sésame
        (21,21,200,1),(36,21,1,5),(29,21,1,5),(47,21,1,4),
        -- Recette 22 : Chili sin carne
        (26,22,200,1),(21,22,100,1),(29,22,1,5),(47,22,1,4),
        -- Recette 23 : Soupe de courge
        (23,23,400,1),(16,23,1,5),(6,23,1,4),(22,23,1,4),
        -- Recette 24 : Légumes farcis végétariens
        (21,24,3,5),(23,24,2,5),(29,24,100,1),(1,24,150,1),
        -- Recette 25 : Couscous de légumes
        (21,25,2,5),(23,25,2,5),(6,25,1,4),(28,25,200,1),
        -- Recette 26 : Poêlée de gnocchis aux épinards
        (33,26,200,1),(27,26,150,1),(11,26,100,2),(46,26,1,3),
        -- Recette 27 : Quiche sans pâte aux épinards
        (27,27,200,1),(11,27,100,2),(46,27,2,3),(16,27,1,4),
        -- Recette 28 : Velouté de carottes au cumin
        (36,28,200,1),(28,28,150,1),(6,28,1,4),(46,28,1,3),
        -- Recette 29 : Bœuf bourguignon traditionnel
        (39,29,600,1),(4,29,1,5),(18,29,2,4),(20,29,1,5),(6,29,1,6),
        -- Recette 30 : Tajine d'agneau aux pruneaux
        (42,30,500,1),(46,30,1,4),(20,30,1,5),(15,30,50,1),(6,30,1,6),
        -- Recette 31 : Hamburgers maison au bœuf
        (39,31,400,1),(44,31,4,3),(45,31,4,3),(43,31,100,1),(6,31,1,6),
        -- Recette 32 : Curry d'agneau épicé
        (42,32,400,1),(46,32,1,4),(6,32,1,4),(21,32,1,5),
        -- Recette 33 : Boulettes de bœuf à la sauce tomate
        (43,33,300,1),(20,33,1,5),(46,33,1,4),(29,33,200,2),
        -- Recette 34 : Poulet basquaise
        (36,34,500,1),(21,34,2,5),(16,34,1,5),(22,34,1,4),
        -- Recette 35 : Porc au caramel
        (44,35,400,1),(46,35,2,4),(6,35,1,6),(22,35,1,4),
        -- Recette 36 : Émincé de poulet au curry
        (36,36,400,1),(6,36,1,4),(46,36,1,4),(22,36,1,4),
        -- Recette 37 : Côtes de porc grillées
        (44,37,500,1),(6,37,1,6),(21,37,1,5),(46,37,1,6),
        -- Recette 38 : Sauté de porc aux champignons
        (44,38,400,1),(19,38,200,1),(6,38,1,6),(22,38,1,4);


CREATE TABLE match_food (
  food_preference_id INT NOT NULL,
  recipe_id INT NOT NULL,
  PRIMARY KEY (food_preference_id, recipe_id),
  CONSTRAINT fk_food_preference_match
    FOREIGN KEY (food_preference_id)
    REFERENCES food_preference(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_recipe_match
    FOREIGN KEY (recipe_id)
    REFERENCES recipe(id)
    ON DELETE CASCADE
);