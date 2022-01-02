-- liquibase formatted sql

-- changeset yhuggler:202112190800

ALTER TABLE question_category
    DROP COLUMN show_only_best_matching_possible_outcome;

ALTER TABLE question_category
    ADD number_of_possible_outcomes_to_show int DEFAULT 1 NOT NULL;



