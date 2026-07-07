export function getProductImageUrl(image_src: string | null | undefined): string {
  if (!image_src) return "/placeholder.png";
  if (image_src.startsWith("http") || image_src.startsWith("data:")) return image_src;

  const Imagebucket = process.env.NEXT_PUBLIC_IMAGE_BUCKET;
  if (Imagebucket) {
    return `${Imagebucket}/${image_src}`;
  }

  // Extract filename
  const filename = image_src.split("/").pop() || "";
  const match = filename.match(/product(\d+)/i);
  if (match) {
    const num = parseInt(match[1]);
    if (num > 5 || isNaN(num)) {
      // Wrap around to one of the 5 existing high-quality images
      const wrappedNum = ((num - 1) % 5) + 1;
      return `/images/product${wrappedNum}.png`;
    }
    return `/images/product${num}.png`;
  }

  // Standard local assets path fallback
  return image_src.startsWith("/") 
    ? image_src 
    : (image_src.startsWith("images/") ? `/${image_src}` : `/images/${image_src}`);
}
