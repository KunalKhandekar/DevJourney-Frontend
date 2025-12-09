/**
 * Node modules
*/
import { useFetcher } from "react-router";
import { toast } from "sonner";

/**
 * Custom modules
*/
import { cn } from "@/lib/utils";

/**
 * Components
*/
import { BlogForm } from "@/components/BlogForm";


export const BlogCreate = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === 'submitting'
    return  (
        <div className={cn(
            'max-w-3xl w-full mx-auto p-4',
            isSubmitting && 'opacity-50 pointer-events-none'
        )}>
            <BlogForm onSubmit={() => {}} />
        </div>
    )
}