"use client"

import type React from "react"

/**
 * Node modules
 */
import { useCurrentEditor } from "@tiptap/react"
import { useCallback, useMemo } from "react"
import { TooltipProvider } from "@/components/ui/tooltip" // Import TooltipProvider

/**
 * Components
 */
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

/**
 * Assets
 */
import {
  BoldIcon,
  ChevronDownIcon,
  CodeIcon,
  CodeSquareIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  HeadingIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  Redo2Icon,
  StrikethroughIcon,
  TextQuoteIcon,
  Undo2Icon,
} from "lucide-react"

/**
 * Types
 */
import type { LucideProps } from "lucide-react"
type Level = 1 | 2 | 3
interface HeadingType {
  label: string
  Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  level: Level
}

/**
 * Constants
 */
const HEADINGS: HeadingType[] = [
  {
    label: "Heading 1",
    Icon: Heading1Icon,
    level: 1,
  },
  {
    label: "Heading 2",
    Icon: Heading2Icon,
    level: 2,
  },
  {
    label: "Heading 3",
    Icon: Heading3Icon,
    level: 3,
  },
]

export const Toolbar = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { editor } = useCurrentEditor()

  const activeHeadingIcon = useMemo(() => {
    if (!editor) return <HeadingIcon />
    const activeHeading = HEADINGS.find(({ level }) => editor.isActive("heading", { level }))
    return activeHeading?.level ? <activeHeading.Icon /> : <HeadingIcon />
  }, [editor, editor?.state.selection])

  const isAnyHeadingActive = useMemo(() => editor?.isActive("heading") ?? false, [editor?.state.selection])

  const handleUndo = useCallback(() => editor?.commands.undo(), [editor])

  const handleRedo = useCallback(() => editor?.commands.redo(), [editor])

  const handleBulletList = useCallback(() => editor?.chain().focus().toggleBulletList().run(), [editor])

  const handleOrderedList = useCallback(() => editor?.chain().focus().toggleOrderedList().run(), [editor])

  const handleBlockquote = useCallback(() => editor?.chain().focus().toggleBlockquote().run(), [editor])

  const handleCodeBlock = useCallback(() => editor?.chain().focus().toggleCodeBlock().run(), [editor])

  const handleBold = useCallback(() => editor?.chain().focus().toggleBold().run(), [editor])

  const handleItalic = useCallback(() => editor?.chain().focus().toggleItalic().run(), [editor])

  const handleStrike = useCallback(() => editor?.chain().focus().toggleStrike().run(), [editor])

  const handleCode = useCallback(() => editor?.chain().focus().toggleCode().run(), [editor])

  if (!editor) return null

  return (
    <TooltipProvider>
      {" "}
      {/* Wrap the Toolbar content in TooltipProvider */}
      <div className={cn("flex items-center gap-1 p-2", className)} {...props}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleUndo} disabled={!editor.can().undo()}>
              <Undo2Icon />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Undo
            <div className="opacity-70">Ctrl+Z</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleRedo} disabled={!editor.can().redo()}>
              <Redo2Icon />
            </Button>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Redo
            <div className="opacity-70">Ctrl+Shift+Z</div>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />

        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button className="px-2! gap-0" variant={isAnyHeadingActive ? "secondary" : "ghost"}>
                  {activeHeadingIcon}
                  <ChevronDownIcon className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>

            <TooltipContent side="bottom">Heading</TooltipContent>
          </Tooltip>

          <DropdownMenuContent align="start" onCloseAutoFocus={(event) => event.preventDefault()}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground">Heading</DropdownMenuLabel>

              {HEADINGS.map(({ label, Icon, level }) => (
                <DropdownMenuItem
                  key={`heading-${level}`}
                  onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                  disabled={!editor.can().toggleHeading({ level })}
                >
                  <Icon /> {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle bullet list"
              onClick={handleBulletList}
              disabled={!editor.can().toggleBulletList()}
              pressed={editor.isActive("bulletList")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <ListIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Bullet List
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle ordered list"
              onClick={handleOrderedList}
              disabled={!editor.can().toggleOrderedList()}
              pressed={editor.isActive("orderedList")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <ListOrderedIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Ordered List
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle Blockquote"
              onClick={handleBlockquote}
              disabled={!editor.can().toggleBlockquote()}
              pressed={editor.isActive("blockquote")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <TextQuoteIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Blockquote
            <div className="opacity-70">Ctrl+Shift+B</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle code block"
              onClick={handleCodeBlock}
              disabled={!editor.can().toggleCodeBlock()}
              pressed={editor.isActive("codeBlock")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <CodeSquareIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Code Block
            <div className="opacity-70">Ctrl+Alt+C</div>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle bold"
              onClick={handleBold}
              disabled={!editor.can().toggleBold()}
              pressed={editor.isActive("bold")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <BoldIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Bold
            <div className="opacity-70">Ctrl+B</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle italic"
              onClick={handleItalic}
              disabled={!editor.can().toggleItalic()}
              pressed={editor.isActive("italic")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <ItalicIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Italic
            <div className="opacity-70">Ctrl+I</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle strikethrough"
              onClick={handleStrike}
              disabled={!editor.can().toggleStrike()}
              pressed={editor.isActive("strike")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <StrikethroughIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Strike
            <div className="opacity-70">Ctrl+Shift+S</div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle
              aria-label="Toggle code"
              onClick={handleCode}
              disabled={!editor.can().toggleCode()}
              pressed={editor.isActive("code")}
              className="aria-pressed:bg-secondary aria-pressed:text-secondary-foreground"
            >
              <CodeIcon />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent side="bottom" className="text-center">
            Code
            <div className="opacity-70">Ctrl+E</div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
