-- liquibase formatted sql

-- changeset yhuggler:202104250800

CREATE TABLE bookmarked_possible_outcome
(
    id                  bigint NOT NULL AUTO_INCREMENT,
    possible_outcome_id bigint NOT NULL,
    submission_id       bigint NOT NULL,
    primary key (id),
    foreign key (submission_id) references submission (id),
    foreign key (possible_outcome_id) references possible_outcome (id)
);
