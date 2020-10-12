create table greeted (
	id serial not null primary key,
    name_greeted text not null,
    how_many_times int not null
);



SET PASSWORD FOR 'codex123'@'localhost' = PASSWORD('codex123');
