/**
 * Components
*/
import { SignupForm } from "@/components/SignupForm";

export const Signup = () => {
  return (
    <div className="h-dvh flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
            <SignupForm />
        </div>
    </div>
  )
};