import ImageNotFound from "../assets/img/not-image.png";

export function ImageProcessing(url: string, img: string | null) {
    return img ? `${url}${img}`: ImageNotFound;
}