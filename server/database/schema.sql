CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  image VARCHAR(250),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL,
  is_major BOOLEAN NOT NULL,
  zip_code INT,
  country VARCHAR(100) NOT NULL,
  last_active DATE NOT NULL, 
  is_premium BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO user (username, email, password, is_major, country, last_active, is_premium, is_admin)
  VALUES 
    ("Michel Compte", "michel.compte@gmail.com","$argon2i$v=19$m=16,t=2,p=1$RE1QbFNZMlR2aWhVU094SQ$WreuRjApcTLM1lJZnUEOgQ", true, "France", "2025-06-19", false, false),
    ("Jean Premium", "jean.premium@gmail.com","$argon2i$v=19$m=16,t=2,p=1$cUJaWUkzYmVmanhiSXUxWQ$kVaZ6+UC/hNsZ3Snd0iMSw", true, "France", "2025-06-19", true, false),
    ("Denis Admin", "denis.admin@gmail.com","$argon2i$v=19$m=16,t=2,p=1$WHRvNXhhNGNGT3lNbnR6Ng$XRmjrazKwAdqmGTfmKhAvg", true, "France", "2025-05-15", true, true);

CREATE TABLE recipe(
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

CREATE TABLE unit (
   id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
   name VARCHAR(100) NOT NULL
);



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

CREATE TABLE quantity (
  ingredient_id INT NOT NULL,
  recipe_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_id INT NOT NULL DEFAULT 1, 
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
    ON DELETE SET DEFAULT
);

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