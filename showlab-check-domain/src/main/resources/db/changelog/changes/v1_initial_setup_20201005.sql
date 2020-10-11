-- liquibase formatted sql

-- changeset yhuggler:202004230800

CREATE TABLE user
(
    id       bigint       NOT NULL AUTO_INCREMENT,
    username varchar(64)  NOT NULL,
    password varchar(255) NOT NULL,
    primary key (id)
);

CREATE TABLE role
(
    id   bigint      NOT NULL AUTO_INCREMENT,
    name varchar(64) NOT NULL,
    primary key (id)
);

CREATE TABLE user_role
(
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (role_id) REFERENCES role (id)
);

INSERT INTO role (id, name)
VALUES (1, 'ORGANIZATION_ADMINISTRATOR');
INSERT INTO role (id, name)
VALUES (2, 'SUPERUSER');

INSERT INTO user(id, username, password)
VALUES (1, 'superuser', '$2a$10$pVv9lOFuqU4eClTDa1t5M.o0.eq6L7LDKz3UhhnwJg2lgtDDQ3Lra');

INSERT INTO user_role(user_id, role_id)
VALUES (1, 1);
INSERT INTO user_role(user_id, role_id)
VALUES (1, 2);
