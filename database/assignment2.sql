-- Tony Stark Insert
INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES
	('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- Tony Stark Update
UPDATE "account" 
SET account_type = 'Admin'
WHERE account_firstname = 'Tony';
    
-- Tony Stark Delete
DELETE FROM "account" 
WHERE account_id = 1;

-- Description Update
UPDATE "inventory" 
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- Select with Join
SELECT inv_make, inv_model, classification_name
FROM inventory i
	INNER JOIN classification cl
	ON i.classification_id = cl.classification_id
WHERE classification_name = 'Sport';

-- Image Update
UPDATE "inventory"
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles'), 
	inv_thumbnail = REPLACE(inv_thumbnail, '/images', '/images/vehicles');
