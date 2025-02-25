"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GrAddCircle } from "react-icons/gr";
import Carousel from "../Carousel";
import { newscardcontent } from "../../Constants/index";
import Modal from "../../ui/Modal";

const NewsFeature: React.FC = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const handleOpenModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  return (
    <div className="h-screen p-6 mt-40 w-full max-w-screen-2xl">
      <div className="text-center mt-10">
        <h1 className="text-3xl font-montserrat">
          <span className="text-[#483d73]">Featured</span>{" "}
          <span className="text-red-600">News</span>
        </h1>
      </div>
      <div className="flex mt-10 h-full">
        <div className="relative w-1/3 flex flex-col h-auto group">
          <Image
            src={newscardcontent[0].image.src}
            alt={newscardcontent[0].title}
            height={400}
            width={400}
            className="w-full h-[82%] rounded-3xl"
          />
          <div
            className="absolute top-2 right-2 z-50 p-2 rounded-full cursor-pointer"
            onClick={() => handleOpenModal(0)}
          >
            <GrAddCircle size={30} className="text-white" />
          </div>
          <h2 className="absolute bottom-28 w-full transition-transform transform group-hover:-translate-y-5 duration-300 text-2xl text-white font-bold text-center py-2">
            {newscardcontent[0].title}
          </h2>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex mb-4 ml-6">
            {newscardcontent.slice(1).map((content, index) => (
              <div
                key={index + 1}
                className={`relative ${index === 0 ? "w-1/2" : "w-1/2 ml-6"}`}
              >
                <div className="relative group h-[100%]">
                  <Image
                    src={content.image.src}
                    alt={content.title}
                    height={100}
                    width={100}
                    className="w-[120%] h-[80%] rounded-3xl"
                  />
                  <div
                    className="absolute top-0 right-0 m-2"
                    onClick={() => handleOpenModal(index + 1)}
                  >
                    <GrAddCircle className="text-white text-3xl" />
                  </div>
                  <h2 className="absolute bottom-24 left-5 text-xl font-bold text-white transition-transform transform group-hover:-translate-y-5 duration-300">
                    {content.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="absolute flex items-end w-[100%] h-28 -mt-3 -ml-2 rounded-3xl p-4">
              <Carousel />
            </div>
          </div>
        </div>
      </div>
      {openModalIndex !== null && (
        <Modal
          image={newscardcontent[openModalIndex].image}
          title={newscardcontent[openModalIndex].title}
          firstname="First"
          secondname="Last"
          description="This is a description."
          items={[]}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default NewsFeature;
