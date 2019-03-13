/// <reference path="../index.d.ts" />

import DocumentService from "../documentService";

const testData: object = {
  doc1: { name: "test1", contents: "test 1 value" },
  doc2: { name: "test2", contents: "test 2 value" }
};
describe("Document Service Tests", () => {
  test("document service reset", () => {
    //    DocumentService.reset();
  });
  test("document service is a thing", () => {
    expect(typeof DocumentService).toBe("object");
  });

  test("add a document", () => {
    DocumentService.update(testData.doc1);
    const result: Models.IDocument = DocumentService.find(testData.doc1.name);
    expect(result.name).toBe("test1");
    expect(result.contents).toBe(testData.doc1.contents);
  });

  test("updated a document", () => {
    testData.doc1.contents = "new contents";
    DocumentService.update(testData.doc1);
    const result: Models.IDocument = DocumentService.find(testData.doc1.name);
    expect(result.contents).toBe("new contents");
  });

  test("getNames", () => {
    const names: Array<string> = DocumentService.getNames();
    expect(names.indexOf(testData.doc1.name)).toBeGreaterThan(-1);
  });

  test("remove a document", () => {
    DocumentService.remove(testData.doc1.name);
    const names: Array<string> = DocumentService.getNames();
    expect(names.indexOf(testData.doc1.name)).toBe(-1);
  });
});
