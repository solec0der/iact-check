-- liquibase formatted sql

-- changeset yhuggler:202112190801

ALTER TABLE flash_card_question
    ADD required_question boolean DEFAULT false NOT NULL;



