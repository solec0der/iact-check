-- liquibase formatted sql

-- changeset yhuggler:202104250800

CREATE TABLE submission
(
    id           bigint       NOT NULL AUTO_INCREMENT,
    check_id     bigint       NOT NULL,
    first_name   varchar(64)  NOT NULL,
    last_name    varchar(64)  NOT NULL,
    street       varchar(128) NOT NULL,
    zip_code     varchar(16)  NOT NULL,
    city         varchar(128) NOT NULL,
    phone_number varchar(16)  NOT NULL,
    email        varchar(255) NOT NULL,
    primary key (id),
    foreign key (check_id) references `check` (id)
);
