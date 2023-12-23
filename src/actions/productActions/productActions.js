import axios from "axios";
import { backendUrl } from "../../helper";
export const getAllProducts = async (
  currentPage,
  keyword = "",
  price = [0, 25000],
  category,
  ratings = 0
) => {
  let response = await axios.get(
    `${backendUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&ratings[gte]=${ratings}`
  );
  if (category) {
    response = await axios.get(
      `${backendUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lt]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    );
  }
  const data = await response.data;
  return data;
};
