import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

interface Products {
    product_id: number;
    name: string;
    description: string;
    price: number;
    category_name: string;
    stock_quantity: number;
    image: string[];
    sub_categories: string[];
}

export default function Productitems() {
    const [products, setProducts] = useState<Products[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); // Default price range

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                // Update price range based on fetched data
                const prices = data.map(product => product.price);
                const minPrice = Math.min(...prices);
                const maxPrice = Math.max(...prices);
                setPriceRange([minPrice, maxPrice]);
            })
            .catch((error) => console.error("Error fetching product data:", error));
    }, []);

    const handleFilterChange = (category: string, subCategory: string) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (!updatedFilters[category]) {
                updatedFilters[category] = [];
            }

            if (updatedFilters[category].includes(subCategory)) {
                updatedFilters[category] = updatedFilters[category].filter((sc) => sc !== subCategory);
            } else {
                updatedFilters[category].push(subCategory);
            }

            return updatedFilters;
        });
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = Number(event.target.value);
        setPriceRange((prevRange) => {
            const newRange = [...prevRange] as [number, number];
            newRange[index] = value;
            return newRange;
        });
    };

    useEffect(() => {
        let filtered = products;
        
        // Check if there are any selected filters
        const hasSelectedFilters = Object.values(selectedFilters).some(subCategories => subCategories.length > 0);
        
        if (hasSelectedFilters) {
            filtered = filtered.filter(product => {
                // Check if the product's category has selected subcategories
                return Object.entries(selectedFilters).some(([category, subCategories]) => {
                    if (subCategories.length === 0) {
                        return false; // Skip this category if no subcategories are selected
                    }
                    return product.category_name === category && subCategories.some(sub => product.sub_categories.includes(sub));
                });
            });
        }

        // Filter by price range
        filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
    
        setFilteredProducts(filtered);
    }, [selectedFilters, products, priceRange]);
    
    const categories = products.reduce<Record<string, string[]>>((acc, product) => {
        if (!acc[product.category_name]) {
            acc[product.category_name] = [];
        }
        product.sub_categories.forEach((subCategory) => {
            if (!acc[product.category_name].includes(subCategory)) {
                acc[product.category_name].push(subCategory);
            }
        });
        return acc;
    }, {});

    return (
        <div className="grid md:grid-cols-[200px_1fr] gap-8 p-4 md:p-8">
            <div className="grid gap-6">
                <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                        <AccordionTrigger className="text-lg font-medium">Categories</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-4">
                                {Object.entries(categories).map(([categoryName, subCategories]) => (
                                    <div key={categoryName}>
                                        <h3 className="text-base font-medium">{categoryName}</h3>
                                        <div className="grid gap-2 mt-2">
                                            {subCategories.map((subCategory) => (
                                                <Label key={subCategory} className="flex items-center gap-2 font-normal">
                                                    <Checkbox
                                                        checked={selectedFilters[categoryName]?.includes(subCategory) || false}
                                                        onCheckedChange={() => handleFilterChange(categoryName, subCategory)}
                                                    />
                                                    {subCategory}
                                                </Label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="mt-6">
                    <h3 className="text-lg font-medium">Price Range</h3>
                    <div className="flex items-center gap-4 mt-2">
                        <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="border p-1 rounded w-20"
                        />
                        
                        
                        <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="border p-1 rounded w-20"
                        />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <Link
                        key={product.product_id}
                        to={`/product/${product.product_id}`}
                        className="bg-background rounded-lg overflow-hidden shadow-md h-[300px] md:h-[350px]">
                        <img
                            src={product.image && product.image[0] ? `http://localhost:3000/uploads/${product.image[0]}` : 'http://localhost:3000/uploads/DefaultDiamond.jpg'}
                            alt={`${product.name}`}
                            width={300}
                            height={200}
                            className="w-full h-40 md:h-60 aspect-square object-cover"
                        />
                        <div className="p-3 ">
                            <h3 className="text-base font-medium">{product.name}</h3>
                            <h3 className="text-base font-small">{product.description}</h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-primary font-medium">
                                    {product.price ? `₹${product.price}` : "Price on Request"}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
