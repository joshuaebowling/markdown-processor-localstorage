/// <reference path="./index.d.ts" />
import Basil from "basil.js";
import {
  chain,
  map,
  each,
  keys,
  intersection,
  difference,
  toObject
} from "lodash";
const store = new Basil({
  namespace: "DocumentJumbler",
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

const DocumentStore = {};

export const Document: Services.IDocument = {
  find: (name: string) => {
    if (name === undefined) {
      return collectionMap;
    }
    const result = map(JSON.parse(store.get(name)), qa =>
      Document.createModel(qa.id, qa.answer, qa.question)
    );
    return result;
  },
  update: (item: Models.DocumentSet) =>
    store.set(item.name, JSON.stringify(item.Documents)),
  remove: (name: string) => {
    store.remove(name);
  },
  getNames: () => store.keys(),
  createModel: ({ name, Documents }: Models.DocumentSet) => ({
    name,
    Documents
  }),
  createModel: (id, answer, question) => ({ id, answer, question }),
  exportSets: () => {
    const result: Array = map(Document.getNames(), name => ({
      [name]: Document.find(name)
    }));
    return JSON.stringify(result);
  },
  importSets: (jsonSets: string) => {
    const result: Response.IDocumentImport = {
      added: [],
      failed: [],
      error: null
    };
    var sets: object;
    try {
      sets = JSON.parse(jsonSets);
    } catch {
      result.error = "Parsing JSON Failed";
    }
    const importSetNames: Array<string> = keys(sets);
    const currentSetNames: Array<string> = Document.getNames();

    each(sets, (set, name) => {
      var name: string = chain(set)
        .keys()
        .first()
        .value();
      if (currentSetNames.find(setName => setName === name)) {
        result.failed.push(name);
      } else {
        var toAdd: Models.DocumentSet = {
          name,
          Documents: set[name]
        };
        Document.update(toAdd);
        result.added.push(name);
      }
    });
    return result;
  }
};
