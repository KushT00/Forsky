
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"
import { Badge } from "../ui/badge"

export function Cart() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1 py-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/20 px-4 py-3 font-medium">Items in Cart</div>
              <div className="divide-y">
                <div className="grid grid-cols-[80px_1fr_80px_80px] items-center px-4 py-3 gap-4">
                  <img
                    src="/placeholder.svg"
                    width={64}
                    height={64}
                    alt="Product Image"
                    className="rounded-md"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="font-medium">Glimmer Lamps</h3>
                    <p className="text-muted-foreground text-sm">
                      60% combed ringspun cotton/40% polyester jersey tee.
                    </p>
                    <Badge variant='secondary'>hello</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>2</span>
                    <Button variant="outline" size="icon">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="font-medium">$120.00</div>
                </div>
                <div className="grid grid-cols-[80px_1fr_80px_80px] items-center px-4 py-3 gap-4">
                  <img
                    src="/placeholder.svg"
                    width={64}
                    height={64}
                    alt="Product Image"
                    className="rounded-md"
                    style={{ aspectRatio: "64/64", objectFit: "cover" }}
                  />
                  <div>
                    <h3 className="font-medium">Aqua Filters</h3>
                    <p className="text-muted-foreground text-sm">Water filtration system for your home.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MinusIcon className="h-4 w-4" />
                    </Button>
                    <span>1</span>
                    <Button variant="outline" size="icon">
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="font-medium">$49.00</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <Card>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>$169.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>$5.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span>$15.90</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between font-bold">
                  <span>Total</span>
                  <span>$189.90</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Proceed to Checkout</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <footer className="bg-muted/40 py-6 px-4 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-muted-foreground text-sm">&copy; 2024 Acme Store. All rights reserved.</p>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Shipping
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Returns
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function MinusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}



function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}
