import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";
import { RickAndMortyUSA } from "../../src/business/integrations/rickAndMortyUSA";
import { Character } from "../../src/entities/character";

describe("#RickAndMortyUSA", () => {
  beforeEach(() => jest.clearAllMocks());

  it("#getCharactersXML should return a list of character entity", async () => {
    const response = await fs.readFile("./test/mocks/characters.xml");
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const expected = [
      {
        gender: "Male",
        id: 10,
        location: "Worldender's lair",
        name: "Alan Rails",
        origin: "unknown",
        species: "Human",
        status: "Dead",
        type: "Superhuman (Ghost trains summoner)",
      },
    ];
    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toMatchObject(expected);
  });

  it("#getCharactersXML should return a empty list if the API returns nothing", async () => {
    const results = await fs.readFile("./test/mocks/characters-empty.xml");
    jest.spyOn(axios, "get").mockResolvedValue({ data: results });
    const expected = [];
    const result = await RickAndMortyUSA.getCharactersFromXML();

    expect(result).toStrictEqual(expected);
  });
});
