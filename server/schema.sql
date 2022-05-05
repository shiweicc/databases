DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;


DROP SCHEMA IF EXISTS messages;
CREATE TABLE messages (
  messageID int NOT NULL,
  messageText text NOT NULL,
  roomname varchar(255),
  username varchar(255),
  createdAT timestamp,
  PRIMARY KEY (messageID)
);


/* Create other tables and define schemas for them here! */
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.

-- DROP SCHEMA IF EXISTS users;
-- CREATE TABLE users (
--   userID int NOT NULL,
--   username varchar(255),
--   PRIMARY KEY (userID)
-- );


campus: "hr-rpp"
created_at: "2022-04-23T17:41:52.420Z"
github_handle: "davidltruong"
message_id: 61246
roomname: null
text: "test"
updated_at: "2022-04-23T17:41:52.420Z"
username: "david"
*/
