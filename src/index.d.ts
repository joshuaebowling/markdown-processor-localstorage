declare namespace Models {
  interface IDocument {
    version: number; //
    name: string;
    contents: string;
  }
}

declare namespace Infrastructure {
  interface IState {
    openDocuments: Array<string>; // maybe like a tabstrip of docs?
    availableDocuments: Array<string>; // a list of documents the user currently has on the screen
    currentDocument: Models.IDocument;
  }
  interface IAction {
    type: string;
    payload: any;
  }

  interface Actions {
    // TO MANAGE IState.openDocuments
    ADD_OPEN_DOCUMENT_RQ: string;
    REMOVE_OPEN_DOCUMENT_RQ: string;
    OPEN_DOCUMENTS_CHANGED_RS: string; //THIS RESPONSE MAPS TO ADD/REMOVE DOCUMENT REQUESTS
    ADD_DOCUMENT_RQ: string;
    REMOVE_DOCUMENT_RQ: string;
    DOCUMENTS_CHANGED_RS: string; //THIS RESPONSE MAPS TO ADD/REMOVE DOCUMENT REQUESTS
    // TO MANAGE IState.availableDocuments
    SET_AVAILABLE_DOCUMENTS_RQ: string;
    SET_AVAILABLE_DOCUMENTS_RS: string;
    // TO MANAGE  IState.currentDocument
    SET_CURRENT_DOCUMENT_RQ: string;
    SET_CURRENT_DOCUMENT_RS: string;
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
