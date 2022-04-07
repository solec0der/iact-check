-- liquibase formatted sql

-- changeset yhuggler:202204071040

ALTER TABLE `check`
    ADD COLUMN email_message_template text,
    ADD COLUMN text_message_template  text;
