import {rupeeSymbol} from "./globals";
import moment from "moment";
import { IVendorSetting } from "../container/VendorSettings/VendorSettingInterface";

interface IshopInfo {
    shopGstnNumber?:string,
    shopName:string,
    shopAddress?:string,
    shopContactNumber?:string
}

interface IProductList {
    productName?:string,
    weight?:string,
    weightUnit?:string,
    units:string,
    sp?:string,
    mrp?:string
}


const orderInvice = (shopInfo:IshopInfo,productInformation:[IProductList],totalSp:number,totalMrp:number,customerNumber:string,shopSetting:IVendorSetting) => {

    return `<div id="invoice-POS">
    <style>
    #invoice-POS{
  /*box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);*/
  padding:2mm;
  margin: 0 auto;
  width: 54mm;
  background: #FFF;
  
  
::selection {background: #f31544; color: #FFF;}
::moz-selection {background: #f31544; color: #FFF;}
h1{
  font-size: 1em;
  color: #222;
}
h2{font-size: .7em;}
h3{
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p{
  font-size: .7em;
  color: #666;
  line-height: 1.2em;
}
 
#top, #mid,#bot{ /* Targets all id with 'col-' */
  border-bottom: 1px solid #EEE;
}

#top{min-height: 100px;}
#mid{min-height: 80px; width: 100%;} 
#bot{ min-height: 50px; width: 100%;}
#legalcopy {
margin-bottom: 15px !important;
}
#top .logo{
  //float: left;
 height: 60px;
 width: 60px;
 background: url(http://michaeltruong.ca/images/logo1.png) no-repeat;
 background-size: 60px 60px;
}
.clientlogo{
  float: left;
 height: 60px;
 width: 60px;
 background: url(http://michaeltruong.ca/images/client.jpg) no-repeat;
 background-size: 60px 60px;
  border-radius: 50px;
}
.saving{
font-weight: bolder;
font-size: 0.5em;
font-style: italic;
}
.header-seprate {
border-bottom: 2px solid black !important;
font-weight: bolder;
}
.info{
  display: block;
  align-content: center;
  margin-left: 0;
}
.title{
  float: right;
}
.title p{text-align: right;} 
table{
  width: 100%;
  border-collapse: collapse;
}
td{
  padding: 5px 0 5px 15px;
  border: 1px solid #EEE
}
.tabletitle{
  padding: 5px;
  font-size: ${shopSetting?.rItemHeadingFontSize?.toString() || '0.5'}em;
  float: left;
  background: #EEE;
}
.lineNormal {
  border-top: 1px solid black;
}
.lineBold {
  border-top: 3px solid black;
  content: "\\2015";
}
}
.service{border-bottom: 1px solid #EEE; width: 100%;}
.item{width: 24mm;}
.itemtext{font-size: ${shopSetting?.rItemFontSize?.toString() || 0.5}em;}

#legalcopy{
  margin-top: 5mm;
   width: 100%;
}

  
  
}
</style>
    <div id="top" style="text-align: center;">
      <div class="logo"></div>
      <div class="info"> 
        <h2>${shopSetting?.name ? shopSetting?.name : shopInfo.shopName}</h2>
      </div><!--End Info-->
    </div><!--End InvoiceTop-->
    <div id="mid">
      <div class="info">
        <p> 
           ${shopSetting?.address? shopSetting?.address : shopInfo.shopAddress}</br>
            Phone   :  +91 ${shopSetting?.phone ? shopSetting?.phone :shopInfo.shopContactNumber}</br>
        </p>
      </div>
      <hr class="lineBold"/>
       <div class="info">
        <h2>Customer Detail</h2>
        <p> 
            Phone : +91 ${customerNumber}</br>
            order Date   :  ${moment().local().format("DD-MM-YYYY")}</br>
            order Time   :  ${moment().local().format("hh:mm A")}</br>
        </p>
      </div>
    </div><!--End Invoice Mid-->
     <hr class="lineBold"/>
    <div id="bot">

     <div id="table">
      <table >
      
       <tr class="tabletitle">
        <th class="header-seprate">${shopSetting?.rItemText ? shopSetting?.rItemText : "ITEMS"}</th>
        <th class="header-seprate">${shopSetting?.rQtyText ? shopSetting?.rQtyText :'QTY'}</th>
        <th class="header-seprate"><i>${shopSetting?.rMrpText ? shopSetting?.rMrpText : 'MRP'}</th>
        <th class="header-seprate">${shopSetting?.rTotalText ? shopSetting?.rTotalText : "TOTAL"}</th>
       </tr>
      <tr class="service">
        <td> <hr class="lineBold"/></td>
        <td> <hr class="lineBold"/></td>
        <td> <hr class="lineBold"/></td>
      </tr>
      

       ${productInformation.map(element=>printList(element) )}

       <tr class="service">
        <td> <hr class="lineBold"/></td>
        <td> <hr class="lineBold"/></td>
        <td> <hr class="lineBold"/></td>
      </tr>
       <tr class="service">
        <td class="tableitem"><p></p><b><i>Saving- </i></b></td>
        <td class="tableitem"><p></p>&nbsp;&nbsp;${rupeeSymbol}</td>
         <td class="tableitem"><p><i> ${totalMrp - totalSp}</i></p></td>
       </tr>

       <tr class="service">
        <td class="tableitem"><p ></p><b><i>Total- </i></b></td>
        <td class="tableitem"><p >&nbsp;&nbsp;${rupeeSymbol}</p></td>
         <td class="tableitem"><p ><i><b>${totalSp}</b></i></p></td>
       </tr>

      </table>
     </div><!--End Table-->
       <hr class="lineBold"/>
     <div id="legalcopy">
      <p class="legal"><strong>${shopSetting?.thanksText || 'Thank you for Shopping!'}</strong> 
      </p>
     </div>

    </div><!--End InvoiceBot-->
  </div><!--End Invoice-->
`
}

    const printList = (product:IProductList) => {
    return `<tr class="service">
    <td class="tableitem"><p class="itemtext" >${product.productName} (${product.weight}-${product.weightUnit})</p></td>
        <td class="tableitem"><p class="itemtext">${product.units}</p></td>
        <td class="tableitem"><p class="itemtext">${parseFloat(<string>product.mrp)}</p></td>
        <td class="tableitem"><p class="itemtext">${parseInt(product.sp || '1')*parseInt(product.units)}</p></td>
        </tr>`
    }

    export {orderInvice};