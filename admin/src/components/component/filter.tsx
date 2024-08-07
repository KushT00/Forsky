import { useState } from "react";
  import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  } from "@/components/ui/accordion";
  import { Label } from "@/components/ui/label";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Card, CardHeader, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";


  interface Filters {
    shape: string[];
    color: string[];
    clarity: string[];
    certificate: string[];
    fluorescence: string[];
    make: string[];
    cut: string[];
    polish: string[];
    symmetry: string[];
    tablePercentage: [number, number];
    depthPercentage: [number, number];
    dimensions: {
      length: [number, number];
      width: [number, number];
      depth: [number, number];
    };
  }
  interface CardData {
    id: number;
    imageSrc: string;
    title: string;
    price: string;
  }
  const cardData: CardData[] = [
    {
      id: 1,
      imageSrc: "/placeholder.svg",
      title: "Diamond Necklace",
      price: "$2,999",
    },
    {
      id: 2,
      imageSrc: "/placeholder.svg",
      title: "Diamond Ring",
      price: "$1,499",
    },
    {
      id: 3,
      imageSrc: "/placeholder.svg",
      title: "Diamond Bracelet",
      price: "$2,199",
    },
    {
      id: 4,
      imageSrc: "/placeholder.svg",
      title: "Diamond Earrings",
      price: "$999",
    },
    {
      id: 5,
      imageSrc: "/placeholder.svg",
      title: "Diamond Pendant",
      price: "$1,299",
    },
  ];

  export function Filter() {

    const [selectedFilters, setSelectedFilters] = useState<Filters>({
      shape: [],
      color: [],
      clarity: [],
      certificate: [],
      fluorescence: [],
      make: [],
      cut: [],
      polish: [],
      symmetry: [],
      tablePercentage: [0, 100],
      depthPercentage: [0, 100],
      dimensions: {
        length: [0, 10],
        width: [0, 10],
        depth: [0, 10],
      },
    });

    const handleFilterChange = (type: keyof Filters, value: string) => {
      setSelectedFilters((prevFilters) => {
        const currentFilter = prevFilters[type] as string[]; // Type assertion

        // Proceed with the type assertion
        return {
          ...prevFilters,
          [type]: currentFilter.includes(value)
            ? currentFilter.filter((item) => item !== value)
            : [...currentFilter, value],
        };
      });
    };

    const handleRangeChange = (
      type: keyof Filters,
      value: [number, number] | Filters["dimensions"]
    ) => {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        [type]: value,
      }));
    };

    const applyFilters = () => {
      // Extract the selected filter values into an array
      const selectedOptions = [
        ...selectedFilters.shape,
        ...selectedFilters.color,
        ...selectedFilters.clarity,
        ...selectedFilters.certificate,
        ...selectedFilters.fluorescence,
        ...selectedFilters.make,
        ...selectedFilters.cut,
        ...selectedFilters.polish,
        ...selectedFilters.symmetry,
    //     Table Percentage: ${selectedFilters.tablePercentage[0]} - ${selectedFilters.tablePercentage[1]},
    //     Depth Percentage: ${selectedFilters.depthPercentage[0]} - ${selectedFilters.depthPercentage[1]},
    //     Dimensions: Length ${selectedFilters.dimensions.length[0]} - ${selectedFilters.dimensions.length[1]}, Width ${selectedFilters.dimensions.width[0]} - ${selectedFilters.dimensions.width[1]}, Depth ${selectedFilters.dimensions.depth[0]} - ${selectedFilters.dimensions.depth[1]}
    ];
    
      console.log('Selected Options:', selectedOptions);
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
        <div className="bg-background rounded-lg shadow-lg p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">Filter Diamonds</h2>
          <div className="grid gap-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="shape">
                <AccordionTrigger className="text-base">Shape</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {[
                      "Round",
                      "Princess",
                      "Cushion",
                      "Oval",
                      "Radiant",
                      "Emerald",
                    ].map((shape) => (
                      <Label
                        key={shape}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.shape.includes(shape)}
                          onCheckedChange={() => handleFilterChange("shape", shape)}
                        />
                        {shape}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="color">
                <AccordionTrigger className="text-base">Color</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["D", "E", "F", "G", "H", "I"].map((color) => (
                      <Label
                        key={color}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.color.includes(color)}
                          onCheckedChange={() => handleFilterChange("color", color)}
                        />
                        {color}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="clarity">
                <AccordionTrigger className="text-base">Clarity</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2"].map(
                      (clarity) => (
                        <Label
                          key={clarity}
                          className="flex items-center gap-2 font-normal"
                        >
                          <Checkbox
                            checked={selectedFilters.clarity.includes(clarity)}
                            onCheckedChange={() =>
                              handleFilterChange("clarity", clarity)
                            }
                          />
                          {clarity}
                        </Label>
                      )
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="certificate">
                <AccordionTrigger className="text-base">Certificate</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["IGI", "Non-certified"].map((certificate) => (
                      <Label
                        key={certificate}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.certificate.includes(
                            certificate
                          )}
                          onCheckedChange={() =>
                            handleFilterChange("certificate", certificate)
                          }
                        />
                        {certificate}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="fluorescence">
                <AccordionTrigger className="text-base">
                  Fluorescence
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["None", "Faint", "Medium"].map((fluorescence) => (
                      <Label
                        key={fluorescence}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.fluorescence.includes(
                            fluorescence
                          )}
                          onCheckedChange={() =>
                            handleFilterChange("fluorescence", fluorescence)
                          }
                        />
                        {fluorescence}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="make">
                <AccordionTrigger className="text-base">Make</AccordionTrigger>  <AccordionContent>
                <div className="grid gap-2">
                    {["Excellent"].map((make) => (
                      <Label
                        key={make}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.make.includes(make)}
                          onCheckedChange={() => handleFilterChange("make", make)}
                        />
                        {make}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="cut">
                <AccordionTrigger className="text-base">Cut</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["Excellent"].map((cut) => (
                      <Label
                        key={cut}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.cut.includes(cut)}
                          onCheckedChange={() => handleFilterChange("cut", cut)}
                        />
                        {cut}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="polish">
                <AccordionTrigger className="text-base">Polish</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["Excellent"].map((polish) => (
                      <Label
                        key={polish}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.polish.includes(polish)}
                          onCheckedChange={() => handleFilterChange("polish", polish)}
                        />
                        {polish}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="symmetry">
                <AccordionTrigger className="text-base">Symmetry</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {["Excellent"].map((symmetry) => (
                      <Label
                        key={symmetry}
                        className="flex items-center gap-2 font-normal"
                      >
                        <Checkbox
                          checked={selectedFilters.symmetry.includes(symmetry)}
                          onCheckedChange={() => handleFilterChange("symmetry", symmetry)}
                        />
                        {symmetry}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="table-percentage">
                <AccordionTrigger className="text-base">Table Percentage</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedFilters.tablePercentage[0]}
                      onChange={(e) => handleRangeChange("tablePercentage", [Number(e.target.value), selectedFilters.tablePercentage[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedFilters.tablePercentage[1]}
                      onChange={(e) => handleRangeChange("tablePercentage", [selectedFilters.tablePercentage[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="depth-percentage">
                <AccordionTrigger className="text-base">Depth Percentage</AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedFilters.depthPercentage[0]}
                      onChange={(e) => handleRangeChange("depthPercentage", [Number(e.target.value), selectedFilters.depthPercentage[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedFilters.depthPercentage[1]}
                      onChange={(e) => handleRangeChange("depthPercentage", [selectedFilters.depthPercentage[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button variant="secondary" onClick={applyFilters}>
  Apply Filter
</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {cardData.map((card) => (
    <Card key={card.id} className="w-[250px] h-[500px] sm:w-[350px] overflow-hidden">
      <CardHeader />
      <CardContent className="flex flex-col h-full">
        <div className="flex-grow flex flex-col">
          <img
            src={card.imageSrc}
            alt="Diamond product"
            className="w-full h-2/3 rounded-md object-cover"
          />
          <div className="flex flex-col justify-between p-2">
            <div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.price}</p>
            </div>
            <div className="flex items-center justify-between gap-1 mt-2">
              <Button variant="outline" size="icon">
                {/* <HeartIcon className="h-5 w-5" /> */}
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <Button>Buy Now</Button>
            </div>
          </div>
        </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  export default Filter;