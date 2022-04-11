-- liquibase formatted sql

-- changeset yhuggler:202204091505

alter table document_group
    drop foreign key document_group_ibfk_1;

alter table document_group
    add constraint document_group_ibfk_1
        foreign key (check_id) references `check` (id)
            on delete cascade;

alter table document_file
    drop foreign key document_file_ibfk_1;

alter table document_file
    add constraint document_file_ibfk_1
        foreign key (document_id) references document (id)
            on delete cascade;

alter table document
    drop foreign key document_ibfk_1;

alter table document
    add constraint document_ibfk_1
        foreign key (document_group_id) references document_group (id)
            on delete cascade;

alter table displayed_document_group
    drop foreign key displayed_document_group_document_group_id_fk;

alter table displayed_document_group
    add constraint displayed_document_group_document_group_id_fk
        foreign key (document_group_id) references document_group (id)
            on delete cascade;

alter table displayed_document_group
    drop foreign key displayed_document_group_marketplace_tile_config_id_fk;

alter table displayed_document_group
    add constraint displayed_document_group_marketplace_tile_config_id_fk
        foreign key (marketplace_tile_config_id) references marketplace_tile_config (id)
            on delete cascade;

alter table `check`
    drop foreign key check_ibfk_1;

alter table `check`
    add constraint check_ibfk_1
        foreign key (customer_id) references customer (id)
            on delete cascade;

alter table introduction_slide_configuration
    drop foreign key check_introduction_slide_configuration_ibfk_1;

alter table introduction_slide_configuration
    add constraint check_introduction_slide_configuration_ibfk_1
        foreign key (check_id) references `check` (id)
            on delete cascade;


alter table marketplace_config
    drop foreign key check_marketplace_config_ibfk_1;

alter table marketplace_config
    add constraint check_marketplace_config_ibfk_1
        foreign key (check_id) references `check` (id)
            on delete cascade;

alter table final_marketplace_slide_configuration
    drop foreign key marketplace_config_final_slide_configuration_ibfk_1;

alter table final_marketplace_slide_configuration
    add constraint marketplace_config_final_slide_configuration_ibfk_1
        foreign key (marketplace_config_id) references marketplace_config (id)
            on delete cascade;

alter table check_required_language
    drop foreign key check_required_language_ibfk_1;

alter table check_required_language
    add constraint check_required_language_ibfk_1
        foreign key (check_id) references `check` (id)
            on delete cascade;

alter table customer_branding
    drop foreign key customer_branding_ibfk_1;

alter table customer_branding
    add constraint customer_branding_ibfk_1
        foreign key (customer_id) references customer (id)
            on delete cascade;

alter table email_setting
    drop foreign key email_setting_ibfk_1;

alter table email_setting
    add constraint email_setting_ibfk_1
        foreign key (customer_id) references customer (id)
            on delete cascade;
