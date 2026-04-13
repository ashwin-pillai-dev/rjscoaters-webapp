'use client'
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';
import styles from './EmblaCarousel.module.css';

type Slide = {
    title: string;
    src: string;
    desc: string
};

type PropType = {
    slides: Slide[];
    options?: any;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const autoplayOptions = {
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter:true
    }
    const { slides, options } = props;
    const [emblaRef] = useEmblaCarousel(options,[Autoplay(autoplayOptions)]);

    return (
        <div className={styles.embla}>
            <div className={styles['embla__viewport']} ref={emblaRef}>
                <div className={styles['embla__container']}>
                    {slides.map((slide, index) => (
                        <div className={`${styles['embla__slide']}`} key={index}>

                            <section className="bg-white dark:bg-gray-900 max-w-screen-xl">
                                <div className="grid max-w-screen-xl px-8  mx-auto lg:gap-20 xl:gap-0 lg:py-2 lg:grid-cols-12">
                                    <div className="mr-auto place-self-center bg-red lg:col-span-7">
                                        <h1 className="max-w-2xl text-primary-700 mb-2 text-4xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl dark:text-white">{slide.title}</h1>
                                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-4 md:text-md lg:text-xl dark:text-gray-400">{slide.desc}</p>
                                    </div>
                                    <div className={`hidden lg:mt-0 lg:col-span-5 lg:flex lg:items-end lg:justify-center  h-96 }`}>
                                       
                                            <Image
                                                src={slide.src}
                                                alt='banner'
                                                height={500}
                                                width={500}

                                            />
                             

                                    </div>
                                </div>
                            </section>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
