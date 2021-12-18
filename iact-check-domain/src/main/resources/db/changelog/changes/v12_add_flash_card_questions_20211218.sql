-- liquibase formatted sql

-- changeset yhuggler:202112180801


CREATE TABLE flash_card_question
(
    id                     bigint  NOT NULL AUTO_INCREMENT,
    check_id               bigint  NOT NULL,
    question               varchar(255),
    allow_multiple_answers boolean NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (check_id) REFERENCES `check` (id)
);

CREATE TABLE flash_card_answer
(
    id                     bigint  NOT NULL AUTO_INCREMENT,
    flash_card_question_id bigint  NOT NULL,
    answer                 varchar(255),
    is_correct_answer      boolean NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (flash_card_question_id) REFERENCES flash_card_question (id)
);
