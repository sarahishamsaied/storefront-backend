CREATE TYPE Status AS ENUM ('COMPLETE','ACTIVE');
CREATE TABLE orders(id SERIAL PRIMARY KEY, user_id int, status Status, 
CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
	  REFERENCES users(id));