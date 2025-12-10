/**
 * Custom modules
*/
import { cn } from "@/lib/utils";

/**
 * Components
*/
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * Assets
*/
import { Facebook, GithubIcon, GlobeLockIcon, LinkedinIcon, XIcon } from "lucide-react";

/**
 * Constants
*/
const SOCIAL_LINKS = [
    {
        href: 'https://x.com/_kunalkhandekar',
        Icon: XIcon,
        label: 'X (Twitter)',
    },
    {
        href: 'https://github.com/KunalKhandekar',
        Icon: GithubIcon,
        label: 'GitHub',
    },
    {
        href: 'https://www.linkedin.com/in/khandekarsahil/',
        Icon: LinkedinIcon,
        label: 'LinkedIn',
    },
    {
        href: 'https://sahilkhandekar.dev/',
        Icon: GlobeLockIcon,
        label: 'Portfolio',
    },
] as const;

export const Footer = ({ className, ...props }: React.ComponentProps<'footer'>) => {
    return (
        <footer className={cn('border-t', className)} {...props}>
            <div className="container py-8 grid max-md:justify-items-center md:grid-cols-[1fr_3fr_1fr] md:items-center">
                <Logo />
                <p className="text-muted-foreground order-1 max-md:text-center md:order-none md:justify-self-center">
                    &copy; {new Date().getFullYear()} DevJourney. All right reserved.
                </p>

                <ul className="flex items-center gap-1 max-md:mt-6 max-md:mb-4 md:justify-self-end">
                {SOCIAL_LINKS.map(({ Icon,href,label }) => {
                    return <li key={href}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant='ghost' size='icon' aria-label={label} asChild>
                                    <a href={href} target="_blank" rel="noopener noreferrer">
                                        <Icon />
                                    </a>
                                </Button>
                            </TooltipTrigger>

                            <TooltipContent>{label}</TooltipContent>
                        </Tooltip>
                    </li>
                })}
            </ul>
            </div>
        </footer>
    )
}