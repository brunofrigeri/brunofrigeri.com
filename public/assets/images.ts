import type { ImageProps } from "next/image";

enum Images {
  AVATAR = "avatar",
}

type Image = Pick<ImageProps, "src">;

const images: { [key in Images]: Image } = {
  [Images.AVATAR]: {
    src: "/assets/logo-h-bars-512.png",
  },
};

export default images;
