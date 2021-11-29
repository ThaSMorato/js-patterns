import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { RickAndMortyBRLAdapter } from "../../src/business/adapters/rickAndMortyBRLAdapter";
import { RickAndMortyBRL } from "../../src/business/integrations/rickAndMortyBRL";

describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => jest.clearAllMocks());
  it("#getCharacters should be an adapter for RickAndMortyBRL.getCharactersJSON", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJSON.name)
      .mockResolvedValue([]);

    await RickAndMortyBRLAdapter.getCharacters();

    expect(brlIntegration).toHaveBeenCalled();
  });
});
