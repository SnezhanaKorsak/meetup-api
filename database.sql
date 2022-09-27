CREATE TABLE users (
    id varchar(255) PRIMARY KEY,
    email varchar(128),
    password varchar(128),
    role varchar(128),
    refresh_token varchar(255)
);

CREATE TABLE meetups (
    id varchar(255) PRIMARY KEY,
    title varchar(255),
    description varchar(255),
    time timestamp,
    place varchar(128),
    user_id varchar(255),
    FOREIGN KEY(user_id) REFERENCES users(id)
);