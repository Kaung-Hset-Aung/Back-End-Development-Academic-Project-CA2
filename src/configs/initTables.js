// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require("../services/db");

// ##############################################################
// DEFINE SQL STATEMENTS
// ##############################################################
const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Spells;
DROP TABLE IF EXISTS LearntSpells;
DROP TABLE IF EXISTS Registration;
DROP TABLE IF EXISTS Tournament;
DROP TABLE IF EXISTS Alumni;
DROP TABLE IF EXISTS Messages;


  CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT,
    password TEXT NOT NULL
   );
   CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
   );
   CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
   );

   INSERT INTO Task (title, description, points) VALUES
   ('Plant a Tree','Plant a tree in your neighbourhood or a designated green area', 50),
   ('Use Public Transportation','Use public transportation or carpool instead of driving alone', 30),
   ('Reduce Plastic Usage','Commit to using reusable bags and containers', 40),
   ('Energy Conservation','Turn off lights and appliances when not in use', 25),
   ('Composting','Start composting kitchen scraps to create natural fertilizer', 35);



   /*Section B*/
   CREATE TABLE Student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    house TEXT NOT NULL
   );

   CREATE TABLE Spells (
    spell_id INT PRIMARY KEY AUTO_INCREMENT,
    spell TEXT NOT NULL,
    description TEXT NOT NULL,
    damage INT NOT NULL
   );

   CREATE TABLE LearntSpells (
    learnt_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    spell_id INT NOT NULL,
    learnt_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE Registration (
      registration_id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      house TEXT NOT NULL,
      ecoPoint INT NOT NULL,
      damage INT NOT NULL
    );

    CREATE TABLE Alumni (
      alumni_id INT PRIMARY KEY AUTO_INCREMENT,
      student_id INT NOT NULL,
      ecoPoints INT NOT NULL,
      damage INT NOT NULL,
      total_score INT NOT NULL
  );
  
    CREATE TABLE Tournament (
      tournament_id INT PRIMARY KEY AUTO_INCREMENT,
      player1_id INT NOT NULL,
      player1_EcoPoint INT NOT NULL,
      player1_Damage INT NOT NULL,
      player2_id INT NOT NULL,
      player2_EcoPoint INT NOT NULL,
      player2_Damage INT NOT NULL,
      winner_id INT 
    );

   INSERT INTO Spells (spell, description, damage) VALUES
   ('Winning','Winning the Spell Tournament', 10),
   ('Not Winning','Participating in the Spell Tournament', 5),
   ('Expelliarmus', 'Disarming Spell', 9),
   ('Alohomora','Unlocks and opens doors or windows', 4),
   ('WingardiumLeviosa','Levitates objects', 6),
   ('Lumos','Creates light at the wand tip', 4),
   ('Legilimens','Mind Reading Spell', 6),
   ('AvadaKedavra','Causes instant death', 10),
   ('Crucio','Inflicts excruciating pain', 8),
   ('Obliviate','Erases memories', 7),
   ('Fiendfyre','Conjures a destructive fire', 9),
   ('ExpectoPatronum','Conjures a Patronus', 9);



  /*CA2 MESSAGE*/
  CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  
   `

// ##############################################################
// RUN SQL STATEMENTS
// ##############################################################
pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
      console.error("Error creating tables:", error);
    } else {
      console.log("Tables created successfully");
    }
    process.exit();
  });