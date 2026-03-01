import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const CourseImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-4 my-10">
        {/* Large Left Image */}
        <div className="col-span-2">
          <img
            src={images[0]}
            className="w-full h-[600px] object-cover rounded-2xl cursor-pointer"
            alt="Main Image"
            onClick={() => { setOpen(true); setIndex(0); }}
          />
        </div>

        {/* Right Side Small Images */}
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                className="w-full h-[290px] object-cover rounded-2xl cursor-pointer"
                alt={`Thumbnail ${i}`}
                onClick={() => { setOpen(true); setIndex(i + 1); }}
              />
              {i === 3 && images.length > 5 && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold rounded-2xl cursor-pointer"
                  onClick={() => { setOpen(true); setIndex(4); }}
                >
                  +{images.length - 5}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Image Lightbox */}
      {open && (
        <Lightbox
          slides={images.map((img) => ({ src: img }))}
          open={open}
          index={index}
          close={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default CourseImageGallery;
