CREATE TABLE person (
    person_id varchar(255) PRIMARY KEY,
    login varchar(128),
    email varchar(128),
    password varchar(128)
);

CREATE TABLE meetup (
    meetup_id varchar(255) PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    time timestamp,
    place varchar(128)
);

/*
CREATE TABLE meetup (
    meetup_id SERIAL PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    time timestamp,
    place varchar(64),
    person_id INTEGER,
    FOREIGN KEY(person_id) REFERENCES person(person_id)
); */
