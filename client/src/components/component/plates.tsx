import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface Plate {
    id: number;
    plate_id: string;
    size: string;
    diameter: string;
    thickness: string;
    carat_weight_ea: string;
    plate_type: string;
    material: string;
    price: string;
}

export default function AllPlates() {
    const [plates, setPlates] = useState<Plate[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/plates')
            .then((response) => response.json())
            .then((data) => setPlates(data))
            .catch((error) => console.error('Error fetching plate data:', error));
    }, []);

    // Map of plate types to image URLs
    const plateImages = {
        'CVD Plate': 'http://localhost:3000/uploads/cvd_plate.jpg',
        'Electronic Grade CVD': 'http://localhost:3000/uploads/electronic_grade.jpg',
        'Mechanical Grade CVD': 'http://localhost:3000/uploads/mechanical_grade.jpg',
        'Thermal Grade CVD': 'http://localhost:3000/uploads/thermal_grade.jpg',
        'Optical Grade CVD': 'http://localhost:3000/uploads/optical_grade.jpg',
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedTypes((prevSelectedTypes) =>
            prevSelectedTypes.includes(value)
                ? prevSelectedTypes.filter((type) => type !== value)
                : [...prevSelectedTypes, value]
        );
    };

    const filteredPlates = selectedTypes.length
        ? plates.filter((plate) => selectedTypes.includes(plate.plate_type))
        : plates;

    return (
        <div className="grid md:grid-cols-[200px_1fr] gap-8 p-4 md:p-8">
            <div className="grid gap-6">
                <Accordion type="single" collapsible defaultValue="categories">
                    <AccordionItem value="categories">
                        <AccordionTrigger className="text-lg font-medium">Categories</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center space-x-2">
                                    
                                    <input
                                        type="checkbox"
                                        value="CVD Plate"
                                        onChange={handleFilterChange}
                                        checked={selectedTypes.includes('CVD Plate')}
                                        className="form-checkbox"
                                    />
                                    <span>CVD Plate</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="Electronic Grade CVD"
                                        onChange={handleFilterChange}
                                        checked={selectedTypes.includes('Electronic Grade CVD')}
                                        className="form-checkbox"
                                    />
                                    <span>Electronic Grade CVD</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="Mechanical Grade CVD"
                                        onChange={handleFilterChange}
                                        checked={selectedTypes.includes('Mechanical Grade CVD')}
                                        className="form-checkbox"
                                    />
                                    <span>Mechanical Grade CVD</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="Thermal Grade CVD"
                                        onChange={handleFilterChange}
                                        checked={selectedTypes.includes('Thermal Grade CVD')}
                                        className="form-checkbox"
                                    />
                                    <span>Thermal Grade CVD</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value="Optical Grade CVD"
                                        onChange={handleFilterChange}
                                        checked={selectedTypes.includes('Optical Grade CVD')}
                                        className="form-checkbox"
                                    />
                                    <span>Optical Grade CVD</span>
                                </label>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {filteredPlates.map((plate) => (
                    <Link
                        key={plate.id}
                        to={`/plate/${plate.plate_id}`}
                        className="bg-background rounded-lg overflow-hidden shadow-sm h-[300px] md:h-[400px]"
                    >
                        <img
                            src={plateImages[plate.plate_type] || 'http://localhost:3000/uploads/default_plate.jpg'}
                            alt={`${plate.plate_type} Plate`}
                            width={300}
                            height={200}
                            className="w-full h-40 md:h-60 aspect-square object-cover"
                        />
                        <div className="p-3">
                            <h3 className="text-base font-medium">{plate.plate_type}</h3>
                            <p className="text-sm mt-1">Size: {plate.size} x {plate.size} mm</p>
                            <p className="text-sm">{plate.diameter ? `Diameter: ${plate.diameter}` : ''}</p>
                            <p className="text-sm">Carat Weight: {plate.carat_weight_ea}</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-primary font-medium">₹{plate.price}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
