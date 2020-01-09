import Gem, {BLANK} from "../src/gem";

describe("gem", () => {
  describe("pop", () => {
    it("changes type to BLANK", () => {
      const gem = new Gem(4);
      gem.pop();
      expect(gem.type).toBe(BLANK);
    });
  });
});
