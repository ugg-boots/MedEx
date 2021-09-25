-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

CREATE TABLE suppliers (
    supplier_id     SERIAL PRIMARY KEY,
    supplier_name   VARCHAR(255),
    key_contact     VARCHAR(255),
    supplier_phone_number  VARCHAR(255),
    supplier_address    VARCHAR(255)
) 

-- WITH ( 
--     OIDS=FALSE
-- )

INSERT INTO suppliers (
    supplier_name, key_contact, supplier_phone_number, supplier_address
    )
    VALUES (
        'Codesmith', 'Reid', '123456789', '123 Codesmith Rd'
    );   