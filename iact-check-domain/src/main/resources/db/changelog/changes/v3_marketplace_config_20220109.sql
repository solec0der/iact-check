-- liquibase formatted sql

-- changeset yhuggler:202201090800

create table marketplace_config
(
    id                  bigint auto_increment primary key,
    check_id            bigint     not null,
    marketplace_enabled tinyint(1) not null,
    constraint check_marketplace_config_ibfk_1
        foreign key (check_id) references `check` (id)
);

create table marketplace_tile_config
(
    id                               bigint auto_increment primary key,
    marketplace_config_id            bigint       not null,
    tile_title                       varchar(255) not null,
    tile_icon                        varchar(32)  not null,
    document_group_list_title        varchar(255) not null,
    document_group_list_subtitle     varchar(255) not null,
    document_groups_display_type     varchar(32)  not null,
    documents_table_column_name      varchar(64)  not null,
    document_groups_tiles_per_row int,
    constraint marketplace_config_marketplace_tile_config_ibfk_1
        foreign key (marketplace_config_id) references marketplace_config (id)
);

create table displayed_document_group
(
    marketplace_tile_config_id bigint,
    document_group_id          bigint,
    primary key (marketplace_tile_config_id, document_group_id),
    constraint displayed_document_group_marketplace_tile_config_ibfk_1
        foreign key (marketplace_tile_config_id) references marketplace_tile_config (id),
    constraint displayed_document_group_document_groupd_id_ibfk_1
        foreign key (document_group_id) references document_group (id)
);
