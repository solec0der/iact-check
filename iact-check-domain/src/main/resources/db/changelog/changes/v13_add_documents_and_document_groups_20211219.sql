-- liquibase formatted sql

-- changeset yhuggler:202112190800


CREATE TABLE document_group
(
    id                bigint       NOT NULL AUTO_INCREMENT,
    check_id          bigint       NOT NULL,
    name              varchar(255) NOT NULL,
    background_colour varchar(10),
    PRIMARY KEY (id),
    FOREIGN KEY (check_id) REFERENCES `check` (id)
);

CREATE TABLE document
(
    id                bigint       NOT NULL AUTO_INCREMENT,
    document_group_id bigint       NOT NULL,
    title             varchar(255) NOT NULL,
    media_type        varchar(255) NOT NULL,
    file              longblob,
    PRIMARY KEY (id),
    FOREIGN KEY (document_group_id) REFERENCES document_group (id)
);
