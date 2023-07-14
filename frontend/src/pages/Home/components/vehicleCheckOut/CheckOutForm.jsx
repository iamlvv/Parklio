import React, { useEffect, useState } from "react";
import { CheckOutVehicle } from "../../../../components/actions/vehicleActions";
import { PLATE_NUMBER_PATTERN } from "../../../../constants/patternConstants";
import VehicleCheckout from "./VehicleCheckout";
import CheckedOutVehicleInfo from "./CheckedOutVehicleInfo";
import {
  ACTIVE_SUBMIT_FORM_BUTTON,
  INACTIVE_SUBMIT_FORM_BUTTON,
} from "../../../../constants/formConstants";
function CheckOutForm() {
  const [errorPlate, setErrorPlate] = useState("");
  const [parkingKey, setParkingKey] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicleVerified, setVehicleVerified] = useState(false);
  const [vehicleOwner, setVehicleOwner] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [serviceCost, setServiceCost] = useState(0);
  const [carWashCost, setCarWashCost] = useState(0);
  const [oilChangingCost, setOilChangingCost] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [oilType, setOilType] = useState("pennzoil");
  const [checkoutButton, setCheckoutButton] = useState(
    plateNumber === "" || parkingKey === "" ? false : true
  );

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  //Check if plate number is valid
  const isValidPlate = (plate) => {
    return PLATE_NUMBER_PATTERN.test(plate);
  };
  const handleChangePlate = (e) => {
    if (!isValidPlate(e.target.value)) {
      setErrorPlate(
        "Invalid plate number. The correct format is 29A12345/ 29A1234"
      );
    } else setErrorPlate(null);
    setPlateNumber(e.target.value);
  };

  useEffect(() => {
    if (plateNumber === "" || parkingKey === "") setCheckoutButton(false);
    else setCheckoutButton(true);
  }, [plateNumber, parkingKey]);

  const handleCheckOut = (e) => {
    e.preventDefault();
    CheckOutVehicle({
      userInfo,
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
      plateNumber,
      parkingKey,
    });
  };
  console.log("parkingKey", parkingKey);
  return (
    <div className="">
      <div>
        <h1 className="font-bold text-3xl mt-5 text-yellow-700 text-center">
          Check out Vehicle
        </h1>
        <div className="grid grid-cols-2">
          <form onSubmit={handleCheckOut}>
            <VehicleCheckout
              plateNumber={plateNumber}
              handleChangePlate={handleChangePlate}
              parkingKey={parkingKey}
              setParkingKey={setParkingKey}
              errorPlate={errorPlate}
            />
            <div>
              <button
                type="submit"
                className={
                  checkoutButton && !errorPlate && parkingKey !== undefined
                    ? ACTIVE_SUBMIT_FORM_BUTTON
                    : INACTIVE_SUBMIT_FORM_BUTTON
                }
                disabled={
                  plateNumber === "" ||
                  parkingKey === "" ||
                  errorPlate ||
                  parkingKey === undefined
                }
              >
                Check out
              </button>
            </div>
          </form>
          <div>
            {vehicleVerified && (
              <CheckedOutVehicleInfo
                carWashCost={carWashCost}
                oilChangingCost={oilChangingCost}
                serviceCost={serviceCost}
                plateNumber={plateNumber}
                vehicleOwner={vehicleOwner}
                vehicleType={vehicleType}
                inputTime={inputTime}
                parkingType={parkingType}
                oilType={oilType}
                totalCost={totalCost}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOutForm;
