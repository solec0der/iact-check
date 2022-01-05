-- liquibase formatted sql

-- changeset yhuggler:202201042129

CREATE TABLE bookmarked_document
(
    id            bigint NOT NULL AUTO_INCREMENT,
    document_id   bigint NOT NULL,
    submission_id bigint NOT NULL,
    primary key (id),
    foreign key (submission_id) references submission (id),
    foreign key (document_id) references document (id)
);



