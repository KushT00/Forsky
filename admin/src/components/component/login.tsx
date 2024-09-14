import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginImg from '../../assets/login-removebg-preview.png'
import Banner from '../../assets/loose-diamond.jpg'

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      const data = await response.json();
      // Store role and token in local storage
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);

      // Role-based navigation
      if (data.role === "customer") {
        window.location.href = "/"; // Navigate to home page
      } else if (data.role === "admin") {
        window.location.href = "/dashboard"; // Navigate to dashboard
      } else if (data.role === "staff") {
        window.location.href = "/dashboard"; // Navigate to dashboard
      }

    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="grid w-full min-h-[100dvh] lg:grid-cols-2">
  <div
    className="hidden lg:flex items-center justify-center bg-cover bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] relative z-0"
    style={{
      backgroundImage: `url(${Banner})`,
      backgroundRepeat: 'no-repeat',
    }}
  />
  <div className="relative flex items-center justify-center p-0 sm:p-8">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat z-20"
      style={{
        backgroundImage: `url(${LoginImg})`,
        backgroundColor: "rgb(234,239,245,0.8)"
      }}
    />
    <div
      className="relative mx-auto w-full max-w-md rounded-lg bg-white p-6 sm:p-8 z-30"
      style={{
        background: 'rgb(44,42,52,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.3)'
      }}
    >
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold">Login </h1>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleLogin}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-sm font-medium text-primary hover:underline"
              prefetch={false}
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
          prefetch={false}
        >
          Sign Up
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}
