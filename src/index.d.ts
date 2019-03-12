declare namespace Models {
  interface IDocument {
    version: number; //
    name: string;
    value: string;
  }
}

declare namespace Services {
  interface IDocumentService {
    createModel: (name: string, contents: string) => Models.IDocument;
    find: (name: string) => Models.QuestionAnswerSet;
    update: (item: Models.QuestionAnswerSet) => void;
    remove: (name: string) => void;
    getNames: () => Array<string>;
    exportDocuments: () => string; //nice-to-have
    importDocuments: (sets: string) => Promise<object>; //nice-to-have
  }
}
