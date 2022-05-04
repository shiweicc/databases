DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

DROP SCHEMA IF EXISTS Users;
CREATE TABLE Users (
  userID int NOT NULL,
  username varchar(255),
  PRIMARY KEY (userID)
);

DROP SCHEMA IF EXISTS Messages;
CREATE TABLE Messages (
  messageID int NOT NULL,
  messageText text NOT NULL,
  roomname varchar(255),
  userID int NOT NULL,
  createdAT timestamp,
  PRIMARY KEY (messageID),
  FOREIGN KEY(userID) REFERENCES Users(userID)
);


/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- CREATE TABLE Persons (
--     PersonID int,
--     LastName varchar(255),
--     FirstName varchar(255),
--     Address varchar(255),
--     City varchar(255)
-- );
/*
campus: "hr-rpp"
created_at: "2022-04-23T17:41:52.420Z"
github_handle: "davidltruong"
message_id: 61246
roomname: null
text: "test"
updated_at: "2022-04-23T17:41:52.420Z"
username: "david"
*/
