import axios from "axios";
import Swal from "sweetalert2";
import { SwalObject } from "../styles";
import {
  VEHICLE_CHECKOUT_API_URL,
  GET_ALL_DISTINCT_VEHICLES_API_URL,
  GET_ALL_VEHICLES_API_URL,
  VEHICLE_REGISTRATION_API_URL,
  GET_TOTAL_INPUT_TIME_API_URL,
  GET_TOTAL_OUTPUT_TIME_API_URL,
} from "../../constants/APIConstants";
import {
  INVALID_PARKING_KEY_OR_PLATE_NUMBER,
  SOMETHING_WENT_WRONG,
  VEHICLE_ALREADY_CHECKED_IN,
} from "../../constants/errorConstants";

// Register a vehicle
const RegisterVehicle = async ({
  userInfo,
  plateNumber,
  vehicleOwner,
  vehicleType,
  inputTime,
  parkingType,
  serviceCost,
  oilChanging,
  oilType,
  carWashCost,
  oilChangingCost,
}) => {
  try {
    const response = await axios.post(
      VEHICLE_REGISTRATION_API_URL,
      {
        plateNumber,
        vehicleOwner,
        vehicleType,
        inputTime,
        parkingType,
        serviceCost,
        oilChanging,
        carWashCost,
        oilChangingCost,
        oilType,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    Swal.fire({
      ...SwalObject.success,
      text: `Vehicle has been registered. Parking key: ${response.data.parkingKey}`,
      didClose: () => window.location.reload(),
    });
  } catch (error) {
    console.log(error);
    if (error.response.status === 400) Swal.fire(VEHICLE_ALREADY_CHECKED_IN);
    else Swal.fire(SOMETHING_WENT_WRONG);
  }
};

// Check out a vehicle
const CheckOutVehicle = async ({
  userInfo,
  parkingKey,
  plateNumber,
  setVehicleVerified,
  setPlateNumber,
  setParkingKey,
  setInputTime,
  setVehicleOwner,
  setVehicleType,
  setParkingType,
  setServiceCost,
  setCarWashCost,
  setOilChangingCost,
  setTotalCost,
  setOilType,
}) => {
  try {
    const response = await axios.post(
      VEHICLE_CHECKOUT_API_URL,
      {
        plateNumber,
        parkingKey,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setVehicleVerified(true);
    setPlateNumber(response.data.plateNumber);
    setParkingKey(response.data.parkingKey);
    setInputTime(response.data.inputTime);
    setVehicleOwner(response.data.vehicleOwner);
    setVehicleType(response.data.vehicleType);
    setParkingType(response.data.parkingType);
    setServiceCost(response.data.serviceCost);
    setCarWashCost(response.data.additionalService.carWashing.cost);
    setOilChangingCost(response.data.additionalService.oilChanging.cost);
    setTotalCost(response.data.totalCost);
    setOilType(response.data.additionalService.oilChanging.oilType);

    Swal.fire({
      ...SwalObject.success,
      text: `Vehicle has been checked out.`,
    });
  } catch (error) {
    if (error.response.status === 404)
      Swal.fire(INVALID_PARKING_KEY_OR_PLATE_NUMBER);
  }
};

// Get all vehicles
const GetAllVehicles = async ({ userInfo, setVehicleList }) => {
  try {
    const response = await axios.get(GET_ALL_VEHICLES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setVehicleList(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Get all distinct vehicles
const GetAllDistinctVehicles = async ({ userInfo, setVehicleList }) => {
  try {
    const response = await axios.get(GET_ALL_DISTINCT_VEHICLES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setVehicleList(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Get total input time of the system
const getTotalInputTime = async ({ userInfo, setTotalInputTime }) => {
  try {
    const response = await axios.get(GET_TOTAL_INPUT_TIME_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setTotalInputTime(response.data[0].inputTime);
  } catch (error) {
    console.log(error);
  }
};

// Get total output time of the system
const getTotalOutputTime = async ({ userInfo, setTotalOutputTime }) => {
  try {
    const response = await axios.get(GET_TOTAL_OUTPUT_TIME_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setTotalOutputTime(response.data[0].outputTime);
  } catch (error) {
    console.log(error);
  }
};

// Get total parking income of the system
const getTotalParkingIncome = async ({ userInfo, setTotalParkingIncome }) => {
  try {
    const response = await axios.get(GET_TOTAL_OUTPUT_TIME_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setTotalParkingIncome(response.data[0].totalParkingIncome);
  } catch (error) {
    console.log(error);
  }
};

// Count the number of output time of a specific vehicle
const CountOutputTime = ({ vehicleOriginalList, vehicleId }) => {
  if (vehicleId) {
    vehicleOriginalList = vehicleOriginalList.filter((vehicle) => {
      return (
        vehicle.plateNumber === vehicleId &&
        vehicle.parkingKey === "checked out"
      );
    });
    console.log(vehicleOriginalList.length);
    return vehicleOriginalList.length;
  }
  return vehicleOriginalList.length;
};

export {
  RegisterVehicle,
  CheckOutVehicle,
  GetAllVehicles,
  GetAllDistinctVehicles,
  CountOutputTime,
  getTotalInputTime,
  getTotalOutputTime,
  getTotalParkingIncome,
};
