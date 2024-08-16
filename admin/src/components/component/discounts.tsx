import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Key, useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs } from "@radix-ui/react-tabs";
import { PlusIcon, FilePenIcon, TrashIcon, SearchIcon, TruckIcon, CreditCardIcon, LayoutGridIcon, ListIcon, MenuIcon, Package2Icon, PackageIcon, ShoppingCartIcon, UsersIcon, SettingsIcon, TagIcon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"


// Define the discount interface
interface DISCOUNTS {
  discount_id: Key;
  code: string;
  description: string;
  discount_percentage: number;
}

export function Discounts() {
  const [discounts, setDiscounts] = useState<DISCOUNTS[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newDiscount, setNewDiscount] = useState({ code: "", discount_percentage: "", description: "" });
  const [editDiscount, setEditDiscount] = useState<DISCOUNTS | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/discounts")
      .then((response) => response.json())
      .then((data) => setDiscounts(data))
      .catch((error) => console.error("Error fetching discounts:", error));
  }, []);

  

const handleAddDiscount = () => {
    fetch('http://localhost:3000/api/discounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: newDiscount.code,
        discount_percentage: Number(newDiscount.discount_percentage), // Ensure percentage is a number
        description: newDiscount.description
      }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`Failed to add discount: ${errorData.message || 'Unknown error'}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data && data.discount_id) {
          setDiscounts([...discounts, data]); // Add the new discount to the list
          setOpenAddDialog(false);
        } else {
          console.error('Invalid data received:', data);
        }
      })
      .catch(error => {
        console.error('Error adding discount:', error);
        // Optionally show an error message to the user
        alert('An error occurred while adding the discount. Please try again.');
      });
  };

  const handleEditDiscount = () => {
    if (editDiscount === null) {
      console.error('No discount data available to edit');
      return;
    }
  
    fetch(`http://localhost:3000/api/discounts/${editDiscount.discount_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: editDiscount.code,
        discount_percentage: Number(editDiscount.discount_percentage), // Ensure percentage is a number
        description: editDiscount.description
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update discount');
        }
        return response.json();
      })
      .then(data => {
        // Ensure that data received is valid and matches DISCOUNTS type
        if (data && data.discount_id) {
          // Update the state with the edited discount
          setDiscounts(discounts.map(discount => 
            discount.discount_id === editDiscount.discount_id ? data : discount
          ));
          setOpenEditDialog(false);
        } else {
          console.error('Invalid data received:', data);
        }
      })
      .catch(error => console.error('Error updating discount:', error));
  };
  
  
  

  const handleDeleteDiscount = (discount_id: Key) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      fetch(`http://localhost:3000/api/discounts/${discount_id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete discount");
          }
          setDiscounts(discounts.filter((discount) => discount.discount_id !== discount_id));
        })
        .catch((error) => console.error("Error deleting discount:", error));
    }
  };

  const openEditDialogWithDiscount = (discount: DISCOUNTS) => {
    setEditDiscount(discount);
    setOpenEditDialog(true);
  };
  const [role, setRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Retrieve the role from local storage
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar and header code */}

      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
      <TooltipProvider>
        <Link
          href=""
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          prefetch={false}
        >
          <Package2Icon className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        
        {role === "admin" && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <LayoutGridIcon className="h-5 w-5" />
                  <span className="sr-only">Overview</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Overview</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/orders"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/users"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <UsersIcon className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/payments"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <CreditCardIcon className="h-5 w-5" />
                  <span className="sr-only">Payments</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Payments</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/shipping"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <TruckIcon className="h-5 w-5" />
                  <span className="sr-only">Shipping</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Shipping</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/discounts"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <TagIcon className="mr-1.5 h-4 w-4" />
                  <span className="sr-only">Discounts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Discounts</TooltipContent>
            </Tooltip>
          </>
        )}

        {(role === "admin" || role === "staff") && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/products"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <PackageIcon className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/categories"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <ListIcon className="h-5 w-5" />
                  <span className="sr-only">Categories</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Categories</TooltipContent>
            </Tooltip>
          </>
        )}
      </TooltipProvider>
    </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  prefetch={false}
                >
                  <SettingsIcon className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">

      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href=""
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  prefetch={false}
                >
                  <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link href="/dashboard" className="flex items-center gap-4 px-2.5 text-foreground" prefetch={false}>
                  <LayoutGridIcon className="h-5 w-5" />
                  Overview
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="/users"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <UsersIcon className="h-5 w-5" />
                  Users
                </Link>

                <Link
                  href="/products"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <PackageIcon className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ListIcon className="h-5 w-5" />
                  Categories
                </Link>
                <Link
                  href="/payments"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <CreditCardIcon className="h-5 w-5" />
                  Payments
                </Link>

                <Link
                  href="/shipping"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <TruckIcon className="h-5 w-5" />
                  Shipping
                </Link>

              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard" prefetch={false}>
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <img
                  src="/placeholder.svg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                  style={{ aspectRatio: "36/36", objectFit: "cover" }}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all" />
        <Card x-chunk="dashboard-06-chunk-1">
          <CardHeader>
            <CardTitle>Discounts</CardTitle>
            <CardDescription>Manage your discounts here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Discounts</h2>
                <Button size="sm" onClick={() => setOpenAddDialog(true)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Discount
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Discount ID</TableHead>
                    <TableHead>Code</TableHead>
                   
                    <TableHead>Discount Percentage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {discounts.map((dis) => (
                    <TableRow key={dis.discount_id}>
                      {/* <TableCell>{dis.discount_id}</TableCell> */}
                      <TableCell className="font-medium">{dis.code}</TableCell>
                      <TableCell>{dis.description}</TableCell>
                      <TableCell>{dis.discount_percentage}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="ghost" onClick={() => openEditDialogWithDiscount(dis)}>
                            <FilePenIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDeleteDiscount(dis.discount_id)}>
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Add Discount Dialog */}
        <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Discount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Discount Code"
                value={newDiscount.code}
                onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Discount Percentage"
                value={newDiscount.discount_percentage}
                onChange={(e) => setNewDiscount({ ...newDiscount, discount_percentage: e.target.value })}
              />
              <Textarea
                placeholder="Discount Description"
                value={newDiscount.description}
                onChange={(e) => setNewDiscount({ ...newDiscount, description: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleAddDiscount}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Discount Dialog */}
        <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Discount</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Discount Code"
                value={editDiscount?.code || ""}
                onChange={(e) => setEditDiscount((prev) => prev ? { ...prev, code: e.target.value } : null)}
              />
              <Input
                type="number"
                placeholder="Discount Percentage"
                value={editDiscount?.discount_percentage || ""}
                onChange={(e) => setEditDiscount(prev => prev ? { ...prev, discount_percentage: e.target.value } : null)}
              />
              <Textarea
                placeholder="Discount Description"
                value={editDiscount?.description || ""}
                onChange={(e) => setEditDiscount((prev) => prev ? { ...prev, description: e.target.value } : null)}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleEditDiscount}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      </div>
    </div>
  );
}




