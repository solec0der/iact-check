-- liquibase formatted sql

-- changeset yhuggler:202104250800


CREATE TABLE image_question
(
    id                   bigint       NOT NULL AUTO_INCREMENT,
    question_category_id bigint       NOT NULL,
    question_text        varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_category_id) REFERENCES question_category (id)
);

CREATE TABLE image_answer
(
    id                bigint NOT NULL AUTO_INCREMENT,
    image_question_id bigint NOT NULL,
    image             longblob,
    score             int    NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (image_question_id) REFERENCES image_question (id)
);
