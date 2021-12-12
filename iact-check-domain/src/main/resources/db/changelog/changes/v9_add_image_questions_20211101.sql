-- liquibase formatted sql

-- changeset yhuggler:202108250800


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
    id                  bigint NOT NULL AUTO_INCREMENT,
    image_question_id   bigint NOT NULL,
    image               longblob,
    possible_outcome_id bigint    NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (image_question_id) REFERENCES image_question (id),
    FOREIGN KEY (possible_outcome_id) REFERENCES possible_outcome (id)
);

CREATE TABLE image_question_answer
(
    id                bigint NOT NULL AUTO_INCREMENT,
    submission_id     bigint NOT NULL,
    image_answer_id bigint NOT NULL,
    primary key (id),
    foreign key (submission_id) references submission (id),
    foreign key (image_answer_id) references image_answer (id)
);
