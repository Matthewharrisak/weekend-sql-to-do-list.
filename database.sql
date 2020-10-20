CREATE TABLE "tasks" (
"id" serial primary key,
"task" varchar(200),
"taskFinished" boolean default false
);


-- // examples for sample data
INSERT INTO "tasks" ( "task" )
VALUES ('sleep');

INSERT INTO "tasks" ( "task" )
VALUES ('drink');

INSERT INTO "tasks" ( "task" )
VALUES ('eat');
