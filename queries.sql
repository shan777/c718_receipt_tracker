-- List of Pre-Written SQL Queries --


-- User login
SELECT users.ID, users.first_name, users.last_name FROM users WHERE users.user_name = '${request.body.user_name}' AND users.password = SHA1('${request.body.password}');

-- Fetch ALL receipts for current user
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.user_id = '${request.body.user_id}';

-- Fetch all ACTIVE receipts for current user
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.user_id = '${request.body.user_id}' AND receipts.status = 'active';

-- Fetch all INACTIVE receipts for current user
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.user_id = '${request.body.user_id}' AND receipts.status = 'inactive';

-- Filter receipts by category (e.g. dining)
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.category = '${request.body.category_name}' AND receipts.user_id = '${request.body.user_id}' AND receipts.status = 'active';

-- Fetch all store names and filter receipts by a chosen store_name
SELECT receipts.store_name FROM receipts WHERE receipts.user_id = '${request.body.user_id}';
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.store_name = '${request.body.store_name}' AND receipts.user_id = '${request.body.user_id}' AND receipts.status = 'active';

-- Fetch all receipts by specific purchase_date
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM receipts WHERE receipts.purchase_date = '${request.body.purchase_date}' AND receipts.user_id = '${request.body.user_id}' AND receipts.status = 'active';

-- Fetch all receipts by specific purchate_date interval
SELECT receipts.ID, receipts.purchase_date, receipts.store_name, receipts.total FROM table WHERE receipts.purchase_date >= '${request.body.start_date}' AND receipts.purchase_date <= '${request.body.end_date}' AND receipts.status = 'active';

-- TODO:

-- Fetch all receipts by specific tag

-- Fetch all receipts by multiple filters


----------------------- CRUD Operations for 'users' -----------------------

-- Create new user (sign-up)
INSERT INTO users (user_name, password, first_name, last_name, email, phone) VALUES ('${request.body.user_name}', SHA1('${request.body.password}'), '${request.body.first_name}', '${request.body.last_name}', '${request.body.email}', '${request.body.phone}');

-- Fetch details for current user
SELECT users.user_name, users.first_name, users.last_name, users.email, users.phone FROM users WHERE users.ID = '${request.body.user_id}';

-- Update details of current user (e.g. email)
UPDATE users SET users.email = '${request.body.email}' WHERE users.ID = '${request.body.user_id}';

-- Delete current user & all relating data
DELETE FROM users WHERE users.ID = '${request.body.user_id}';
DELETE FROM tags WHERE tags.user_id = '${request.body.user_id}';
DELETE FROM receipts WHERE receipts.user_id = '${request.body.user_id}';


----------------------- CRUD Operations for 'tags' -----------------------

-- Create new report
INSERT INTO tags (user_id, receipt_id, tag_name) VALUES ('${request.body.user_id}', '${request.body.receipt_id}', '${request.body.tag_name}';

-- Fetch details for current tag (e.g. tag_name)
SELECT tags.ID, tags.tag_name FROM tags WHERE tags.ID = '${request.body.tag_id}';

-- Update current tag (e.g. tag_name)
UPDATE tags SET tags.tag_name = '${request.body.tag_name}' WHERE tags.ID = '${request.body.tag_id}';

-- Delete current tag
DELETE FROM tags WHERE tag.ID = '${request.body.tag_id}';


----------------------- CRUD Operations for 'receipts' -----------------------

-- Create new receipt
INSERT INTO receipts (report_id, user_id, store_name, total, tax, credit_card_name, credit_card_digits, purchase_date, category_id, comment, reimbursable) VALUES ('${request.body.report_id}', '${request.body.user_id}', '${request.body.store_name}', '${request.body.total}', '${request.body.tax}', '${request.body.credit_card_name}', '${request.body.credit_card_digits}', '${request.body.purchase_date}', '${request.body.category_id}', '${request.body.comment}', '${request.body.reimbursable}');

-- Fetch details for current receipt
SELECT receipts.ID, receipts.store_name, receipts.total, receipts.tax, receipts.credit_card_name, receipts.credit_card_digits, receipts.purchase_date, receipts.comment, receipts.category_id FROM receipts WHERE receipts.ID = '${request.body.receipt_id}';

-- Update details of current receipt (e.g. store_name)
UPDATE receipts SET receipts.store_name = '${request.body.store_name}' WHERE receipts.ID = '${request.body.receipt_id}';

-- Archive current receipt
UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = '${request.body.receipt_id}';

-- Delete current receipt & nullify relating tags
DELETE FROM receipts WHERE receipts.ID = '${request.body.receipt_id}';
UPDATE tags SET tags.receipt_id = '' WHERE tags.receipt_id = '${request.body.receipt_id}';

--NOTE: we will need to delete tag when no receipts in the database have that tag

-- Fetch all tags for a current user
SELECT tags.tag_name, users.user_name FROM tags JOIN users ON tags.user_id=users.ID WHERE users.ID='${request.body.user_id}';

-- Fetch all receipts with a specfic tag for a specific user (filter receipts by user tag)
SELECT receipts.store_name, receipts.total, receipts.purchase_date FROM receipts JOIN receipts_tags ON receipts.ID=receipts_tags.receipt_id WHERE receipts.user_id=3 AND receipts_tags.tag_id=3