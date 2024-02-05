import type { Plugin } from "rollup";

interface EntriesObject {
  [key: string]: string;
}

interface EntriesArrayItem {
  find: string | RegExp;
  replacement: string;
}

interface AliasOptions {
  entries: EntriesObject | EntriesArrayItem[];
}

export function alias(options: AliasOptions): Plugin {
  const entries = normalizeEntries(options.entries);
  return {
    name: "rollup-plugin-alias",
    resolveId: (source: string, importer: string | undefined, options) => {
      console.log("alias resolverId:", source);
      console.log("importer:", importer);
      console.log("options:", options);
      const entry = entries.find((entry) => {
        return entry.match(source);
      });
      if (entry) {
        return entry.replace(source);
      }
      return source;
    },
  };
}

function normalizeEntries(entries: AliasOptions["entries"]) {
  if (!entries) return [];
  if (Array.isArray(entries)) {
    return entries.map(({ find, replacement }) => {
      return new Entry(find, replacement);
    });
  } else {
    return Object.keys(entries).map((key) => {
      return new Entry(key, entries[key]);
    });
  }
}

class Entry {
  find: string | RegExp;
  replacement: string;
  constructor(find: string | RegExp, replacement: string) {
    this.find = find;
    this.replacement = replacement;
  }
  match(source: string) {
    if (typeof this.find === "string") {
      return source.startsWith(this.find);
    }else{
      return this.find.test(source)
    }
  }
  replace(source: string) {
    return source.replace(this.find, this.replacement);
  }
}
