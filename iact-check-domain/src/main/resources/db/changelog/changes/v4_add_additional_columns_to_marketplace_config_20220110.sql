-- liquibase formatted sql

-- changeset yhuggler:202201100800

ALTER TABLE marketplace_config
    ADD COLUMN greeting_text       varchar(255) not null default '<greeting_text>',
    ADD COLUMN marketplace_title   varchar(255) not null default '<marketplace_title>',
    ADD COLUMN marketplace_subtitle text;

UPDATE marketplace_config
SET marketplace_subtitle = '<marketplace_subtitle>';

ALTER TABLE marketplace_config
    MODIFY COLUMN marketplace_subtitle text not null;
