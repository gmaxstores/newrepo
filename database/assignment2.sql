--insert data into account table (TASK 1)
INSERT INTO public.account
	(account_firstname, account_lastname, account_email, account_password)
VALUES
	('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');


-- modify the account_type of Tony Stark to 'Admin' (TASK 2)
UPDATE
	public.account
SET account_type = 'Admin'::account_type
WHERE account_id = 1;

-- Delete the Tony Stark account (TASK 3)
DELETE
FROM
	public.account
WHERE
	account_id = 1;


-- update description of GM Hummer using REPLACE function (TASK 4)
UPDATE
	public.inventory
SET
	inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE
	inv_id = 10;


-- selected inv_model, make and classifcation_name for inventory that belonged to the sports category (TASK 5))
SELECT
	public.inventory.inv_make, public.inventory.inv_model, public.classification.classification_name
FROM
	inventory
INNER JOIN
	classification
ON
	inventory.classification_id = classification.classification_id
WHERE
	classification.classification_id = 2;


--used replace function to update all rows of the inventory table to add /vehicles after images/ in inv_image and inv_thumbnail (TASK 6)
UPDATE
	public.inventory
SET
	inv_image = REPLACE(inv_image, 'es/', 'es/vehicles/'),
	inv_thumbnail = REPLACE(inv_thumbnail, 'es/', 'es/vehicles/');