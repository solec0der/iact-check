-- liquibase formatted sql

-- changeset yhuggler:202202271656

create table client_log_entry
(
    id                bigint auto_increment primary key,
    log_level         varchar(255) not null,
    message           text         not null,
    path              varchar(255) not null,
    user_agent        varchar(255) not null,
    remote_ip_address varchar(255) not null,
    timestamp         timestamp    not null
);

create table server_log_entry
(
    id                bigint auto_increment primary key,
    log_level         varchar(255) not null,
    message           text         not null,
    stacktrace        text,
    path              varchar(255),
    method            varchar(255),
    user_agent        varchar(255),
    remote_ip_address varchar(255),
    timestamp         timestamp    not null
);