import { Editor, Transforms, Range } from "slate";

export function getActiveStyles(editor: any) {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
}

export function toggleStyle(editor: any, style: any) {
  const activeStyles = getActiveStyles(editor);
  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
}

// export function getTextBlockStyle(editor: any) {
//   const selection = editor.selection;
//   if (selection == null) {
//     return null;
//   }
//   // gives the forward-direction points in case the selection was
//   // was backwards.
//   const [start, end] = Range.edges(selection);

//   //path[0] gives us the index of the top-level block.
//   let startTopLevelBlockIndex = start.path[0];
//   const endTopLevelBlockIndex = end.path[0];

//   let blockType = null;
//   while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
//     const [node, _] = Editor.node(editor, [startTopLevelBlockIndex]);
//     if (blockType == null) {
//       blockType = node.type;
//     } else if (blockType !== node.type) {
//       return "multiple";
//     }
//     startTopLevelBlockIndex++;
//   }

//   return blockType;
// }

// export function toggleBlockType(editor: any, blockType: any) {
//   const currentBlockType = getTextBlockStyle(editor);
//   const changeTo = currentBlockType === blockType ? "paragraph" : blockType;
//   Transforms.setNodes(
//     editor,
//     { type: changeTo },
//     // Node filtering options supported here too. We use the same
//     // we used with Editor.nodes above.

//     { at: editor.selection, match: (n: any) => Editor.isBlock(editor, n) }
//   );
// }
export function isLinkNodeAtSelection(editor: any, selection: any) {
  if (selection == null) {
    return false;
  }

  return (
    Editor.above(editor, {
      at: selection,
      match: (n: any) => n.type === "link",
    }) != null
  );
}
