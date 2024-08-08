
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Login() {
  return (
    <div className="grid w-full min-h-[100dvh] lg:grid-cols-2">
      <div className="hidden bg-[url('/diamonds.jpg')] bg-cover bg-center lg:block" />
      <div className="flex items-center justify-center bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-8">
        <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8 relative z-10">
          <div className="space-y-2 text-center">
            <h1 className="text-xl font-bold">Login to Diamond Delight</h1>
            {/* <p className="text-muted-foreground">Access our exquisite diamond collection.</p> */}
          </div>
          <form className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm font-medium text-primary hover:underline" prefetch={false}>
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline" prefetch={false}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
