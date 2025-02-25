"use client";

import Image, { StaticImageData } from "next/image";
import styles from "./style.module.css";
import { useTransform, motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaIndustry } from "react-icons/fa";
import Modal from "../ui/Modal"; // Import the Modal component

interface CardProps {
  i: number;
  title: string;
  description: string;
  src: StaticImageData;
  url: string;
  color: string;
  expertise: string;
  icon: string;
  progress: any;
  range: number[];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({
  i,
  title,
  description,
  src,
  url,
  color,
  expertise,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isModalOpen]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-1vh + ${i * 12}px)`,
        }}
        className={styles.card}
      >
        <div className={styles.body}>
          <div className={styles.imageContainer}>
            <div className={styles.expertiseContainer}>
              <FaIndustry className="text-white flex items-center justify-end text-center z-50" size={24} />
              <span
                style={{
                  backgroundColor: color,
                }}
                className="absolute rounded-b-3xl pl-4 rounded-l-none font-montserrat w-60 top-0 left-0 flex h-40 items-center justify-center z-30"
              >
                {expertise}
              </span>
            </div>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={src} alt="image" />
            </motion.div>
          </div>
          <div className={styles.description}>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>
              <a href={url} target="_blank" rel="noopener noreferrer">
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        </div>
        <button
          ref={buttonRef}
          onClick={handleModalOpen}
          className={styles.plusButton}
        >
          +
        </button>
      </motion.div>

      {isModalOpen && (
        <Modal
          image={src}
          title={title}
          firstname="First Name"
          secondname="Second Name"
          description={description}
          items={[]} // Replace with actual items if available
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Card;
