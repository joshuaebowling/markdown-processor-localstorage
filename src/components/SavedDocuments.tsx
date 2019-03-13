import React from "react";

const Documents = ({ documentNames }) => {
  const documents = documentNames.map(name => (
    <div>{name} [open | delete]</div>
  ));
  return (
    <div>
      <h1>Saved Documents</h1>
      {documents}
    </div>
  );
};

export default Documents;
