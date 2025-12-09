/**
 * Node modules
 */
import { useCallback } from 'react';
import { useCurrentEditor } from '@tiptap/react';

/**
 * Components
 */
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Assets
 */
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading3Icon,
  HeadingIcon,
  ItalicIcon,
  StrikethroughIcon,
  Undo2Icon,
  Redo2Icon,
  TextQuoteIcon,
  CodeSquareIcon,
  ChevronDownIcon,
  ListIcon,
  ListOrderedIcon,
  Heading2Icon,
} from 'lucide-react';

/**
 * Types
 */
import type { LucideProps } from 'lucide-react';
type Level = 1 | 2 | 3;
interface HeadingType {
  label: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
  level: Level;
}

/**
 * Constants
 */
const HEADINGS: HeadingType[] = [
  {
    label: 'Heading 1',
    Icon: Heading1Icon,
    level: 1,
  },
  {
    label: 'Heading 2',
    Icon: Heading2Icon,
    level: 2,
  },
  {
    label: 'Heading 3',
    Icon: Heading3Icon,
    level: 3,
  },
];

export const Toolbar = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const { editor } = useCurrentEditor();

  const getActiveIcon = useCallback(() => {
    if (!editor) return <HeadingIcon />;
    const activeHeading = HEADINGS.find(({ level }) =>
      editor.isActive('heading', {
        level,
      }),
    );

    if (!activeHeading?.level) return <HeadingIcon />;

    return <activeHeading.Icon />;
  }, [editor]);

  if (!editor) return null;

  const isAnyHeadingActive = editor.isActive('heading');

  return (
    <div
      className={cn('flex items-center gap-1 p-2', className)}
      {...props}
    >
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => editor.commands.undo()}
            disabled={editor.can().undo()}
          >
            <Undo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Undo
          <div className='opacity-70'>Ctrl+Z</div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => editor.commands.redo()}
            disabled={editor.can().redo()}
          >
            <Redo2Icon />
          </Button>
        </TooltipTrigger>

        <TooltipContent
          side='bottom'
          className='text-center'
        >
          Redo
          <div className='opacity-70'>Ctrl+Shift+Z</div>
        </TooltipContent>
      </Tooltip>

      <Separator
        orientation='vertical'
        className='data-[orientation=vertical]:h-4'
      />

      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className='px-2! gap-0'
                variant={isAnyHeadingActive ? 'secondary' : 'ghost'}
              >
                {getActiveIcon()}
                <ChevronDownIcon className='text-muted-foreground' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>

          <TooltipContent side='bottom'>Heading</TooltipContent>
        </Tooltip>

        <DropdownMenuContent
          align='start'
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className='text-muted-foreground'>
              Heading
            </DropdownMenuLabel>

            {HEADINGS.map(({label, Icon, level}) => (
                <DropdownMenuItem key={`heading-${level}`} onClick={() => editor.chain().focus().toggleHeading({level}).run()} disabled={!editor.can().toggleHeading({level})}><Icon /> {label}</DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
