/*Create the users, unique id, current level*/

/*Create the SaveGame table,  ID, Level Number , TimeScore */
DROP TABLE IF EXISTS SaveGame;

CREATE TABLE SaveGame (
    SaveNumber INT NOT NULL,
    PlayerName TEXT NOT NULL,
    Id INT NOT NULL,
    LevelNumber INT NOT NULL,
    TimeScore INT NOT NULL
);