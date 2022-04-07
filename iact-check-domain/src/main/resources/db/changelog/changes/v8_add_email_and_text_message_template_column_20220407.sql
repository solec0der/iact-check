-- liquibase formatted sql

-- changeset yhuggler:202204071040

ALTER TABLE `check`
    ADD COLUMN email_subject text,
    ADD COLUMN email_message text,
    ADD COLUMN text_message  text;
