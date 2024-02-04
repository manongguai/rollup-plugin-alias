import { describe, it, expect } from "vitest";
import { alias } from "./index";

describe("alias", () => {
  describe("options is object", () => {
    it("should replace when match success", () => {
      const aliasObj: any = alias({
        entries: {
          "-": "./utils",
          "@": "./utils",
        },
      });
      expect(aliasObj.resolveId("-/index.js")).toBe("./utils/index.js");
      expect(aliasObj.resolveId("@/index.js")).toBe("./utils/index.js");
    });

    it("should does not replace when match fail", () => {
      const aliasObj: any = alias({
        entries: {
          "-": "./utils",
        },
      });
      expect(aliasObj.resolveId("/index.js")).toBe("/index.js");
    });
  });
  describe("options is array", () => {
    it("should replace when match success", () => {
      const aliasObj: any = alias({
        entries: [
          {
            find: "-",
            replacement: "./utils",
          },
          {
            find: "@",
            replacement: "./utils",
          },
        ],
      });
      expect(aliasObj.resolveId("-/index.js")).toBe("./utils/index.js");
      expect(aliasObj.resolveId("@/index.js")).toBe("./utils/index.js");
    });

    it("should does not replace when match fail", () => {
      const aliasObj: any = alias({
        entries: [
          {
            find: "-",
            replacement: "./utils",
          },
        ],
      });
      expect(aliasObj.resolveId("/index.js")).toBe("/index.js");
    });
  });
});
