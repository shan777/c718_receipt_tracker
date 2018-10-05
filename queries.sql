-- List of Pre-Written SQL Queries --


----------------------- User Login -----------------------
SELECT users.ID, users.firstName, users.lastName FROM users WHERE users.userName = ? AND users.password = SHA1(?);


----------------------- Fetch Data -----------------------

-- Fetch ALL receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ?;

-- Fetch all ACTIVE receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ? AND receipts.status = 'active';

-- Fetch all INACTIVE receipts for current user
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.userId = ? AND receipts.status = 'inactive';

-- Fetch all store names for current user
SELECT receipts.storeName FROM receipts WHERE receipts.userId = ?;

-- Fetch all tags for a current user
SELECT tags.tagName, users.userName FROM tags JOIN users ON tags.userId=users.ID WHERE users.ID=?;



----------------------- Filter Data -----------------------

-- Filter receipts by category (e.g. dining)
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.category = ? AND receipts.userId = ? AND receipts.status = 'active';

-- Filter receipts by specific storeName
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.storeName = ? AND receipts.userId = ? AND receipts.status = 'active';

-- Filter receipts by specific purchaseDate
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM receipts WHERE receipts.purchaseDate = ? AND receipts.userId = ? AND receipts.status = 'active';

-- Filter receipts by specific purchaseDate interval
SELECT receipts.ID, receipts.purchaseDate, receipts.storeName, receipts.total FROM table WHERE receipts.purchaseDate >= ? AND receipts.purchaseDate <= ? AND receipts.status = 'active';

-- Filter receipts by specific tag
SELECT receipts.storeName, receipts.total, receipts.purchaseDate FROM receipts JOIN receipts_tags ON receipts.ID=receipts_tags.receiptId WHERE receipts.userId=? AND receipts_tags.tagId=? AND receipts.status = 'active';

-- Filter receipts by multiple filters



----------------------- CRUD Operations for 'users' -----------------------

-- Create new user (sign-up)
INSERT INTO users (userName, password, firstName, lastName, email, phone) VALUES (?, SHA1(?), ?, ?, ?, ?);

-- Fetch details for current user
SELECT users.userName, users.firstName, users.lastName, users.email, users.phone FROM users WHERE users.ID = ?;

-- Update details of current user (e.g. email)
UPDATE users SET users.email = ? WHERE users.ID = ?;

-- Delete current user & all relating data
DELETE FROM users WHERE users.ID = ?;
DELETE FROM tags WHERE tags.userId = ?;
DELETE FROM receipts WHERE receipts.userId = ?;



----------------------- CRUD Operations for 'tags' -----------------------

-- Create new tag
INSERT INTO tags (userId, tagName) VALUES (?, ?);

-- Fetch details for current tag (e.g. tagName)
SELECT tags.ID, tags.tagName FROM tags WHERE tags.ID = ?;

-- Update current tag (e.g. tagName)
UPDATE tags SET tags.tagName = ? WHERE tags.ID = ?;

-- Delete a tag from database (will most likely not use this query)
DELETE FROM tags WHERE tags.ID = ?;

-- Add tag to current receipt
INSERT INTO receipts_tags (receiptId, tagId) VALUES (?, ?);

-- Remove tag from current receipt
DELETE FROM receipts_tags WHERE receipts_tags.tagId = ? AND tags.receiptId = ?;



----------------------- CRUD Operations for 'receipts' -----------------------

-- Create new receipt
INSERT INTO receipts (userId, storeName, total, tax, creditCardName, creditCardDigits, purchaseDate, category, comment, reimbursable) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Fetch details for current receipt
-- Fetch all tags for current receipt
SELECT receipts.ID, receipts.storeName, receipts.total, receipts.tax, receipts.creditCardName, receipts.creditCardDigits, receipts.purchaseDate, receipts.comment, receipts.category FROM receipts WHERE receipts.ID = ?;
SELECT receipts_tags.tagId FROM receipts_tags JOIN tags ON receipts_tags.tagId = tags.ID WHERE receipts_tags.receiptId = ?;

-- Update details of current receipt (e.g. storeName)
UPDATE receipts SET receipts.storeName = ? WHERE receipts.ID = ?;

-- Archive current receipt
UPDATE receipts SET receipts.status = 'inactive' WHERE receipts.ID = ?;

-- Delete current receipt (will most likely not neet these queries)
DELETE FROM receipts WHERE receipts.ID = ?;
DELETE FROM receipts_tags WHERE receipts_tags.receiptId = ?;

--NOTE: we will need to delete tag when no receipts in the database have that tag