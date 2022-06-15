import { ProductRegion } from "../product/entities/types/product-region.enum";

export const RegionFromBarcode = (barcode: string): ProductRegion => {
  const region = barcode.substring(0, 2);
  return ProductRegion[region] || region;
}