"use client";
import React, { useState } from "react";
import SlateEditor from "../components/Slate";
import { createEditor, Descendant } from "slate";
import ExampleDocument from "../utils/ExampleDocument";

const HomePage = () => {
  const [document, updateDocument] = useState<Descendant[]>(ExampleDocument);
  return (
    <div>
      <div>
        <SlateEditor document={document} onChange={updateDocument} />
      </div>
    </div>
  );
};

export default HomePage;
