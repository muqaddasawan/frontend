import React from "react";
import { Carousel } from "@material-tailwind/react";

const ImageSlider = () => {
  return (
    <div className="z-0">
      <Carousel transition={{ duration: 1 }} className="rounded-xl">
        <img
          src="https://media.istockphoto.com/id/1331913743/photo/bread-variety-still-life.jpg?b=1&s=170667a&w=0&k=20&c=vLFtvmmhd9qJy9QZ2hocyQVVrMjJOGHHw7yClpJCsR0="
          alt="image 1"
          className="h-full w-full object-cover "
        />
        <img
          src="https://rockridgemarkethall.com/templates/yootheme/cache/67/Bakery_photo_cheese-scones-prosciutto_landscape_edited_20200210-67a178bb.jpeg"
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src="https://rockridgemarkethall.com/templates/yootheme/cache/2d/Bakery_photo_cake-case_landscape_edited_20200228-2d947768.jpeg"
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    </div>
  );
};

export default ImageSlider;
