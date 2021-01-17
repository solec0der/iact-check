-- liquibase formatted sql

-- changeset yhuggler:202101120800

CREATE TABLE email_setting
(
    id                      bigint       NOT NULL AUTO_INCREMENT,
    customer_id             bigint       NOT NULL,
    send_emails             boolean      NOT NULL,
    smtp_host               varchar(255) NOT NULL,
    smtp_port               int          NOT NULL,
    smtp_username           varchar(255),
    smtp_password           varchar(255),
    smtp_transport_strategy varchar(64),
    from_address            varchar(255),
    from_name               varchar(255),
    primary key (id),
    foreign key (customer_id) references customer (id)
);

