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

INSERT INTO recipe (name, image, price, is_validated, guest_number, nutrition_average, eco_average, duration)
VALUES ("Riz au curry haricots coco et champignons", "https://img.cuisineaz.com/660x495/2015/10/22/i100924-riz-champignons.webp", 1, true, 5, 4.6, 4.3, "000:25:00"),
       ("Biscuits sans farine au cacao parfumé", "https://resize.elle.fr/portrait_320_webp/var/plain_site/storage/images/elle-a-table/recettes-de-cuisine/biscuits-sans-farine-au-cacao-parfume-3593609/85388120-1-fre-FR/Biscuits-sans-farine-au-cacao-parfume.jpg", 1, true, 6, 4.2, 3.9, "000:25:00"),
       ("Blanquette de veau", "https://assets.afcdn.com/recipe/20190529/93191_w600.jpg", 2, true, 4, 4.2, 3.9, "002:15:00");

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
  ("jauned d'oeufs", false, true, true, 1, 4),
  ("blancs d'oeufs", false, true, true, 1, 4),
  ("noix", true, true, true, 1, 5),
  ("carottes", true, true, true, 1, 5),
  ("crème fraîche", false, true, true, 1, 5),
  ("farine", true, true, false, 1, 5),
  ("veau", false, false, true, 2, 4),
  ("bouillon de poule", false, false, true, 1, 4),
  ("citron", true, true, true, 1, 5),
  ("vin blanc", true, true, true, 2, 4);

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
VALUES (1,"Mettez le bouillon de légumes dans l'eau chaude.", 1),
       (2,"Faites dorer l'oignon à la poêle quelques minute puis retirez-le, réservez dans un bol.", 1),
       (3,"Mettez le riz dans la poêle. Quand le riz à bruni, mettez l'eau dessus. Laissez le riz absorber toute l'eau puis ajoutez le curry.", 1),
       (4,"Mélangez, ajoutez l'oignon, les haricots coco et les champignons, mélangez bien le tout. Laissez chauffer quelques minutes.", 1),
       (5,"Servez chaud.", 1),
       (1,"Préchauffez le four sur th.6/180°.", 2),
       (2,"Couvrez la plaque du four de papier sulfurisé.", 2),
       (3,"Dans un saladier, mélangez le cacao (et l’extrait lorsque le cacao est nature), le sucre, 1 bonne pincée de sel et les noix. Ajoutez les blancs d’œufs et mélangez sans excès.", 2),
       (4,"Déposez des cuillères à soupe de pâte sur la plaque en les espaçant.", 2),
       (5,"Mettez au four 15 mn.", 2),
       (6,"Glissez le papier sur une grille et laissez refroidir avec de décoller les biscuits.", 2),
       (1,"Faire revenir la viande dans un peu de beurre doux jusqu'à ce que les morceaux soient un peu dorés.", 3),
       (2,"Saupoudrer de 2 cuillères de farine. Bien remuer.", 3),
       (3,"Ajouter 2 ou 3 verres d'eau, les cubes de bouillon, le vin et remuer. Ajouter de l'eau si nécessaire pour couvrir.", 3),
       (4,"Couper les carottes en rondelles et émincer les oignons puis les incorporer à la viande, ainsi que les champignons.", 3),
       (5,"Laisser mijoter à feu très doux environ 1h30 à 2h00 en remuant.", 3),
       (6,"Si nécessaire, ajouter de l'eau de temps en temps.", 3),
       (7,"Dans un bol, bien mélanger la crème fraîche, le jaune d’oeuf et le jus de citron. Ajouter ce mélange au dernier moment, bien remuer et servir tout de suite.", 3);

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
VALUES  (1, 1, 1),
        (1, 2, 3),
        (1, 3, 4),
        (2, 1, 2),
        (2, 2, 4),
        (2, 3, 5),
        (3, 1, 2),
        (3, 2, 5),
        (3, 3, 1)
;

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
VALUES  (1, 1, 1),
        (1, 3, 1),
        (2, 2, 1),
        (2, 3, 1)
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
VALUES (1, 1, 200, 1),
       (2, 1, 200, 1),
       (3, 1, 100, 1),
       (4, 1, 1, 5),
       (5, 1, null, null),
       (6, 1, null, null),
       (7, 1, 1, 7),
       (8, 1, null, null),
       (9, 1, null, null),
       (10, 2, 40, 1),
       (11, 2, 140, 1),
       (14, 2, 2, null),
       (15, 2, 100, 1),
       (8, 2, null, null),
       (7, 3, 1, 7),
       (16, 3, 2, 5),
       (4, 3, 1, 5),
       (17, 3, 20, 2),
       (18, 3, 2, 4),
       (8, 3, null, null),
       (9, 3, null, null),
       (19, 3, 1000, 1),
       (20, 3, 1, 7),
       (2, 3, 300, 1),
       (21, 3, 1, 5),
       (13, 3, 1, null),
       (22, 3, 25, 2);


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