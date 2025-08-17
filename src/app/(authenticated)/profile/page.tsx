"use client";

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Edit } from 'lucide-react';

const enrolledCourses = [
  "Basic Finances",
  "Workplace English",
  "Essential Maths",
  "World Geography",
  "General Science",
];

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50),
  password: z.string().optional().refine(val => val === '' || val === undefined || val.length >= 6, {
    message: "Password must be at least 6 characters.",
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: authContext?.user?.name || '',
      password: '',
    },
  });
  
  if (!authContext || !authContext.user) {
    return <div>Loading...</div>;
  }
  
  const { user, logout, updateUserName, updateUserPassword } = authContext;

  const handleLogout = async () => {
    if(logout) {
      await logout();
      router.push('/auth');
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      if (data.name !== user.name) {
        await updateUserName(data.name);
      }
      if (data.password) {
        await updateUserPassword(data.password);
      }
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
      setIsDialogOpen(false);
      form.reset({ name: data.name, password: '' });
    } catch (error) {
       let errorMessage = 'An unexpected error occurred.';
       if (error instanceof Error) {
         errorMessage = error.message;
       }
       console.error(error);
       form.setError("root", { message: errorMessage });
    }
  };

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : '');

  return (
    <div className="py-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold font-headline text-primary">User Profile</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
      </header>

      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-3xl">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl font-headline">{user.name || 'User'}</CardTitle>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Leave blank to keep the same" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.formState.errors.root && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
                    )}
                    <DialogFooter>
                       <DialogClose asChild>
                         <Button type="button" variant="secondary">Cancel</Button>
                       </DialogClose>
                       <Button type="submit" disabled={form.formState.isSubmitting}>
                         {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
                       </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Button onClick={handleLogout}>Logout</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {enrolledCourses.map((course) => (
                <Badge key={course} variant="secondary" className="text-base px-3 py-1">
                  {course}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
