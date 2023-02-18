export interface IVendorSetting {
    name: string | null,
    phone: string | null,
    thanksText: string | null,
    rItemText: string | null,
    rMrpText: string | null,
    rTotalText: string | null,
    rQtyText: string | null,
    rItemFontSize: string | null,
    rItemHeadingFontSize: string | null,
    address:string | null,
}

export let defaultVendorSetting : IVendorSetting = {
    name: "",
    phone: "",
    thanksText: "",
    rItemText: "",
    rMrpText: "",
    rTotalText: "",
    rQtyText: "",
    rItemFontSize: "",
    rItemHeadingFontSize: "",
    address:''
  }