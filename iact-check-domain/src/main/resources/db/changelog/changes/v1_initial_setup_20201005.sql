-- liquibase formatted sql

-- changeset yhuggler:202004230800

CREATE TABLE customer
(
    id   bigint       NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key (id)
);

CREATE TABLE customer_branding
(
    customer_id       bigint      NOT NULL,
    primary_colour    varchar(10) NOT NULL,
    background_colour varchar(10) NOT NULL,
    accent_colour     varchar(10) NOT NULL,
    text_colour       varchar(10) NOT NULL,
    font              varchar(32) NOT NULL,
    logo              longblob,
    primary key (customer_id),
    foreign key (customer_id) REFERENCES customer (id)
);

CREATE TABLE user_customer_access
(
    customer_id bigint       NOT NULL,
    user_id     varchar(255) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer (id)
);

CREATE TABLE `check`
(
    id          bigint       NOT NULL AUTO_INCREMENT,
    customer_id bigint       NOT NULL,
    title       varchar(255) NOT NULL,
    language    varchar(32)  NOT NULL,
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

CREATE TABLE range_question
(
    id                   bigint       NOT NULL AUTO_INCREMENT,
    question_category_id bigint       NOT NULL,
    question_text        varchar(255) NOT NULL,
    icon                 longblob,
    PRIMARY KEY (id),
    FOREIGN KEY (question_category_id) REFERENCES question_category (id)
);

CREATE TABLE range_step
(
    id                bigint NOT NULL AUTO_INCREMENT,
    range_question_id bigint NOT NULL,
    score             int    NOT NULL,
    description       varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (range_question_id) REFERENCES range_question (id)
);

CREATE TABLE possible_outcome
(
    id                   bigint       NOT NULL AUTO_INCREMENT,
    question_category_id bigint       NOT NULL,
    title                varchar(255) NOT NULL,
    subtitle             varchar(255) NOT NULL,
    description          text         NOT NULL,
    youtube_url          varchar(512),
    thumbnail            longblob,
    pdf                  longblob,
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

