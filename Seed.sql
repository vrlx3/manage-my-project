DROP TABLE IF EXISTS dependencies;
        DROP TABLE IF EXISTS users_activities;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS activities;
        
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          displayname VARCHAR(255) DEFAULT NULL,
          username VARCHAR(255) DEFAULT NULL,
          permission INT DEFAULT 1
        );
        
        CREATE TABLE activities (
          id SERIAL PRIMARY KEY,
          activity VARCHAR(255) NOT NULL,
          active BOOLEAN DEFAULT TRUE,
          description VARCHAR(255) DEFAULT NULL
        );
        
        CREATE TABLE users_activities (
          id SERIAL PRIMARY KEY,
          users_id INT REFERENCES users(id),
          activities_id INT REFERENCES activities(id)
        );
        
        CREATE TABLE dependencies (
        id SERIAL PRIMARY KEY,
        activity_next INT REFERENCES activities(id),
        activity_previous INT REFERENCES activities(id)
        );