declare namespace Models {
  interface IDocument {
    version: number; //
    name: string;
    value: string;
  }
}

declare namespace Infrastructure {
  interface IState {
    openDocuments: Array<string>; // maybe like a tabstrip of docs?
    availableDocuments: Array<string>; // a list of documents the user currently has on the screen
    currentDocument: Models.IDocument;
  }
}

declare namespace Services {
  interface IDocumentService {
    createModel: (name: string, contents: string) => Models.IDocument;
    find: (name: string) => Models.IDocument;
    update: (item: Models.IDocument) => void;
    remove: (name: string) => void;
    getNames: () => Array<string>;
    export: () => string; //nice-to-have
    import: (sets: string) => Promise<object>; //nice-to-have
  }
}

declare namespace Response {
  interface IDocumentSave {
    success: string;
    nameTaken: string;
    error: string;
  }
  interface IDocumentImport {
    added: Array<string>;
    failed: Array<string>;
    error: string;
  }
}
