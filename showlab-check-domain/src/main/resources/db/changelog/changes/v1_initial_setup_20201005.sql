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

CREATE TABLE customer
(
    id             bigint       NOT NULL AUTO_INCREMENT,
    name           varchar(255) NOT NULL,
    primary_colour varchar(10)  NOT NULL,
    accent_colour  varchar(10)  NOT NULL,
    logo           blob,
    primary key (id)
);

CREATE TABLE user_customer
(
    user_id     bigint NOT NULL,
    customer_id bigint NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE TABLE `check`
(
    id          bigint       NOT NULL AUTO_INCREMENT,
    customer_id bigint       NOT NULL,
    title       varchar(255) NOT NULL,
    active_from datetime     NOT NULL,
    active_to   datetime     NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE TABLE question_category
(
    id        bigint NOT NULL AUTO_INCREMENT,
    check_id  bigint NOT NULL,
    title     varchar(255),
    thumbnail blob,
    PRIMARY KEY (id),
    FOREIGN KEY (check_id) REFERENCES `check` (id)
);

CREATE TABLE question
(
    id                   bigint       NOT NULL AUTO_INCREMENT,
    question_category_id bigint       NOT NULL,
    question_text        varchar(255) NOT NULL,
    min_score            int(4)       NOT NULL,
    max_score            int(4)       NOT NULL,
    icon                 blob,
    PRIMARY KEY (id),
    FOREIGN KEY (question_category_id) REFERENCES question_category (id)
);

CREATE TABLE possible_outcome
(
    id                   bigint       NOT NULL AUTO_INCREMENT,
    question_category_id bigint       NOT NULL,
    title                varchar(255) NOT NULL,
    subtitle             varchar(255) NOT NULL,
    description          text         NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (question_category_id) REFERENCES question_category (id)
);

CREATE TABLE possible_score
(
    id                  bigint NOT NULL AUTO_INCREMENT,
    possible_outcome_id bigint NOT NULL,
    score               int    NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (possible_outcome_id) REFERENCES possible_outcome (id)
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
