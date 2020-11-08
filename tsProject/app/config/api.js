import { isDev } from '../utils/env';
const prefix = isDev ? '/api' : '';
export const API_getGoodsList = prefix + "/discount_day/goods/list";
export const API_buyGoods = prefix + "/store/goods/buy";