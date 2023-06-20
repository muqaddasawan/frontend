import { Carousel } from "@material-tailwind/react";
import { useState, useEffect, useRef } from "react";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";
import "./autoslider.css";
import video1 from "./videos/video1.mp4";
import video2 from "./videos/video2.mp4";
import video3 from "./videos/video3.mp4";
import video4 from "./videos/video4.mp4";
import ReactPlayer from "react-player/lazy";

let count = 0;
let slideInterval;

const featuredImages = [
  video2,
  video1,
  video3,
  video4,
  // "https://media.istockphoto.com/id/1331913743/photo/bread-variety-still-life.jpg?b=1&s=170667a&w=0&k=20&c=vLFtvmmhd9qJy9QZ2hocyQVVrMjJOGHHw7yClpJCsR0=",
  // "https://rockridgemarkethall.com/templates/yootheme/cache/67/Bakery_photo_cheese-scones-prosciutto_landscape_edited_20200210-67a178bb.jpeg",
  // "https://rockridgemarkethall.com/templates/yootheme/cache/2d/Bakery_photo_cake-case_landscape_edited_20200228-2d947768.jpeg",
];
export default function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef();
  const handleOnNextClick = () => {
    count = (count + 1) % featuredImages.length;
    setCurrentIndex(count);
    // document.getElementById("sliderimg").classList.add("fade-anim");
    // slideRef.current.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredImages.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  useEffect(() => {
    startSlider();
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 10000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto -mt-6">
        <div
          ref={slideRef}
          id="sliderimg"
          className="w-full relative select-none"
        >
          <div>
            {/* <div className="aspect-w-16 aspect-h-7"> */}
            {/* <video loop muted autoPlay>
              <source src={featuredImages[currentIndex]} type="video/mp4" />
            </video> */}
            {/* <img src={featuredImages[currentIndex]} alt="Image" /> */}
            <ReactPlayer
              url={featuredImages[currentIndex]}
              playing={true}
              loop={true}
              muted={true}
              width="100%"
              height="100%"
              controls={false}
            />
          </div>
          <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
            <button
              className="bg-gray-800 text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
              onClick={handleOnPrevClick}
            >
              <AiFillLeftCircle size={35} />
            </button>
            <button
              className="bg-gray-800 text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
              onClick={handleOnNextClick}
            >
              <AiFillRightCircle size={35} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
