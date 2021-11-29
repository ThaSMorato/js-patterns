import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL";
import { Character } from "../../src/entities/character";

describe("#RickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());

  it("#getCharactersJSON should return a list of character entity", async () => {
    const response = JSON.parse(await fs.readFile("./test/mocks/characters.json"));
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const expected = response.results.map((char) => new Character(char));
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });

  it("#getCharactersJSON should return a empty list if the API returns nothing", async () => {
    const results = JSON.parse(await fs.readFile("./test/mocks/characters-empty.json"));
    jest.spyOn(axios, "get").mockResolvedValue({ data: results });
    const expected = results.results;
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
});
