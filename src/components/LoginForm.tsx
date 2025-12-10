/**
 * Node modules
 */
import { Link, useFetcher, useNavigate } from 'react-router';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';

/**
 * Custom modules
 */
import { cn } from '@/lib/utils';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { InputPassword } from '@/components/InputPassword';

/**
 * Assets
 */
// logo banner
import { LoaderCircleIcon } from 'lucide-react';

/**
 * Types
 */
import type { ActionResponse, AuthResponse, ErrorResponse, ValidationError } from '@/types';
import { toast } from 'sonner';
type LoginField = 'email' | 'password';

/**
 * Constants
 */
const LOGIN_FORM = {
  title: 'Welcome back',
  description: 'Login to your DevJourney account',
  footerText: "Don't have an account ?",
} as const;

/**
 * Login form schema
 */
const formSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .max(50, 'Email must be less than 50 characters')
    .email('Invalid email address'),
  password: z
    .string()
    .nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const loginResponse = fetcher.data as ActionResponse<AuthResponse>;

  const isLoading = fetcher.state !== 'idle';

  // React hook form initial
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle server error response
  useEffect(() => {
    if (!loginResponse) return;

    if (loginResponse.ok) {
      navigate('/', { viewTransition: true });
      return;
    }

    if (!loginResponse.err) return;

    if (loginResponse.err.code === 'AuthorizationError') {
      const authorizationError = loginResponse.err as ErrorResponse;

      toast.error(authorizationError.message, {
        position: 'top-center',
      });
    }

    if (loginResponse.err.code === 'ValidationError') {
      const ValidationErrors = loginResponse.err as ValidationError;
      Object.entries(ValidationErrors.errors).forEach((value) => {
        const [, ValidationError] = value;
        const signupField = ValidationError.path as LoginField;
        form.setError(
          signupField,
          {
            type: 'custom',
            message: ValidationError.msg,
          },
          { shouldFocus: true },
        );
      });
    }
  }, [loginResponse]);

  // handle form submission
  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    await fetcher.submit(values, {
      action: '/login',
      method: 'POST',
      encType: 'application/json',
    });
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <Card className='overflow-hidden p-0 '>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form
              className='p-6 md:p-8'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-6'>
                <div className='flex-flex-col items-center text-center'>
                  <h1 className='text-2xl font-semibold'>{LOGIN_FORM.title}</h1>
                  <p className='text-muted-foreground text-balance'>
                    {LOGIN_FORM.description}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='john@example.com'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-3'>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <InputPassword
                          placeholder='Enter your password'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type='submit'
                  className='w-full'
                  disabled={isLoading}
                >
                  {isLoading && <LoaderCircleIcon className='animate-spin' />}
                  <span>Login</span>
                </Button>
              </div>

              <div className='mt-4 text-center text-sm'>
                {LOGIN_FORM.footerText}{' '}
                <Link
                  to={'/signup'}
                  className='underline underline-offset-4 hover:text-primary '
                  viewTransition
                >
                  Sign up
                </Link>
              </div>
            </form>
          </Form>

          <figure className='bg-muted relative hidden md:block'>
            <img
              src=''
              alt='Login Banner'
              width={400}
              height={400}
              className='absolute inset-0 w-full h-full object-cover '
            />
          </figure>
        </CardContent>
      </Card>
    </div>
  );
};
