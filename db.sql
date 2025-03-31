
-- Create schema
CREATE SCHEMA IF NOT EXISTS eshop;

-- Set search path
SET search_path TO eshop;

-- Create tables in eshop schema
CREATE TABLE IF NOT EXISTS eshop.products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS eshop.orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    address TEXT NOT NULL,
    total DECIMAL NOT NULL,
    items TEXT[] NOT NULL,
);

CREATE TABLE IF NOT EXISTS eshop.admins (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    reset_token TEXT,
    reset_token_expiry TIMESTAMP
);

-- Grant permissions
GRANT ALL PRIVILEGES ON SCHEMA eshop TO CURRENT_USER;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA eshop TO CURRENT_USER;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA eshop TO CURRENT_USER;
