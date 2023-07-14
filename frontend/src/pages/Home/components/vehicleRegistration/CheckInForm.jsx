import React, { useEffect, useState } from "react";
import { getAllFees } from "../../../../components/actions/feeActions";
import { registerService } from "../../../../components/actions/serviceActions";
import { RegisterVehicle } from "../../../../components/actions/vehicleActions";
import ParkingRegistration from "./ParkingRegistration";
import ServiceIncluded from "./ServiceIncluded";
import { PLATE_NUMBER_PATTERN } from "../../../../constants/patternConstants";
import {
  ACTIVE_SUBMIT_FORM_BUTTON,
  INACTIVE_SUBMIT_FORM_BUTTON,
} from "../../../../constants/formConstants";

function CheckInForm({ userInfo }) {
  const [errorPlate, setErrorPlate] = useState("");
  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [serviceCost, setServiceCost] = useState(0);
  const [carWash, setCarWash] = useState(false);
  const [oilChanging, setOilChanging] = useState(false);
  const [oilType, setOilType] = useState("pennzoil");
  const [carWashCost, setCarWashCost] = useState(0);
  const [oilChangingCost, setOilChangingCost] = useState(0);
  const [registerButton, setRegisterButton] = useState(
    plate === "" || owner === "" || parkingType === "" || vehicleType === ""
      ? false
      : true
  );

  // Check if plate number is valid
  const isValidPlate = (plate) => {
    return PLATE_NUMBER_PATTERN.test(plate);
  };
  const handleChangePlate = (e) => {
    if (!isValidPlate(e.target.value)) {
      setErrorPlate(
        "Invalid plate number. The correct format is 29A12345/ 29A1234"
      );
    } else setErrorPlate(null);
    setPlate(e.target.value);
  };
  // Get the latest fees for car wash and oil changing
  useEffect(() => {
    getAllFees({
      setCarWashFee: setCarWashCost,
      setOilChangingFee: setOilChangingCost,
      userInfo,
    });
  }, []);

  // Check if all required fields are filled, if not, disable the register button, otherwise, enable it
  useEffect(() => {
    if (
      plate === "" ||
      owner === "" ||
      parkingType === "" ||
      vehicleType === ""
    )
      setRegisterButton(false);
    else setRegisterButton(true);
  }, [plate, owner, parkingType, vehicleType]);

  // Collect all data and make a request to register vehicle, if car wash or oil changing is included, make another request to register service
  const handleRegister = (e) => {
    e.preventDefault();
    const inputData = {
      userInfo: userInfo,
      plateNumber: plate,
      vehicleOwner: owner,
      inputTime: new Date().toLocaleString(),
      parkingType: parkingType,
      vehicleType: vehicleType,
      serviceCost: serviceCost,
      oilChanging: oilChanging,
      oilType: oilType,
      carWashCost: carWash ? carWashCost : 0,
      oilChangingCost: oilChanging ? oilChangingCost : 0,
    };
    RegisterVehicle(inputData);
    if (carWash) {
      registerService({
        ...inputData,
        oilType: null,
        oilChangingCost: 0,
        serviceCost: carWashCost,
      });
    }
    if (oilChanging) {
      registerService({
        ...inputData,
        carWashCost: 0,
        serviceCost: oilChangingCost,
      });
    }
    setRegisterButton(false);
  };
  return (
    <div className="mt-10">
      <h1 className="font-bold text-3xl mt-5 mb-5 text-yellow-700 text-center">
        Check in Vehicle
      </h1>
      <form onSubmit={handleRegister} className="grid grid-cols-2 gap-9">
        <ParkingRegistration
          plate={plate}
          handleChangePlate={handleChangePlate}
          owner={owner}
          setOwner={setOwner}
          setParkingType={setParkingType}
          setVehicleType={setVehicleType}
          errorPlate={errorPlate}
          setErrorPlate={setErrorPlate}
        />
        <ServiceIncluded
          carWash={carWash}
          setCarWash={setCarWash}
          setServiceCost={setServiceCost}
          oilChanging={oilChanging}
          setOilChanging={setOilChanging}
          setOilType={setOilType}
          carWashCost={carWashCost}
          oilChangingCost={oilChangingCost}
          serviceCost={serviceCost}
        />
        <div className="text-center">
          <button
            type="submit"
            className={
              registerButton && !errorPlate
                ? ACTIVE_SUBMIT_FORM_BUTTON
                : INACTIVE_SUBMIT_FORM_BUTTON
            }
            disabled={
              plate === "" ||
              owner === "" ||
              parkingType === "" ||
              vehicleType === "" ||
              errorPlate
            }
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckInForm;
