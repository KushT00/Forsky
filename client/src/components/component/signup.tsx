import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRouter } from 'next/router';
import Link from "next/link";
import { Navigate } from 'react-router-dom';
import signupimg from '../../assets/signupImg.png'
import img from '../../assets/loose-diamond.jpg'

export function Signup() {
  const [formData, setFormData] = useState({
    name: '',

    email: '',
    password: '',
    confirmpassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [redirect, setRedirect] = useState(false); // State to handle redirect

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'customer',
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Use the error message from the API response
        throw new Error(responseData.error || 'Failed to create user');
      }

      setSuccess('User created successfully');
      setError('');
      setRedirect(true); // Trigger redirect on success
    } catch (err: unknown) {
      setError(err.message || 'An error occurred');
      setSuccess('');
    }
  };

  if (redirect) {
    return <Navigate to="/" replace />; // Navigate to homepage on success
  }


  return (
    <div className="grid w-full min-h-[100dvh] ">
      <div className="flex items-center bg-cover"
        style={{
          backgroundImage: `url(${signupimg})`,
          backgroundRepeat: 'no-repeat',

        }}
      >
        <div className="mx-auto w-full max-w-md rounded-lg p-6 sm:p-8 relative z-10"
          style={{
            background: 'rgb(140,182,230,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
          <div className="space-y-4 text-center">
            <h1 className="text-xl font-bold">Sign Up for Diamond Delight</h1>
            {/* <p className="text-muted-foreground">Create your account to access our exquisite diamond collection.</p> */}
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmpassword">Confirm Password</Label>
              </div>
              <Input
                id="confirmpassword"
                type="password"
                required
                value={formData.confirmpassword}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>

          {error && <div className="mt-4 text-red-500">{error}</div>}
          {success && <div className="mt-4 text-green-500">{success}</div>}

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline" prefetch={false}>
              Login
            </Link>
          </div>
        </div>

      </div>
      
    </div>
  );
}
