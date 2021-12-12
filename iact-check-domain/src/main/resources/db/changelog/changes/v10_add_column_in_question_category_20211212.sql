-- liquibase formatted sql

-- changeset yhuggler:202112120800


ALTER TABLE question_category
    ADD show_only_best_matching_possible_outcome boolean DEFAULT false NOT NULL;
