/// <reference path="../index.d.ts" />

import DocumentService from "../documentService";

const testData: object = {
  doc1: { name: "test1", contents: "test 1 value" },
  doc2: { name: "test2", contents: "test 2 value" }
};
describe("Document Service Tests", () => {
  test("document service is a thing", () => {
    expect(typeof DocumentService).toBe("object");
  });

  test("add a document", () => {
    DocumentService.update(testData.doc1);
    const result: Models.IDocument = DocumentService.find(testData.doc1.name);
    expect(result.name).toBe("test1");
  });
  test("update doc1", () => {
    testData.doc1.value = "new test 1 value";
    DocumentService.update(testData.doc1);
    expect(DocumentService.find(testData.doc1.name).contents).toBe(
      testData.doc1.contents
    );
  });
  test("remove a doc1", () => {
    DocumentService.remove(testData.doc1.name);
    expect(DocumentService.find(testData.doc1.name)).toBe(null);
  });
});
