-- liquibase formatted sql

-- changeset yhuggler:202102180800

CREATE TABLE text_message_setting
(
    id                 bigint       NOT NULL AUTO_INCREMENT,
    customer_id        bigint       NOT NULL,
    send_text_messages boolean      NOT NULL,
    account_sid        varchar(255) NOT NULL,
    auth_token         varchar(255) NOT NULL,
    from_phone_number  varchar(255) NOT NULL,
    primary key (id),
    foreign key (customer_id) references customer (id)
);

