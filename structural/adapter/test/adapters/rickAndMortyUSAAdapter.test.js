import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { RickAndMortyUSAAdapter } from "../../src/business/adapters/rickAndMortyUSAAdapter";
import { RickAndMortyUSA } from "../../src/business/integrations/rickAndMortyUSA";

describe("#RickAndMortyUSAAdapter", () => {
  beforeEach(() => jest.clearAllMocks());
  it("#getCharacters should be an adapter for RickAndMortyUSA.getCharactersJSON", async () => {
    const usaIntegration = jest
      .spyOn(RickAndMortyUSA, RickAndMortyUSA.getCharactersFromXML.name)
      .mockResolvedValue([]);

    await RickAndMortyUSAAdapter.getCharacters();

    expect(usaIntegration).toHaveBeenCalled();
  });
});
