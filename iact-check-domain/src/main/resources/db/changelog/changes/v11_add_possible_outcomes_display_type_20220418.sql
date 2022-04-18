-- liquibase formatted sql

-- changeset yhuggler:202204181014

alter table question_category
    ADD COLUMN possible_outcomes_display_type varchar(32) not null default 'TILES';

