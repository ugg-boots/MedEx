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

INSERT INTO suppliers (
    supplier_name, key_contact, supplier_phone_number, supplier_address
    )
    VALUES (
        'ABC Medical', 'Anna', '999000000', '345 Smith Blvd'
    ); 


INSERT INTO suppliers (
    supplier_name, key_contact, supplier_phone_number, supplier_address
    )
    VALUES (
        'OK Suppliers', 'Tommy', '899001000', '5000 Jefferson Lane'
    ); 

CREATE TABLE catalog (
    product_id      SERIAL PRIMARY KEY,
    supplier_id     SMALLINT,
    product_name    VARCHAR(255),
    product_desc    VARCHAR(255),
    product_img     bytea,
    unit_price      NUMERIC(15,4),
    qty_per_unit    SMALLINT
)

INSERT INTO catalog (
    product_name, product_desc, supplier_id, unit_price, qty_per_unit
)
VALUES (
    'SMALL- Nitrile Examination Gloves', 'Medical Grade, Chemo-rated, Powder Free(Blue)', '3', '19.99', '100'
);

INSERT INTO catalog (
    product_name, product_desc, supplier_id, unit_price, qty_per_unit
)
VALUES (
    'LARGE- Vinyl Examination Gloves', 'Latex Free, Rubber Free, Powder Free(Blue)', '3', '16.99', '100'
);

INSERT INTO catalog (
    product_name, product_desc, supplier_id, unit_price, qty_per_unit
)
VALUES (
    'Hygenix Disposable Face Masks', '3-Layer, PFE 99% Filter Quality Tested', '2', '13.99', '50'
);

CREATE TABLE inventory (
    item_id     SERIAL PRIMARY KEY,
    product_id  SMALLINT,
    quantity    SMALLINT,
    expiration_date     VARCHAR(255),
    location_id     SMALLINT
)

INSERT INTO inventory (
    item_id, product_id, quantity, expiration_date
)
VALUES (
    '5', '2', '7', '04/30/2022'
);

INSERT INTO inventory (
    item_id, product_id, quantity, expiration_date
)
VALUES (
    '6', '10', '8', '09/30/2021'
);


