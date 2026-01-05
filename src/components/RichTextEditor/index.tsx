"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRef, useState } from "react";

export default function RichTextEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<any>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        inline: false,
        allowBase64: true, // local image зөвшөөрнө
      }),
    ],
    content: "<p>Start writing…</p>",
    autofocus: true,
    immediatelyRender: true,
    onUpdate: ({ editor }) => {
      console.log("OUT", editor.getJSON());
      setValue(editor.getJSON());
    },
  });

  if (!editor) return null;

  // 👉 FILE UPLOAD HANDLER
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);

    // same file дахин сонгож болохын тулд
    e.target.value = "";
  };

  return (
    <div className="border rounded-md">
      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-1 border-b p-2 text-sm">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()}>
          Code
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>

        <button onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </button>
        <button onClick={() => fileInputRef.current?.click()}>
          🖼 Upload Image
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={onSelectFile}
        />
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="min-h-62.5 p-4 outline-none prose max-w-none"
      />
    </div>
  );
}
