
/**
 * pp -> Purchased Price
 * mrp -> Maximum Retail Price
 * sp -> Selling Price
 * barCode -> Bar Code Number (Optional)
 * qrCodeId -> Unique Id to pull the product
 * name -> Product Name
 * id -> incremental Unique ID
 * images -> Array 
 */
export interface INewProduct {
  id?: string;
  name: string;
  barCode?: string;
  qrCode?: string;
  image: string[];
  weight: string;
  weightUnit?: string;
  price: {
    mrp: string;
    sp: string;
    pp: string;
  };
  addProduct: (product:any) =>void | Promise<any>;
  deleteProduct?: () => void;
  updateProduct?: (product:any) => boolean;
  sucess?:boolean
}