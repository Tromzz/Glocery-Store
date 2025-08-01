import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

function Slider({ sliderList }) {
    return (
        <Carousel>
            <CarouselContent>
                {sliderList.map((slider, index)=>(
                    <CarouselItem key={index}>
                        <Image src={slider.attributes?.url || '/placeholder-slider.jpg'}
                        width={1000}
                        height={400}
                        alt='slider'
                        className='w-full h-[200px] md:h-[520px] object-cover rounded-2xl'
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
        </Carousel>

    )
}

export default Slider