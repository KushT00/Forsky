/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VgRvGyH9Y7r
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"
import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

interface Diamonds {
    diamond_id: number;
    shape: string;
    color: string;
    clarity: string;
    certificate: 'GIA' | 'IGI' | 'HRD' | 'SGL' | 'FM' | 'GCAL' | 'GSI' | 'Other';
    fluorescence?: string;
    make?: string;
    cut?: string;
    polish?: string;
    symmetry?: string;
    table_percentage: number;
    depth_percentage: number;
    length_mm: number;
    width_mm: number;
    depth_mm: number;
    price: number;
    images:string[]
  }

export default function Items() {
    // const navigate = useNavigate();
    
    const [checkedRings, setCheckedRings] = useState({
        men: false,
        women: false,
        engagementCoupleRing: false,
        weddingCoupleRing: false,
    });
    const [diamonds, setDiamonds] = useState<Diamonds[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/diamonds")
            .then((response) => response.json())
            .then((data) => setDiamonds(data))
            .catch((error) => console.error("Error fetching diamond data:", error));
    }, []);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#rings") {
            setCheckedRings({
                men: true,
                women: true,
                engagementCoupleRing: true,
                weddingCoupleRing: true,
            });
        }
    }, []);
    return (
        <div className="grid md:grid-cols-[200px_1fr] gap-4 md:p-8">
            <div className="grid gap-6">
                <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                        <AccordionTrigger className="text-lg font-medium">Categories</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="text-base font-medium">Rings</h3>
                                    <div className="grid gap-2 mt-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox checked={checkedRings.men} onChange={() => setCheckedRings((prev) => ({ ...prev, men: !prev.men }))} />
                                            Men
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox checked={checkedRings.women} onChange={() => setCheckedRings((prev) => ({ ...prev, women: !prev.women }))} />
                                            Women
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox checked={checkedRings.engagementCoupleRing} onChange={() => setCheckedRings((prev) => ({ ...prev, engagementCoupleRing: !prev.engagementCoupleRing }))} />
                                            Engagement Couple Ring
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox checked={checkedRings.weddingCoupleRing} onChange={() => setCheckedRings((prev) => ({ ...prev, weddingCoupleRing: !prev.weddingCoupleRing }))} />
                                            Wedding Couple Ring
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium">Bracelet</h3>
                                    <div className="grid gap-2 mt-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Men
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Women
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium">Earrings</h3>
                                    <div className="grid gap-2 mt-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Stud
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Hoop
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Dangle
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium">Necklaces</h3>
                                    <div className="grid gap-2 mt-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Chain
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Pendant
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Choker
                                        </Label>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-base font-medium">Pendants</h3>
                                    <div className="grid gap-2 mt-2">
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Diamond
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Gemstone
                                        </Label>
                                        <Label className="flex items-center gap-2 font-normal">
                                            <Checkbox />
                                            Gold
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 ">
            {diamonds.map((diamond) => (
                <Link
                    key={diamond.diamond_id}
                    to={`/diamond/${diamond.diamond_id}`}
                    className="bg-background rounded-lg overflow-hidden shadow-sm h-[300px] md:h-[400px]">
                    <img
                        src={diamond.images && diamond.images[0] ? `http://localhost:3000/uploads/${diamond.images[0]}` : 'http://localhost:3000/uploads/loose-diamond.jpg'}
                        
                        alt={`${diamond.shape} Diamond`}
                        width={300}
                        height={200}
                        className="w-full h-40 md:h-60 aspect-square object-cover"
                    />
                    <div className="p-3">
                        <h3 className="text-base font-medium">{diamond.shape} Diamond</h3>
                        <p className="text-muted-foreground text-sm">Color: {diamond.color}</p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-primary font-medium">
                                {diamond.price ? `₹${diamond.price}` : "Price on Request"}
                            </span>
                            <Button size="icon" variant="ghost">
                                <HeartIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Link>
            ))}
                
            </div>
        </div>
    )
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}