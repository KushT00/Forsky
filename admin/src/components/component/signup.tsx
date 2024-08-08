
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Signup() {
  return (
    <div className="grid w-full min-h-[100dvh] lg:grid-cols-2">
      <div className="flex items-center justify-center bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-8">
        <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8 relative z-10">
          <div className="space-y-4 text-center">
            <h1 className="text-xl font-bold">Sign Up for Diamond Delight</h1>
            {/* <p className="text-muted-foreground">Create your account to access our exquisite diamond collection.</p> */}
          </div>
          <form className="mt-6 space-y-4">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div>
      <Label htmlFor="name">Name</Label>
      <Input id="name" type="text" placeholder="John Doe" required />
    </div>
    <div>
      <Label htmlFor="phone">Phone Number</Label>
      <Input id="phone" type="tel" placeholder="123-456-7890" required />
    </div>
  </div>
  <div>
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="m@example.com" required />
  </div>
  <div>
    <div className="flex items-center justify-between">
      <Label htmlFor="password">Password</Label>
    </div>
    <Input id="password" type="password"  required />
  </div>
  <div>
    <div className="flex items-center justify-between">
      <Label htmlFor="password">Confirm Password</Label>
    </div>
    <Input id="confirmpassword" type="password" required />
  </div>
  <Button type="submit" className="w-full">
    Sign Up
  </Button>
</form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="#" className="font-medium text-primary hover:underline" prefetch={false}>
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-[url('/diamonds.jpg')] bg-cover bg-center lg:block" />
    </div>
  )
}
