-- liquibase formatted sql

-- changeset yhuggler:202204091046

ALTER TABLE `check`
    DROP COLUMN active_from,
    DROP COLUMN active_to;
