"use client"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function NavbarLikes() {
    const [averageLike, setAverageLike] = useState(5);

    return (
        <div className="flex items-center justify-around ml-4">
            <div className="mr-2">
                Average likes: ({averageLike.toFixed(1)})
            </div>
            <Slider
                defaultValue={[5]}
                max={10}
                min={0}
                step={0.1}
                value={[averageLike]}
                onValueChange={(averageLike) => setAverageLike(averageLike[0])}
                className="mx-auto w-32"
            />
        </div>
    )
}
