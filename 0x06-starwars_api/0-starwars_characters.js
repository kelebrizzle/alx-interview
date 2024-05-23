#!/usr/bin/node
const util = require('util');
const request = util.promisify(require('request'));
const filmID = process.argv[2];

async function starwarsCharacters(filmId) {
  try {
    const endpoint = 'https://swapi-api.hbtn.io/api/films/' + filmId;
    const response = await request(endpoint);
    if (!response.statusCode === 200) {
      throw new Error(`Error fetching film data: ${response.statusCode}`);
    }
    const data = JSON.parse(response.body);
    const characters = data.characters;

    for (let i = 0; i < characters.length; i++) {
      const urlCharacter = characters[i];
      const characterResponse = await request(urlCharacter);
      if (!characterResponse.statusCode === 200) {
        throw new Error(`Error fetching character data: ${characterResponse.statusCode}`);
      }
      const characterData = JSON.parse(characterResponse.body);
      console.log(characterData.name);
    }
  } catch (error) {
    console.error(error.message);
  }
}

starwarsCharacters(filmID);
