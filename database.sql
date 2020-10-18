CREATE TABLE "tasks" (
"id" serial primary key,
"task" varchar(200),
"dueBy" varchar (40),
"taskFinished" boolean default false
);