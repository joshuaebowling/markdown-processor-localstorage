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
  namespace: "MarkdownWordProcessor",
  storages: ["cookie", "local"],
  storage: "local",
  expireDays: 365
});

const DocumentService: Services.IDocumentService = {
  find: (name: string) => {
    const result = map(store.get(name), value => ({ name, value }));
    return result;
  },
  update: (item: Models.IDocument) => store.set(item.name, item.value),
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
  },
  reset: () => store.reset()
};

export default DocumentService;
