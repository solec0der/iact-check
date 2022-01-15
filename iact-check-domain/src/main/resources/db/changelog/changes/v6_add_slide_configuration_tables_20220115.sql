-- liquibase formatted sql

-- changeset yhuggler:202201150948

create table introduction_slide_configuration
(
    id                    bigint auto_increment primary key,
    check_id              bigint  not null,
    show_introduction_slide tinyint not null default 0,
    title                 varchar(255),
    subtitle              varchar(255),
    text                  text,
    constraint check_introduction_slide_configuration_ibfk_1
        foreign key (check_id) references `check` (id)
);

create index check_id
    on introduction_slide_configuration (check_id);


create table final_marketplace_slide_configuration
(
    id                    bigint auto_increment primary key,
    marketplace_config_id bigint  not null,
    show_final_slide        tinyint not null default 0,
    title                 varchar(255),
    subtitle              varchar(255),
    text                  text,
    constraint marketplace_config_final_slide_configuration_ibfk_1
        foreign key (marketplace_config_id) references marketplace_config (id)
);

create index marketplace_config_id
    on final_marketplace_slide_configuration (marketplace_config_id);

INSERT INTO introduction_slide_configuration(check_id)
SELECT c.id
FROM `check` c;

INSERT INTO final_marketplace_slide_configuration(marketplace_config_id)
SELECT m.id
FROM marketplace_config m;

