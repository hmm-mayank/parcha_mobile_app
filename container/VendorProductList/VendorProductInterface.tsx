export interface IVendorProductList {
  id: number;
  name?: string;
  mrp?: string;
  sp?: string;
  sku?: number;
}
export interface IVendorContext {
    update: (product: any) => Promise<void>;
    init:() =>void | Promise<any>;
    productList : any
}