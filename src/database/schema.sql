/*Create the users table with the user_name, id, and poitns column */
DROP TABLE IF EXISTS SaveGame;

CREATE TABLE SaveGame (
    user_name TEXT NOT NULL,
    id INT NOT NULL,
    points INT NOT NULL
);