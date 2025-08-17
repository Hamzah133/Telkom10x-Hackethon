"use client";

import { useContext } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const enrolledCourses = [
  "Basic Finances",
  "Workplace English",
  "Essential Maths",
  "World Geography",
  "General Science",
];

export default function ProfilePage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>;
  }
  
  const { user, logout } = authContext;

  const handleLogout = async () => {
    if(logout) {
      await logout();
      router.push('/auth');
    }
  }

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
          <CardContent>
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
