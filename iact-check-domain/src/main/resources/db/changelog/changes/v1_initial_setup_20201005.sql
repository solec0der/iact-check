-- liquibase formatted sql

-- changeset yhuggler:202004230800

CREATE TABLE customer
(
    id             bigint       NOT NULL AUTO_INCREMENT,
    name           varchar(255) NOT NULL,
    primary_colour varchar(10)  NOT NULL,
    accent_colour  varchar(10)  NOT NULL,
    logo           longblob,
    primary key (id)
);

CREATE TABLE user_customer_access
(
    customer_id bigint NOT NULL,
    user_id varchar(255) NOT NULL,
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
    thumbnail longblob,
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
    icon                 longblob,
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

