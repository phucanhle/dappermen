export default interface Product {
  id: number;
  image_src: string;
  image_alt: string;
  name: string;
  category: string;
  price: number;
  release_date: string; // YYYY-MM-DD
  description?: string;
}
