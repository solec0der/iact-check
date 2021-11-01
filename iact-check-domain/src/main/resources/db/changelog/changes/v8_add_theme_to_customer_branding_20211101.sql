-- liquibase formatted sql

-- changeset yhuggler:202104250800

ALTER TABLE customer_branding
    ADD theme varchar(32) DEFAULT 'LIGHT' NOT NULL;
