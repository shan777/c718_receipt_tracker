-- List of Pre-Written SQL Queries --


-- User login
SELECT users.ID, users.firstName, users.lastName FROM users WHERE users.userName = '${request.body.userName}' AND users.password = SHA1('${request.body.password}');



----------------------- Fetch Data -----------------------

-- Fetch ALL receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = '${request.body.userId}';

-- Fetch all ACTIVE receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = '${request.body.userId}' AND receipts.status = 'active';

-- Fetch all INACTIVE receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = '${request.body.userId}' AND receipts.status = 'inactive';

-- Fetch all store names for current user
SELECT receipts.storeName FROM receipts WHERE receipts.userId = '${request.body.userId}';

-- Fetch all tags for a current user
SELECT tags.tagName, users.userName FROM tags JOIN users ON tags.userId=users.ID WHERE users.ID='${request.body.userId}';



----------------------- Filter Data -----------------------

-- Filter receipts by category (e.g. dining)
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.category = '${request.body.category_name}' AND receipts.userId = '${request.body.userId}' AND receipts.status = 'active';

-- Filter receipts by specific storeName
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.storeName = '${request.body.storeName}' AND receipts.userId = '${request.body.userId}' AND receipts.status = 'active';

-- Filter receipts by specific purchaseDate
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.purchaseDate = '${request.body.purchaseDate}' AND receipts.userId = '${request.body.userId}' AND receipts.status = 'active';

-- Filter receipts by specific purchaseDate interval
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM table WHERE receipts.purchaseDate >= '${request.body.startDate}' AND receipts.purchaseDate <= '${request.body.endDate}' AND receipts.status = 'active';

-- Filter receipts by specific tag
SELECT receipts.storeName, receipts.total, receipts.purchaseDate FROM receipts JOIN receipts_tags ON receipts.ID=receipts_tags.receiptId WHERE receipts.userId='${request.body.userId}' AND receipts_tags.tagId='${request.body.tagId}' AND receipts.status = 'active';

-- Filter receipts by multiple filters



----------------------- CRUD Operations for 'users' -----------------------

-- Create new user (sign-up)
INSERT INTO users (userName, password, firstName, lastName, email, phone) VALUES ('${request.body.userName}', SHA1('${request.body.password}'), '${request.body.firstName}', '${request.body.lastName}', '${request.body.email}', '${request.body.phone}');

-- Fetch details for current user
SELECT users.userName, users.firstName, users.lastName, users.email, users.phone FROM users WHERE users.ID = '${request.body.userId}';

-- Update details of current user (e.g. email)
UPDATE users SET users.email = '${request.body.email}' WHERE users.ID = '${request.body.userId}';

-- Delete current user & all relating data
DELETE FROM users WHERE users.ID = '${request.body.userId}';
DELETE FROM tags WHERE tags.userId = '${request.body.userId}';
DELETE FROM receipts WHERE receipts.userId = '${request.body.userId}';



----------------------- CRUD Operations for 'tags' -----------------------

-- Create new tag
INSERT INTO tags (userId, tagName) VALUES ('${request.body.userId}', '${request.body.tagName}');

-- Fetch details for current tag (e.g. tagName)
SELECT tags.ID, tags.tagName FROM tags WHERE tags.ID = '${request.body.tagId}';

-- Update current tag (e.g. tagName)
UPDATE tags SET tags.tagName = '${request.body.tagName}' WHERE tags.ID = '${request.body.tagId}';

-- Delete a tag from database (will most likely not use this query)
DELETE FROM tags WHERE tags.ID = '${request.body.tagId}';

-- Add tag to current receipt
INSERT INTO receipts_tags (receiptId, tagId) VALUES ('${request.body.receiptId}', '${request.body.tagId}');

-- Remove tag from current receipt
DELETE FROM receipts_tags WHERE receipts_tags.tagId = '${request.body.tagId}' AND tags.receiptId = '${request.body.receiptId}';



----------------------- CRUD Operations for 'receipts' -----------------------

-- Create new receipt
INSERT INTO receipts (userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, status, reimbursable) VALUES ('${request.body.userId}', '${request.body.storeName}', '${request.body.total}', '${request.body.tax}', '${request.body.creditCardName}', '${request.body.creditCardDigits}', '${request.body.purchaseDate}', '${request.body.category}', '${request.body.comment}', 'active', '${request.body.reimbursable}');

-- Fetch details for current receipt
-- Fetch all tags for current receipt
SELECT receipts.ID, receipts.storeName, receipts.total, receipts.tax, receipts.creditCardName, receipts.creditCardDigits, receipts.purchaseDate, receipts.comment, receipts.category FROM receipts WHERE receipts.ID = '${request.body.receiptId}';
SELECT receipts_tags.tagId FROM receipts_tags WHERE receipts_tags.receiptId = '${request.body.receiptId}';
SELECT tags.tagName FROM tags WHERE tags.ID = '${request.body.tagId}'; --will require a loop to fetch all tag names

-- Update details of current receipt (e.g. storeName)
UPDATE receipts SET receipts.storeName = '${request.body.storeName}' WHERE receipts.ID = '${request.body.receiptId}';

-- Archive current receipt
UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = '${request.body.receiptId}';

-- Delete current receipt
DELETE FROM receipts WHERE receipts.ID = '${request.body.receiptId}';
DELETE FROM receipts_tags WHERE receipts_tags.receiptId = '${request.body.receiptId}';

--NOTE: we will need to delete tag when no receipts in the database have that tag