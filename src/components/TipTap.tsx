/**
 * Node modules
 */
import { EditorProvider } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';

/**
 * Components
 */
import { Toolbar } from '@/components/Toolbar';

/**
 * Types
 */
import type { EditorProviderProps } from '@tiptap/react';
type TiptapProps = Omit<EditorProviderProps, 'extensions' | 'slotBefore'>;

/**
 * Initial extensions  and content for tiptap editor
 */
const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepAttributes: false,
      keepMarks: true,
    },
  }),
  Placeholder.configure({
    placeholder: 'Blog content goes here...',
  }),
];

const TipTap: React.FC<TiptapProps> = ({ ...props }) => {
  return (
    <EditorProvider
      extensions={extensions}
      slotBefore={<Toolbar className='sticky top-16 bg-background z-10 rounded-t-xl' />}
      editorContainerProps={{ className: 'p-4' }}
      {...props}
    ></EditorProvider>
  );
};

export default TipTap;

// 'use client';

// import type React from 'react';
// import { useCallback, useMemo } from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import { Placeholder } from '@tiptap/extensions';
// import { Toolbar } from '@/components/Toolbar';

// interface TipTapProps {
//   content: string;
//   onUpdate: (editor: any) => void;
// }

// const TipTap: React.FC<TipTapProps> = ({ content, onUpdate }: TipTapProps) => {
//   const extensions = useMemo(
//     () => [
//       StarterKit.configure({
//         bulletList: {
//           keepMarks: true,
//           keepAttributes: false,
//         },
//         orderedList: {
//           keepAttributes: false,
//           keepMarks: true,
//         },
//       }),
//       Placeholder.configure({
//         placeholder: 'Blog content goes here...',
//       }),
//     ],
//     [],
//   );

//   const memoizedOnUpdate = useCallback(
//     ({ editor }: any) => {
//       onUpdate({ editor });
//     },
//     [onUpdate],
//   );

//   const editor = useEditor({
//     extensions,
//     content: content || '',
//     onUpdate: memoizedOnUpdate,
//   });

//   if (!editor) return null;

//   return (
//     <EditorProvider
//       extensions={extensions}
//       slotBefore={<Toolbar className='sticky top-16 bg-background z-10 rounded-t-xl' />}
//       editorContainerProps={{ className: 'p-4' }}
//       {...props}
//     ></EditorProvider>
//   );
// };

// export default TipTap;
