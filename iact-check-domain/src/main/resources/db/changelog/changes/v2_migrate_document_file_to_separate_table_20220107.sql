-- liquibase formatted sql

-- changeset yhuggler:202101070800

create table document_file
(
    document_id bigint primary key,
    file        longblob     null,
    constraint document_file_ibfk_1
        foreign key (document_id) references document (id)
);

INSERT INTO document_file(document_id, file)
SELECT d.id, d.file
FROM document d;

ALTER TABLE document
    DROP COLUMN file;

