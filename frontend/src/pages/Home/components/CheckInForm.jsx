import React, { useState } from "react";
import { styles } from "../../../components/styles";
function CheckInForm() {
  const patternPlate = /[1-9][0-9][A-Z][0-9][0-9][0-9][0-9][0-9]/;

  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [serviceCost, setServiceCost] = useState("");
  const [fuelCost, setFuelCost] = useState("");
  const [carWash, setCarWash] = useState(false);
  const [oilChanging, setOilChanging] = useState(false);
  const [oilType, setOilType] = useState("");
  const [fuelFilling, setFuelFilling] = useState(false);
  const [fuelType, setFuelType] = useState("");

  const handleInputTime = () => {
    setInputTime(new Date().toLocaleString());
  };
  return (
    <div className="mt-10">
      <form>
        <h2 className="font-bold text-2xl">Parking Registration</h2>
        <div className="flex flex-row justify-center gap-x-40 mt-10">
          <div className="flex flex-col gap-y-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Plate Number"
                value={plate || ""}
                onChange={(e) => setPlate(e.target.value)}
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div className="mb-5">
              <input
                type="text"
                placeholder="Vehice Owner"
                value={owner || ""}
                onChange={(e) => setOwner(e.target.value)}
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Input Time"
                value={inputTime || ""}
                onChange={(e) => setInputTime(e.target.value)}
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
                disabled
              />
            </div>
          </div>
          <div>
            <div
              className="flex flex-row gap-9 mb-10 p-4 rounded-xl"
              style={styles.backgroundInputField}
            >
              <h2>Type of parking</h2>
              <div
                className="flex flex-row items-center gap-5"
                onChange={(e) => setParkingType(e.target.value)}
              >
                <input type="radio" name="parking" value="daily" />
                <label>Daily</label>
                <input type="radio" name="parking" value="monthly" />
                <label>Monthly</label>
              </div>
            </div>
            <div
              className="flex flex-row gap-9 p-4 rounded-xl mt-10"
              style={styles.backgroundInputField}
            >
              <h2>Type of vehicle</h2>
              <div
                className="flex flex-row items-center gap-5"
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <input type="radio" name="vehicle" value="4seatcar" />
                <label>4 seat car</label>
                <input type="radio" name="vehicle" value="7seatcar" />
                <label>7 seat car</label>
                <input type="radio" name="vehicle" value="truck" />
                <label>Truck</label>
              </div>
            </div>
            <div className="mt-4 flex flex-row gap-5">
              <button
                type="button"
                className="mt-16 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
                onClick={handleInputTime}
              >
                Get the current input time
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="font-bold text-2xl">Service Included</h2>
          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-row gap-5">
              <div>
                <input
                  type="checkbox"
                  name="service"
                  value={carWash}
                  onChange={(e) => setCarWash(!carWash)}
                  className="border border-black w-5 h-5 rounded-xl"
                />
              </div>
              <label>Car Wash</label>
            </div>
            <div className="">
              <div className="flex flex-row gap-5 mb-5">
                <div>
                  <input
                    type="checkbox"
                    name="service"
                    value={oilChanging}
                    onChange={(e) => setOilChanging(!oilChanging)}
                    className="border border-black w-5 h-5 rounded-xl"
                  />
                </div>
                <label>Oil Changing</label>
              </div>
              <select
                className="rounded-md p-2"
                style={styles.backgroundInputCost}
                disabled={!oilChanging}
                onChange={(e) => setOilType(e.target.value)}
              >
                <option value="pennzoil">Pennzoil</option>
                <option value="shell">Shell</option>
                <option value="castrol">Castrol</option>
                <option value="valvoline">Valvoline</option>
              </select>
            </div>
            <div className="">
              <div className="flex flex-row gap-5 mb-5">
                <input
                  type="checkbox"
                  name="service"
                  value={fuelFilling}
                  onChange={(e) => setFuelFilling(!fuelFilling)}
                  className="border border-black w-5 h-5 rounded-xl"
                />
                <label>Fuel Changing</label>
              </div>
              <select
                className="rounded-md p-2"
                style={styles.backgroundInputCost}
                disabled={!fuelFilling}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="ron95">Ron 95</option>
                <option value="ron92">Ron 92</option>
              </select>
              <div className="mt-5">
                <input
                  type="number"
                  placeholder="Cost"
                  style={styles.backgroundInputCost}
                  className="p-2 rounded-xl"
                  disabled={!fuelFilling}
                  value={fuelCost || ""}
                  onChange={(e) => setFuelCost(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <h1 className="my-10">Service cost: {serviceCost || ""}</h1>
        <button
          type="submit"
          className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default CheckInForm;
