CREATE TABLE restaurant_waiter (
	restaurant_waiter_id SMALLSERIAL PRIMARY KEY,
	restaurant_waiter_name VARCHAR(70) UNIQUE NOT NULL
);

CREATE TABLE restaurant_status (
	restaurant_status_id SMALLSERIAL PRIMARY KEY,
	restaurant_status_name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE restaurant_table (
	restaurant_table_id SERIAL PRIMARY KEY,
	restaurant_waiter_id SMALLINT,
	CONSTRAINT fk_waiter_table FOREIGN KEY (restaurant_waiter_id) REFERENCES restaurant_waiter (restaurant_waiter_id) ON DELETE RESTRICT
);

CREATE TABLE restaurant_base (
	restaurant_base_id SMALLSERIAL PRIMARY KEY,
	restaurant_base_name VARCHAR(50) UNIQUE NOT NULL,
	price NUMERIC(5, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE restaurant_protein (
	restaurant_protein_id SMALLSERIAL PRIMARY KEY,
	restaurant_protein_name VARCHAR(50) UNIQUE NOT NULL,
	price NUMERIC(5, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE restaurant_topping (
	restaurant_topping_id SMALLSERIAL PRIMARY KEY,
	restaurant_topping_name VARCHAR(50) UNIQUE NOT NULL,
	price NUMERIC(5, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE restaurant_drink (
	restaurant_drink_id SMALLSERIAL PRIMARY KEY,
	restaurant_drink_name VARCHAR(50) UNIQUE NOT NULL,
	price NUMERIC(5, 2) NOT NULL CHECK (price >= 0)
);

CREATE TABLE restaurant_order (
	restaurant_order_id SERIAL PRIMARY KEY,
	restaurant_waiter_id SMALLINT NOT NULL,
	CONSTRAINT fk_order_waiter FOREIGN KEY (restaurant_waiter_id) REFERENCES restaurant_waiter (restaurant_waiter_id) ON DELETE RESTRICT,
	restaurant_table_id INT NOT NULL,
	CONSTRAINT fk_order_table FOREIGN KEY (restaurant_table_id) REFERENCES restaurant_table (restaurant_table_id) ON DELETE RESTRICT,
	restaurant_base_id SMALLINT NOT NULL,
	CONSTRAINT fk_order_base FOREIGN KEY (restaurant_base_id) REFERENCES restaurant_base (restaurant_base_id) ON DELETE RESTRICT,
	restaurant_drink_id SMALLINT,
	CONSTRAINT fk_order_drink FOREIGN KEY (restaurant_drink_id) REFERENCES restaurant_drink (restaurant_drink_id) ON DELETE RESTRICT,
	date TIMESTAMP NOT NULL DEFAULT now(),
	restaurant_status_id SMALLINT NOT NULL,
	CONSTRAINT fk_order_status FOREIGN KEY (restaurant_status_id) REFERENCES restaurant_status (restaurant_status_id) ON DELETE RESTRICT
);

CREATE TABLE order_protein (
	restaurant_order_id INT NOT NULL,
	CONSTRAINT fk_order_protein FOREIGN KEY (restaurant_order_id) REFERENCES restaurant_order (restaurant_order_id) ON DELETE CASCADE,
	restaurant_protein_id SMALLINT NOT NULL,
	CONSTRAINT fk_protein_order FOREIGN KEY (restaurant_protein_id) REFERENCES restaurant_protein (restaurant_protein_id) ON DELETE CASCADE,
	CONSTRAINT pk_order_protein PRIMARY KEY (restaurant_order_id, restaurant_protein_id)
);

CREATE TABLE order_topping (
	restaurant_order_id INT NOT NULL,
	CONSTRAINT fk_order_topping FOREIGN KEY (restaurant_order_id) REFERENCES restaurant_order (restaurant_order_id) ON DELETE CASCADE,
	restaurant_topping_id SMALLINT NOT NULL,
	CONSTRAINT fk_topping_order FOREIGN KEY (restaurant_topping_id) REFERENCES restaurant_topping (restaurant_topping_id) ON DELETE CASCADE,
	CONSTRAINT pk_order_topping PRIMARY KEY (restaurant_order_id, restaurant_topping_id)
);

CREATE FUNCTION check_protein_limit() RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM order_protein WHERE restaurant_order_id = NEW.restaurant_order_id
  ) >= 3 THEN
    RAISE EXCEPTION 'Cannot add more than 3 proteins';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_protein_limit
BEFORE INSERT ON order_protein
FOR EACH ROW
EXECUTE FUNCTION check_protein_limit();

CREATE FUNCTION check_topping_limit() RETURNS TRIGGER AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM order_topping WHERE restaurant_order_id = NEW.restaurant_order_id
  ) >= 5 THEN
    RAISE EXCEPTION 'Cannot add more than 5 toppings';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_topping_limit
BEFORE INSERT ON order_topping
FOR EACH ROW
EXECUTE FUNCTION check_topping_limit();

INSERT INTO restaurant_base (restaurant_base_name, price)
	VALUES ('Rice', 0.5),
			('Noodles', 0.5),
			('Lentils', 0.6),
			('Tortilla', 0.3);

INSERT INTO restaurant_protein (restaurant_protein_name, price)
	VALUES ('Egg', 1.2),
			('Beef', 3.5),
			('Chicken', 3.0),
			('Pork', 3.8);

INSERT INTO restaurant_topping (restaurant_topping_name, price)
	VALUES ('Onion', 0.6),
			('Tomato', 0.3),
			('Cheese', 1.2),
			('Lettuce', 0.3),
			('Beans', 0.8);

INSERT INTO restaurant_drink (restaurant_drink_name, price)
	VALUES ('Water', 1.0),
			('Coca-cola', 2.0),
			('Sprite', 2.0),
			('Pepsi', 2.0),
			('Golden beer', 2.5),
			('Black beer', 2.5),
			('Premium beer', 2.5);