-- liquibase formatted sql

-- changeset yhuggler:202104250800


CREATE TABLE image_question_answer
(
    id                bigint NOT NULL AUTO_INCREMENT,
    submission_id     bigint NOT NULL,
    image_answer_id bigint NOT NULL,
    value             int    NOT NULL,
    primary key (id),
    foreign key (submission_id) references submission (id),
    foreign key (image_answer_id) references image_answer (id)
);
