import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { Toggle } from "../../Common/ui/Toggle";

interface OptionType {
  icon: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  label: string;
  group?: string;
}

export default function MenuBar({ editor }: { editor: Editor | null }) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => forceUpdate({});
    editor.on("selectionUpdate", updateHandler);
    editor.on("transaction", updateHandler);

    return () => {
      editor.off("selectionUpdate", updateHandler);
      editor.off("transaction", updateHandler);
    };
  }, [editor]);

  if (!editor) return null;

  const Options: OptionType[] = [
    {
      icon: <Heading1 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      label: "Heading 1",
      group: "headings",
    },
    {
      icon: <Heading2 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      label: "Heading 2",
      group: "headings",
    },
    {
      icon: <Heading3 className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      label: "Heading 3",
      group: "headings",
    },
    {
      icon: <Bold className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "Bold",
      group: "formatting",
    },
    {
      icon: <Italic className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "Italic",
      group: "formatting",
    },
    {
      icon: <Strikethrough className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      label: "Strikethrough",
      group: "formatting",
    },
    {
      icon: <AlignLeft className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      label: "Align Left",
      group: "alignment",
    },
    {
      icon: <AlignCenter className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      label: "Align Center",
      group: "alignment",
    },
    {
      icon: <AlignRight className="h-4 w-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      label: "Align Right",
      group: "alignment",
    },
    {
      icon: <List className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "Bullet List",
      group: "lists",
    },
    {
      icon: <ListOrdered className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "Ordered List",
      group: "lists",
    },
    {
      icon: <Highlighter className="h-4 w-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      isActive: editor.isActive("highlight"),
      label: "Highlight",
      group: "formatting",
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border-t border-l border-r border-gray-300 bg-white p-2 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900">
      {Options.map((option, idx) => (
        <React.Fragment key={idx}>
          <Toggle
            pressed={option.isActive}
            onPressedChange={option.onClick}
            className={`
              h-9 w-9 rounded-md p-1
              data-[state=on]:bg-primary data-[state=on]:text-white
              dark:data-[state=on]:bg-primary dark:data-[state=on]:text-gray-100
              dark:data-[state=off]:text-gray-200
              hover:bg-primary/20 hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark
              relative
            `}
            title={option.label} // Hover tooltip
          >
            {option.icon}
          </Toggle>

          {/* Add vertical divider after certain groups */}
          {(option.group === "headings" && idx === 2) ||
          (option.group === "formatting" && idx === 5) ||
          (option.group === "alignment" && idx === 8) ||
          (option.group === "lists" && idx === 10) ? (
            <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1"></div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
