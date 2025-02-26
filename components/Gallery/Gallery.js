"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export const Gallery = ({ columns = 5, items = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const columnWidth = 100 / columns;
    const transitionDuration = 2000;
    const intervalDuration = 3000;
    const imageSize = 120; // Taille des images (modifiable)

    // Référence avec copie des éléments pour l'effet de boucle
    const itemsRef = useRef([]);
    useEffect(() => {
        itemsRef.current = [...items, ...items.slice(0, columns)];
    }, [items, columns]);

    // Effet de défilement automatique
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex === items.length) {
                    setTimeout(() => {
                        setCurrentIndex(0);
                    }, transitionDuration);
                    return prevIndex + 1;
                }
                return prevIndex + 1;
            });
        }, intervalDuration);
        return () => clearInterval(interval);
    }, [items.length]);

    return (
        <div className="relative overflow-hidden max-w-5xl mx-auto" id="technologies">
            <div
                className="flex transition-transform ease-in-out"
                style={{
                    transform: `translateX(-${currentIndex * columnWidth}%)`,
                    transitionDuration: currentIndex === 0 ? '0ms' : `${transitionDuration}ms`
                }}
            >
                {itemsRef.current.map((item, index) => (
                    <div 
                        key={index} 
                        style={{ width: `${columnWidth}%` }} 
                        className="flex-shrink-0 flex justify-center items-center p-2"
                    >
                        <Image 
                            src={item.attributes.url}
                            height={imageSize}
                            width={imageSize}
                            alt={item.attributes.alt || "Gallery image"}
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
