-- liquibase formatted sql

-- changeset yhuggler:202201060800

create table customer
(
    id   bigint auto_increment
        primary key,
    name varchar(255) not null
);

create table `check`
(
    id               bigint auto_increment
        primary key,
    customer_id      bigint      not null,
    title            text        not null,
    subtitle         text        not null,
    default_language varchar(32) not null,
    active_from      datetime    not null,
    active_to        datetime    not null,
    constraint check_ibfk_1
        foreign key (customer_id) references customer (id)
);

create index customer_id
    on `check` (customer_id);

create table check_required_language
(
    id       bigint auto_increment
        primary key,
    check_id bigint      not null,
    language varchar(32) not null,
    constraint check_required_language_ibfk_1
        foreign key (check_id) references `check` (id)
);

create index check_id
    on check_required_language (check_id);

create table customer_branding
(
    id                bigint auto_increment
        primary key,
    customer_id       bigint                      not null,
    primary_colour    varchar(10)                 not null,
    background_colour varchar(10)                 not null,
    accent_colour     varchar(10)                 not null,
    text_colour       varchar(10)                 not null,
    font              varchar(32)                 not null,
    logo              longblob                    null,
    theme             varchar(32) default 'LIGHT' not null,
    constraint customer_branding_ibfk_1
        foreign key (customer_id) references customer (id)
);

create index customer_id
    on customer_branding (customer_id);

create table document_group
(
    id                bigint auto_increment
        primary key,
    check_id          bigint       not null,
    name              varchar(255) not null,
    background_colour varchar(10)  null,
    constraint document_group_ibfk_1
        foreign key (check_id) references `check` (id)
);

create table document
(
    id                bigint auto_increment
        primary key,
    document_group_id bigint       not null,
    title             varchar(255) not null,
    media_type        varchar(255) not null,
    file              longblob     null,
    constraint document_ibfk_1
        foreign key (document_group_id) references document_group (id)
);

create index document_group_id
    on document (document_group_id);

create index check_id
    on document_group (check_id);

create table email_setting
(
    id                      bigint auto_increment
        primary key,
    customer_id             bigint       not null,
    send_emails             tinyint(1)   not null,
    smtp_host               varchar(255) not null,
    smtp_port               int          not null,
    smtp_username           varchar(255) null,
    smtp_password           varchar(255) null,
    smtp_transport_strategy varchar(64)  null,
    from_address            varchar(255) null,
    from_name               varchar(255) null,
    constraint email_setting_ibfk_1
        foreign key (customer_id) references customer (id)
);

create index customer_id
    on email_setting (customer_id);

create table flash_card_question
(
    id                     bigint auto_increment
        primary key,
    check_id               bigint               not null,
    question               varchar(255)         null,
    allow_multiple_answers tinyint(1)           not null,
    required_question      tinyint(1) default 0 not null,
    constraint flash_card_question_ibfk_1
        foreign key (check_id) references `check` (id)
);

create table flash_card_answer
(
    id                     bigint auto_increment
        primary key,
    flash_card_question_id bigint       not null,
    answer                 varchar(255) null,
    is_correct_answer      tinyint(1)   not null,
    constraint flash_card_answer_ibfk_1
        foreign key (flash_card_question_id) references flash_card_question (id)
);

create index flash_card_question_id
    on flash_card_answer (flash_card_question_id);

create index check_id
    on flash_card_question (check_id);

create table question_category
(
    id                                  bigint auto_increment
        primary key,
    check_id                            bigint        not null,
    language                            varchar(32)   not null,
    title                               varchar(255)  null,
    thumbnail                           longblob      null,
    number_of_possible_outcomes_to_show int default 1 not null,
    constraint question_category_ibfk_1
        foreign key (check_id) references `check` (id)
);

create table image_question
(
    id                   bigint auto_increment
        primary key,
    question_category_id bigint       not null,
    question_text        varchar(255) not null,
    constraint image_question_ibfk_1
        foreign key (question_category_id) references question_category (id)
);

create index question_category_id
    on image_question (question_category_id);

create table possible_outcome
(
    id                   bigint auto_increment
        primary key,
    question_category_id bigint       not null,
    title                varchar(255) not null,
    subtitle             varchar(255) not null,
    description          text         not null,
    youtube_url          varchar(512) null,
    thumbnail            longblob     null,
    pdf                  longblob     null,
    background_colour    varchar(10)  null,
    constraint possible_outcome_ibfk_1
        foreign key (question_category_id) references question_category (id)
);

create table image_answer
(
    id                  bigint auto_increment
        primary key,
    image_question_id   bigint   not null,
    image               longblob null,
    possible_outcome_id bigint   not null,
    constraint image_answer_ibfk_1
        foreign key (image_question_id) references image_question (id),
    constraint image_answer_ibfk_2
        foreign key (possible_outcome_id) references possible_outcome (id)
);

create index image_question_id
    on image_answer (image_question_id);

create index possible_outcome_id
    on image_answer (possible_outcome_id);

create index question_category_id
    on possible_outcome (question_category_id);

create table possible_score
(
    id                  bigint auto_increment
        primary key,
    possible_outcome_id bigint not null,
    score               int    not null,
    constraint possible_score_ibfk_1
        foreign key (possible_outcome_id) references possible_outcome (id)
);

create index possible_outcome_id
    on possible_score (possible_outcome_id);

create index check_id
    on question_category (check_id);

create table range_question
(
    id                   bigint auto_increment
        primary key,
    question_category_id bigint       not null,
    question_text        varchar(255) not null,
    icon                 longblob     null,
    constraint range_question_ibfk_1
        foreign key (question_category_id) references question_category (id)
);

create index question_category_id
    on range_question (question_category_id);

create table range_step
(
    id                bigint auto_increment
        primary key,
    range_question_id bigint       not null,
    score             int          not null,
    description       varchar(255) null,
    constraint range_step_ibfk_1
        foreign key (range_question_id) references range_question (id)
);

create index range_question_id
    on range_step (range_question_id);

create table submission
(
    id           bigint auto_increment
        primary key,
    check_id     bigint       not null,
    first_name   varchar(64)  not null,
    last_name    varchar(64)  not null,
    street       varchar(128) not null,
    zip_code     varchar(16)  not null,
    city         varchar(128) not null,
    phone_number varchar(16)  not null,
    email        varchar(255) not null,
    constraint submission_ibfk_1
        foreign key (check_id) references `check` (id)
);

create table bookmarked_document
(
    id            bigint auto_increment
        primary key,
    document_id   bigint not null,
    submission_id bigint not null,
    constraint bookmarked_document_ibfk_1
        foreign key (submission_id) references submission (id),
    constraint bookmarked_document_ibfk_2
        foreign key (document_id) references document (id)
);

create index document_id
    on bookmarked_document (document_id);

create index submission_id
    on bookmarked_document (submission_id);

create table bookmarked_possible_outcome
(
    id                  bigint auto_increment
        primary key,
    possible_outcome_id bigint not null,
    submission_id       bigint not null,
    constraint bookmarked_possible_outcome_ibfk_1
        foreign key (submission_id) references submission (id),
    constraint bookmarked_possible_outcome_ibfk_2
        foreign key (possible_outcome_id) references possible_outcome (id)
);

create index possible_outcome_id
    on bookmarked_possible_outcome (possible_outcome_id);

create index submission_id
    on bookmarked_possible_outcome (submission_id);

create table image_question_answer
(
    id              bigint auto_increment
        primary key,
    submission_id   bigint not null,
    image_answer_id bigint not null,
    constraint image_question_answer_ibfk_1
        foreign key (submission_id) references submission (id),
    constraint image_question_answer_ibfk_2
        foreign key (image_answer_id) references image_answer (id)
);

create index image_answer_id
    on image_question_answer (image_answer_id);

create index submission_id
    on image_question_answer (submission_id);

create table range_question_answer
(
    id                bigint auto_increment
        primary key,
    submission_id     bigint not null,
    range_question_id bigint not null,
    value             int    not null,
    constraint range_question_answer_ibfk_1
        foreign key (submission_id) references submission (id),
    constraint range_question_answer_ibfk_2
        foreign key (range_question_id) references range_question (id)
);

create index range_question_id
    on range_question_answer (range_question_id);

create index submission_id
    on range_question_answer (submission_id);

create index check_id
    on submission (check_id);

create table text_message_setting
(
    id                 bigint auto_increment
        primary key,
    customer_id        bigint       not null,
    send_text_messages tinyint(1)   not null,
    account_sid        varchar(255) not null,
    auth_token         varchar(255) not null,
    from_phone_number  varchar(255) not null,
    constraint text_message_setting_ibfk_1
        foreign key (customer_id) references customer (id)
);

create index customer_id
    on text_message_setting (customer_id);

create table user_customer_access
(
    customer_id bigint       not null,
    user_id     varchar(255) not null,
    constraint user_customer_access_ibfk_1
        foreign key (customer_id) references customer (id)
);

create index customer_id
    on user_customer_access (customer_id);

create table user_registration_field
(
    id         bigint auto_increment
        primary key,
    field_name varchar(255) not null
);

create table active_user_registration_field
(
    id                         bigint auto_increment
        primary key,
    customer_id                bigint       not null,
    user_registration_field_id bigint       not null,
    validation_regex           varchar(255) not null,
    constraint active_user_registration_field_ibfk_1
        foreign key (customer_id) references customer (id),
    constraint active_user_registration_field_ibfk_2
        foreign key (user_registration_field_id) references user_registration_field (id)
);

create index customer_id
    on active_user_registration_field (customer_id);

create index user_registration_field_id
    on active_user_registration_field (user_registration_field_id);

