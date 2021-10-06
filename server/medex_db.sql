CREATE TABLE suppliers (
    supplier_id            SERIAL PRIMARY KEY,
    supplier_name          VARCHAR(255),
    key_contact            VARCHAR(255),
    supplier_phone_number  VARCHAR(255),
    supplier_address       VARCHAR(255),
    CONSTRAINT suppliers_pk PRIMARY KEY (supplier_id)
);


CREATE TABLE catalog (
	product_id      SERIAL NOT NULL,
	product_name    VARCHAR(255) NOT NULL,
	product_desc    VARCHAR(255),
	supplier_id     SMALLINT,
	unit_price      NUMERIC(15,4) NOT NULL,
	qty_per_unit    SMALLINT,
	max_stock       SMALLINT NOT NULL,
	CONSTRAINT catalog_pk PRIMARY KEY (product_id)
);


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
    item_id             SERIAL PRIMARY KEY,
    product_id          SMALLINT,
    quantity            SMALLINT,
    expiration_date     VARCHAR(255),
    CONSTRAINT inventory_pk PRIMARY KEY (item_id)
)

CREATE TABLE procedures (
	procedure_id        SERIAL NOT NULL,
	procedure_name      VARCHAR(255) NOT NULL,
	procedure_desc      VARCHAR(255) NOT NULL,
	CONSTRAINT procedures_pk PRIMARY KEY (procedure_id)
);

CREATE TABLE junction (
	junction_id         SERIAL NOT NULL,
	procedure_id        SMALLINT NOT NULL,
	product_id          SMALLINT NOT NULL,
	qty_per_procedure   SMALLINT,
	CONSTRAINT junction_pk PRIMARY KEY (junction_id)
);

ALTER TABLE "catalog" ADD CONSTRAINT "catalog_fk0" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("supplier_id");
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_fk0" FOREIGN KEY ("product_id") REFERENCES "catalog"("product_id");
ALTER TABLE "junction" ADD CONSTRAINT "junction_fk0" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("procedure_id");
ALTER TABLE "junction" ADD CONSTRAINT "junction_fk1" FOREIGN KEY ("product_id") REFERENCES "catalog"("product_id");
