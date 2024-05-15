// const { query } = require("express");
const pool = require("../config/dbConfig");


function validation (name, age, email, phone_number){

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Name is required and must be a non-empty string');
  }

  if (!age || typeof age !== 'number' || age <= 0) {
    throw new Error('Age is required and must be a positive number');
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    throw new Error('Email is required and must be a valid email address');
  }

  if (!phone_number || typeof phone_number !== 'string' ) {
    throw new Error('Phone number is required and must be a valid phone number');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



const getALLPerson = async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM person_details ORDER BY person_id ASC");
    return result.rows;
  } finally {
    client.release();
  }
};

const getPerson = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM person_details WHERE person_id = $1', [id]);
    return result.rows;
  } finally {
    client.release();
  }
};

const createPerson = async (name, age, email, phone_number) => {

  validation(name, age, email, phone_number);

  const client = await pool.connect();
  try {
    await client.query(
      "INSERT INTO person_details (name,age,email,phone_number) VALUES ($1,$2,$3,$4)",
      [name, age, email, phone_number]
    );
  } finally {
    client.release();
  }
};



const updatePerson = async (person_id, name, age, email, phone_number) => {
  const client = await pool.connect();

  validation(name, age, email, phone_number);

  try {
    await client.query(
      "UPDATE person_details set name = $1 , age = $2 , email = $3 ,phone_number = $4 where person_id = $5",
      [name, age, email, phone_number, person_id]
    );
    return (`Person id ${person_id} is updated`);
  } finally {
    client.release();
  }
};

const deletePerson = async (person_id) => {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM person_details WHERE person_id = $1", [person_id]);
    return( `person id ${person_id} was deleted`);
  } finally {
    client.release();
  }
};

module.exports = {
  getALLPerson,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
}