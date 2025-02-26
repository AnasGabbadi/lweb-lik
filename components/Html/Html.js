"use client";
import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";
import Image from 'next/image';

export const Html = ({ block }) => {
  if (block === "html-col-1") {
    return (
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
              <TimelineDot variant="outlined" sx={{ bgcolor: "#387478" }} />
              <TimelineConnector />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" style={{ color: "#629584", fontSize: "xx-large", fontWeight: "bold"}}>
              PLANIFICATION
            </Typography>
            <Typography style={{ color: "#E2F1E7"}}>Comprendre ce que vous voulez sur votre site Web et comment planter pour le mettre en œuvre.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
              <TimelineDot variant="outlined" sx={{ bgcolor: "#629584" }} />
              <TimelineConnector />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" style={{ color: "#629584", fontSize: "xx-large", fontWeight: "bold"}}>
              CONCEPTION
            </Typography>
            <Typography style={{ color: "#E2F1E7"}}>Nous allons créer une conception de site Web magnifique et peu coûteuse pour votre projet de marketing créatif.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
              <TimelineDot variant="outlined" sx={{ bgcolor: "#E2F1E7" }} />
              <TimelineConnector />
            <TimelineConnector  />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" style={{ color: "#629584", fontSize: "xx-large", fontWeight: "bold"}}>
              DÉVELOPPEMENT
            </Typography>
            <Typography style={{ color: "#E2F1E7"}}>Nous développons des systèmes de gestion de contenu pour les clients qui ont besoin de plus de base.</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector  />
              <TimelineDot variant="outlined" sx={{ bgcolor: "#387478" }} />
              <TimelineConnector />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" style={{ color: "#629584", fontSize: "xx-large", fontWeight: "bold"}}>
              LANCEMENT
            </Typography>
            <Typography style={{ color: "#E2F1E7"}}>Après des tests réussis, le produit est livré/déployé au client pour utilisation</Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector  />
              <TimelineDot variant="outlined" sx={{ bgcolor: "#629584" }} />
              <TimelineConnector />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" style={{ color: "#629584", fontSize: "xx-large", fontWeight: "bold"}}>
              MAINTENANCE
            </Typography>
            <Typography style={{ color: "#E2F1E7"}}>{`Il s'agit d'une étape importante qui garantit que votre site fonctionne efficacement tout le temps.`}</Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );
  } else {
    const Slide = ({ slide, index, current, handleSlideClick }) => {
      const slideRef = useRef(null);
      const xRef = useRef(0);
      const yRef = useRef(0);
      const frameRef = useRef();

      useEffect(() => {
        const animate = () => {
          if (!slideRef.current) return;
          const x = xRef.current;
          const y = yRef.current;
          slideRef.current.style.setProperty("--x", `${x}px`);
          slideRef.current.style.setProperty("--y", `${y}px`);
          frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
        };
      }, []);

      const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
      };

      const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
      };

      const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
      };

      const { src, button, title } = slide;

      return (
        <div className="[perspective:1200px] [transform-style:preserve-3d]">
          <li
            ref={slideRef}
            className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
            onClick={() => handleSlideClick(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform:
                current !== index
                  ? "scale(0.98) rotateX(8deg)"
                  : "scale(1) rotateX(0deg)",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformOrigin: "bottom",
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
              style={{
                transform:
                  current === index
                    ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                    : "none",
              }}
            >
              <Image   
                className="absolute inset-0 w-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                style={{
                  opacity: current === index ? 1 : 0.5,
                }}
                alt={title}
                src={src}
                onLoad={imageLoaded}
                loading="eager"
                decoding="sync"
              />
              {current === index && (
                <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
              )}
            </div>

            <article
              className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
                current === index ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <h2 className="text-lg md:text-2xl lg:text-4xl font-semibold  relative">
                {title}
              </h2>
              <div className="flex justify-center">
                <button className="mt-6  px-4 py-2 w-fit mx-auto sm:text-sm text-black bg-white h-12 border border-transparent text-xs flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                  {button}
                </button>
              </div>
            </article>
          </li>
        </div>
      );
    };

    const CarouselControl = ({
      type,
      title,
      handleClick,
    }) => {
      return (
        <button
          className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
            type === "previous" ? "rotate-180" : ""
          }`}
          title={title}
          onClick={handleClick}
        >
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
      );
    };

    const Carousel = ({ slides }) => {
      const [current, setCurrent] = useState(0);

      const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
      };

      const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
      };

      const handleSlideClick = (index) => {
        if (current !== index) {
          setCurrent(index);
        }
      };

      const id = useId();

      return (
        <div
          className="relative w-[70vmin] h-[70vmin] mx-auto"
          aria-labelledby={`carousel-heading-${id}`}
        >
          <ul
            className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${current * (100 / slides.length)}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <Slide
                key={index}
                slide={slide}
                index={index}
                current={current}
                handleSlideClick={handleSlideClick}
              />
            ))}
          </ul>

          <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
            <CarouselControl
              type="previous"
              title="Go to previous slide"
              handleClick={handlePreviousClick}
            />

            <CarouselControl
              type="next"
              title="Go to next slide"
              handleClick={handleNextClick}
            />
          </div>
        </div>
      );
    };
    const slides = [
      { src: "/Voyage.png", title: "Projet 1", button: "Découvrir" },
      { src: "/InfoAffiliate.png", title: "Projet 2", button: "Découvrir" },
      { src: "/centredentaire.png", title: "Projet 3", button: "Découvrir" },
      { src: "/hotel.png", title: "Projet 4", button: "Découvrir" },
      { src: "/foodMarocaine.png", title: "Projet 5", button: "Découvrir" },
      { src: "/hawtaPc.png", title: "Projet 6", button: "Découvrir" },
      { src: "/crmProject.png", title: "Projet 7", button: "Découvrir" },
      { src: "/tasmim.png", title: "Projet 8", button: "Découvrir" },
    ];
    
    return <Carousel slides={slides} />;
  }
};
