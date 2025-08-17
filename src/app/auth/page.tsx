"use client";

import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.75 8.36,4.73 12.19,4.73C14.03,4.73 15.6,5.33 16.8,6.39L19.06,4.13C17.02,2.34 14.68,1.5 12.19,1.5C6.54,1.5 2,6.48 2,12C2,17.52 6.54,22.5 12.19,22.5C17.43,22.5 21.5,18.84 21.5,12.33C21.5,11.76 21.45,11.43 21.35,11.1Z"/>
    </svg>
  );
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    // This should not happen if the provider is set up correctly.
    return <div>Auth context is not available.</div>
  }

  const { login, signup, loginWithGoogle } = authContext;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // Mock login: In a real app, you'd fetch the user from a DB.
        // For demo, we assume any saved user can log in if the email matches.
        const storedUser = JSON.parse(localStorage.getItem('bantu-user') || '{}');
        if (storedUser.email === email) {
          login(storedUser);
          router.push('/dashboard');
        } else {
          setError('Invalid email or password.');
        }
      } else {
        // Mock signup
        if(!name || !email || !password) {
            setError('Please fill all fields');
            return;
        }
        signup({ email, name });
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };
  
  const handleGoogleSignIn = () => {
    loginWithGoogle();
    router.push('/dashboard');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
          <CardDescription>
            {isLogin ? 'Enter your credentials to access your account' : 'Enter your information to create an account'}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            {!isLogin && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              {isLogin ? 'Login' : 'Create account'}
            </Button>
          </form>
           <div className="relative">
             <div className="absolute inset-0 flex items-center">
               <span className="w-full border-t" />
             </div>
             <div className="relative flex justify-center text-xs uppercase">
               <span className="bg-background px-2 text-muted-foreground">
                 Or
               </span>
             </div>
           </div>
           <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
             <GoogleIcon className="mr-2 h-4 w-4" />
             Continue with Google
           </Button>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => { setIsLogin(!isLogin); setError('')} } className="underline ml-1 font-semibold text-primary text-base">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
