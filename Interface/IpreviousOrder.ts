export interface IPreviousOrderList {
  productList: [IPreviousOrder | null];
  fetchOrders?: () => Promise<[IPreviousOrder | null]>;
  filterOrders?: (startTime: Date, endTime: Date) => [IPreviousOrder | null];
  searchOrder?: (keyword: string) => [IPreviousOrder | null];
}

export interface IPreviousOrder {
  key: string;
  userFullName: string;
  userPhoneNumber: string;
  orderTotalAmt: string;
  orderDate?: Date;
  updateOrderDate?: Date;
  createdOrderDate: Date;
  orderStatus: orderStatus;
  getOrderDetail: () => void;
}

export enum orderStatus {
  failed = "FAILED",
  success = "SUCCESS",
  pending = "PENDING",
  canceled = "CANCELED",
  return = "RETURNED",
}
