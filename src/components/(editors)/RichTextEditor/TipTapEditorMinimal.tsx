"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./MenuBar";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}
export default function TipTapEditorMinimal({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4 my-2 dark:list-disc",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-4 my-2 dark:list-decimal",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "h-[230px] overflow-y-auto custom-scroll p-4 border border-gray-300 dark:border-gray-800 rounded-b-md bg-background text-gray-900 prose-headings:font-bold prose-p:my-4 prose-p:leading-relaxed prose-ul:my-6 prose-ol:my-6 prose-li:my-2 dark:bg-card dark:text-gray-100 dark:border-border outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}
