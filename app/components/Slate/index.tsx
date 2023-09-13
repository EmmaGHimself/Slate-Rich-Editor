"use client";
import React, { useCallback, useMemo } from "react";
import { Editable, Slate, withReact } from "slate-react";
import { createEditor } from "slate";
import useEditorConfig from "../RenderElement";
import Toolbar from "../ToolBar";
import useSelection from "@/app/utils/useSelection";

const SlateEditor = ({
  document,
  onChange,
}: {
  document: any;
  onChange: any;
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);

  const onChangeHandler = useCallback(
    (document: any) => {
      onChange(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  return (
    <div>
      <div className="Slate-div">
        <Slate
          editor={editor}
          initialValue={document}
          onChange={onChangeHandler}
        >
          <Toolbar selection="" previousSelection="" />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
          />
        </Slate>
      </div>
    </div>
  );
};
export default SlateEditor;
