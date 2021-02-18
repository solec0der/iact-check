-- liquibase formatted sql

-- changeset yhuggler:202102180800

CREATE TABLE user_registration_field
(
    id         bigint       NOT NULL AUTO_INCREMENT,
    field_name varchar(255) NOT NULL,
    required   boolean      NOT NULL,
    primary key (id)
);

CREATE TABLE active_user_registration_field
(
    id                         bigint       NOT NULL AUTO_INCREMENT,
    customer_id                bigint       NOT NULL,
    user_registration_field_id bigint       NOT NULL,
    validation_regex           varchar(255) NOT NULL,
    position                   int          NOT NULL,
    primary key (id),
    foreign key (user_registration_field_id) references user_registration_field (id)
);

INSERT INTO user_registration_field(field_name, required)
VALUES ('FIRST_NAME', true);
INSERT INTO user_registration_field(field_name, required)
VALUES ('LAST_NAME', true);