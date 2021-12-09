-- liquibase formatted sql

-- changeset yhuggler:202104250800


CREATE TABLE image_question_answer
(
    id                bigint NOT NULL AUTO_INCREMENT,
    submission_id     bigint NOT NULL,
    image_question_id bigint NOT NULL,
    value             int    NOT NULL,
    primary key (id),
    foreign key (submission_id) references submission (id),
    foreign key (image_question_id) references image_question (id)
);
