import { getAmazonApi } from "./services/AmazonApi";
import { getJntApi } from "./services/JntApi";
import { getLazadaApi } from "./services/LazadaApi";
import { getShopeeApi } from "./services/ShopeeApi";
import { getShopifyApi } from "./services/ShopifyApi";
import { getWoocommerceApi } from "./services/WoocommerceApi";

const Kapyservices = {
  getAmazonApi,
  getJntApi,
  getLazadaApi,
  getShopeeApi,
  getShopifyApi,
  getWoocommerceApi,
};

export default Kapyservices;

export {
  getAmazonApi,
  getJntApi,
  getLazadaApi,
  getShopeeApi,
  getShopifyApi,
  getWoocommerceApi,
};
