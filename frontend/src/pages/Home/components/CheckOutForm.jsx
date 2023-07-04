import React, { useState } from "react";
import { styles } from "../../../components/styles";
import { CheckOutVehicle } from "../../../components/actions/vehicleActions";

function CheckOutForm() {
  const patternPlate = /[1-9][0-9][A-Z][0-9][0-9][0-9][0-9][0-9]?/;
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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const isValidPlate = (plate) => {
    return patternPlate.test(plate);
  };
  const handleChangePlate = (e) => {
    if (!isValidPlate(e.target.value)) {
      setErrorPlate("Invalid plate number");
    } else setErrorPlate(null);
    setPlateNumber(e.target.value);
  };

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

  return (
    <div>
      <h1 className="font-bold text-3xl mt-5 text-yellow-700">
        Check out Vehicle
      </h1>
      <div>
        <form onSubmit={handleCheckOut}>
          <div>
            <div className="my-10">
              <div className="flex flex-row gap-5">
                <div>
                  <input
                    type="text"
                    placeholder="Plate Number"
                    style={styles.backgroundInputField}
                    className="p-4 rounded-xl drop-shadow-lg"
                    value={plateNumber || ""}
                    onChange={handleChangePlate}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Parking Key"
                    style={styles.backgroundInputField}
                    className="p-4 rounded-xl drop-shadow-lg"
                    value={parkingKey || ""}
                    onChange={(e) => setParkingKey(e.target.value)}
                  />
                </div>
              </div>
              {errorPlate && <h2 style={{ color: "red" }}>{errorPlate}</h2>}
            </div>
            {vehicleVerified && (
              <div>
                <h2 className="font-bold">Vehicle Information</h2>
                <div className="flex flex-row gap-x-5">
                  <div>
                    <h3>Plate Number:</h3>
                    <h3>Vehicle's owner:</h3>
                    <h3>Vehicle Type:</h3>
                    <h3>Input Time:</h3>
                    <h3>Parking Type:</h3>
                    {carWashCost > 0 && <h3>Car Wash:</h3>}
                    {oilChangingCost > 0 && <h3>Oil Changing:</h3>}
                    {oilChangingCost > 0 && <h3>Oil Type:</h3>}
                    {serviceCost > 0 && <h3>Service Cost:</h3>}
                    <h3>Total cost:</h3>
                  </div>
                  <div>
                    <h3>{plateNumber}</h3>
                    <h3>{vehicleOwner}</h3>
                    <h3>{vehicleType}</h3>
                    <h3>{inputTime}</h3>
                    <h3>{parkingType}</h3>
                    {carWashCost > 0 && <h3>{carWashCost}</h3>}
                    {oilChangingCost > 0 && <h3>{oilChangingCost}</h3>}
                    {oilChangingCost > 0 && <h3>{oilType}</h3>}
                    {serviceCost > 0 && <h3>{serviceCost}</h3>}
                    <h3>{totalCost}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out drop-shadow-lg"
              disabled={vehicleVerified ? true : false}
            >
              Check out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckOutForm;
