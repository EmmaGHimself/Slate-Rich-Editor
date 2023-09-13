import { toggleStyle } from "@/app/utils/EditorUtils";
import { useCallback } from "react";
import { DefaultElement } from "slate-react";
import Link from "../Link";

const KeyBindings = {
  onKeyDown: (editor: any, event: any) => {
    if (
      (event.key == "mod+b" && event.ctrlKey) ||
      (event.key === "b" && event.metaKey)
    ) {
      toggleStyle(editor, "bold");
      return;
    }
    if (
      (event.key == "mod+i" && event.ctrlKey) ||
      (event.key === "i" && event.metaKey)
    ) {
      toggleStyle(editor, "italic");
      return;
    }
    if (
      (event.key == "mod+c" && event.ctrlKey) ||
      (event.key === "c" && event.metaKey)
    ) {
      toggleStyle(editor, "code");
      return;
    }
    if (
      (event.key == "mod+u" && event.ctrlKey) ||
      (event.key === "u" && event.metaKey)
    ) {
      toggleStyle(editor, "underline");
      return;
    }
  },
};
export default function useEditorConfig(editor: any) {
  const onKeyDown = useCallback(
    (event: any) => KeyBindings.onKeyDown(editor, event),

    [editor]
  );
  editor.isInline = (element: any) => ["link"].includes(element.type);
  return { renderElement, renderLeaf, onKeyDown };
}

function renderElement(props: any) {
  const { element, children, attributes } = props;
  switch (element.type) {
    case "paragraph":
      return <p {...attributes}>{children}</p>;
    case "h1":
      return <h1 {...attributes}>{children}</h1>;
    case "h2":
      return <h2 {...attributes}>{children}</h2>;
    case "h3":
      return <h3 {...attributes}>{children}</h3>;
    case "h4":
      return <h4 {...attributes}>{children}</h4>;
    case "link":
      return <Link {...props} url={element.url} />;
    default:
      // For the default case, we delegate to Slate's default rendering.
      return <DefaultElement {...props} />;
  }
}
function renderLeaf({
  attributes,
  children,
  leaf,
}: {
  attributes: any;
  children: any;
  leaf: any;
}) {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  return <span {...attributes}>{el}</span>;
}
