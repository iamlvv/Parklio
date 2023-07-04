import axios from "axios";
import Swal from "sweetalert2";
const registerVehicle = async ({
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
    console.log(userInfo);
    const response = await axios.post(
      "http://localhost:5000/api/vehicles/checkin",
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
    console.log(response.data);
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: `Vehicle has been registered. The parking key is ${response.data.parkingKey}`,
    });
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
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
      "http://localhost:5000/api/vehicles/checkout",
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
    console.log(response.data);
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
      icon: "success",
      title: "Success!",
      text: `Vehicle has been checked out.`,
    });
  } catch (error) {
    console.log(error);
  }
};

const GetAllVehicles = async ({ userInfo, setVehicleList }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/vehicles", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(response.data);
    setVehicleList(response.data);
  } catch (error) {
    console.log(error);
  }
};
export { registerVehicle, CheckOutVehicle, GetAllVehicles };
