import axios from "axios";
import Swal from "sweetalert2";
import { SwalObject } from "../styles";
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
      `${process.env.REACT_APP_API_URL}/vehicles/checkin`,
      {
        plateNumber: plateNumber,
        vehicleOwner: vehicleOwner,
        vehicleType: vehicleType,
        inputTime: inputTime,
        parkingType: parkingType,
        serviceCost: serviceCost,
        oilChanging: oilChanging,
        carWashCost: carWashCost,
        oilChangingCost: oilChangingCost,
        oilType: oilType,
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
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      ...SwalObject.error,
    });
  }
};

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
      `${process.env.REACT_APP_API_URL}/vehicles/checkout`,
      {
        plateNumber: plateNumber,
        parkingKey: parkingKey,
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
    console.log(error);
  }
};

const GetAllVehicles = async ({ userInfo, setVehicleList }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/vehicles`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setVehicleList(response.data);
  } catch (error) {
    console.log(error);
  }
};

const GetAllDistinctVehicles = async ({ userInfo, setVehicleList }) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/vehicles/distinctvehicles`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setVehicleList(response.data);
  } catch (error) {
    console.log(error);
  }
};

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
};
