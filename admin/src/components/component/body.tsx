/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yyVlPIF138j
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Tabs } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"

export default function Component() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all" />
          <Card x-chunk="dashboard-06-chunk-0" />
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Payments</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                View and manage all payments made by your customers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>$250.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Paid</Badge>
                    </TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>2023-04-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>$150.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Pending</Badge>
                    </TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell>2023-05-01</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Michael Johnson</TableCell>
                    <TableCell>$350.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Unpaid</Badge>
                    </TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell>2023-06-10</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV004</TableCell>
                    <TableCell>Emily Davis</TableCell>
                    <TableCell>$450.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Paid</Badge>
                    </TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell>2023-07-01</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV005</TableCell>
                    <TableCell>David Wilson</TableCell>
                    <TableCell>$550.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">Paid</Badge>
                    </TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell>2023-08-01</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> payments
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  )
}