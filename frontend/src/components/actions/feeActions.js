import axios from "axios";
import Swal from "sweetalert2";

import {
  GET_ALL_FEES_API_URL,
  UPDATE_FEES_API_URL,
} from "../../constants/APIConstants";
import { SwalObject } from "../styles";

// Get all fees
const getAllFees = async ({
  setFourseatCarFee,
  setSevenseatCarFee,
  setTruckFee,
  setCarWashFee,
  setOilChangingFee,
  userInfo,
}) => {
  try {
    const response = await axios.get(GET_ALL_FEES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setCarWashFee(response.data[0].carWash.price);
    setOilChangingFee(response.data[0].oilChange.price);
    setFourseatCarFee(response.data[0].fourSeatCar.price);
    setSevenseatCarFee(response.data[0].sevenSeatCar.price);
    setTruckFee(response.data[0].truck.price);
  } catch (error) {
    console.log(error);
  }
};

// Update fees
const updateFees = async ({ inputData, userInfo }) => {
  try {
    const response = await axios.post(UPDATE_FEES_API_URL, inputData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(response);
    Swal.fire({
      ...SwalObject.success,
      title: "Update fees successfully!",
    });
  } catch (error) {
    console.log(error);
  }
};
export { getAllFees, updateFees };
