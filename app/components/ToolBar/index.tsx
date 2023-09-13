import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  getActiveStyles,
  isLinkNodeAtSelection,
  toggleStyle,
} from "../../utils/EditorUtils";
import { useSlateStatic } from "slate-react";
import styles from "./styles.module.css";
import { FaBeer } from "react-icons/fa";
import getLabelForBlockStyle from "../../utils/ExampleDocument";
import { useCallback } from "react";
const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

function ToolBarButton(props: any) {
  const { icon, isActive, ...otherProps } = props;
  return (
    <Button
      variant="outline-primary"
      className="toolbar-btn"
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}

export default function Toolbar({
  selection,
  previousSelection,
}: {
  selection: any;
  previousSelection: any;
}) {
  const editor = useSlateStatic();

  return (
    <div className="toolbar">
      {/* Dropdown for paragraph styles */}
      {/* <DropdownButton
        className={"block-style-dropdown"}
        disabled={false}
        title={blockType ?? "paragraph"}
        onSelect={onBlockTypeChange}
      >
        {PARAGRAPH_STYLES.map((blockType) => (
          <div className={styles.block} key={blockType}>
            {blockType}
          </div>
        ))}
      </DropdownButton> */}
      {/* Buttons for character styles */}

      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          characterStyle={style}
          icon={style}
          isActive={getActiveStyles(editor).has(style)}
          onMouseDown={(event: any) => {
            event.preventDefault();
            toggleStyle(editor, style);
          }}
        />
      ))}
      <ToolBarButton
        isActive={isLinkNodeAtSelection(editor, editor.selection)}
        label="link"
        icon={"Link"}
      />
    </div>
  );
}
