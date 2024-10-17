import Image from 'next/image';
import { signIn } from '@/auth';
import { CalendarHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F4E3]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-2">
          <CalendarHeart className="h-12 w-12 text-[#7C9885]" />
          <h1 className="text-3xl font-bold text-[#7C9885]">ZenAgenda</h1>
          <h2 className="text-xl font-semibold text-[#2C3E50]">Welcome Back</h2>
        </div>
        <form
          action={async () => {
            'use server';
            await signIn('google', { redirectTo: '/dashboard' });
          }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <SignInGoogleButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function SignInGoogleButton() {
  return (
    <Button type="submit">
      <span className="mr-2">Sign in with Google</span>
      <Image
        loading="lazy"
        width={24}
        height={24}
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
      />
    </Button>
  );
}
