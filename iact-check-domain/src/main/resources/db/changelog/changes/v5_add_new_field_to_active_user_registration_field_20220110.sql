-- liquibase formatted sql

-- changeset yhuggler:202201100900

ALTER TABLE active_user_registration_field
    ADD COLUMN required tinyint not null default 1;
