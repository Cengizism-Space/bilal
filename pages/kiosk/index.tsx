import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import cloudinary from "../../utils/cloudinary";
import getBase64ImageUrl from "../../utils/generateBlurPlaceholder";
import type { ImageProps } from "../../utils/types";
import { useLastViewedPhoto } from "../../utils/useLastViewedPhoto";

import React from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>Eyup Sultan Moskee mededelingen</title>
        <meta
          property="og:image"
          content="/public/hdv-hellenvoetsluis-og-image.jpeg"
        />
        <meta
          name="twitter:image"
          content="/public/hdv-hellenvoetsluis-og-image.jpeg"
        />
      </Head>
      <main className="h-full w-full">
        <CarouselProvider
          interval={10000}
          isPlaying={true}
          infinite={true}
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={images.length}
        >
          <Slider>
            {images.map(({ id, public_id, format, blurDataUrl }, index) => (
              <Slide key={`slide-${index}`} index={index}>
                <Image
                  src={blurDataUrl}
                  className="pointer-events-none h-full w-full"
                  alt="blurred background"
                  fill
                  priority={true}
                />
                <Image
                  alt="Slide image"
                  className="mx-auto transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{
                    transform: "translate3d(0, 0, 0)"
                  }}
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_1920/${public_id}.${format}`}
                  width={1920}
                  height={1440}
                />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
