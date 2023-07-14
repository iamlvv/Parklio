import React from "react";
import { INPUT_FIELD } from "../../../../constants/formConstants";

function ParkingRegistration({
  plate,
  handleChangePlate,
  owner,
  setOwner,
  setParkingType,
  setVehicleType,
  errorPlate,
  setErrorPlate,
}) {
  return (
    <div>
      <h2 className="font-bold text-2xl">Parking Registration</h2>
      <div className="grid grid-cols-3 justify-center mt-10 items-center">
        <div className="col-span-1">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Plate Number"
              value={plate || ""}
              onChange={handleChangePlate}
              className={INPUT_FIELD}
              maxLength={8}
              required
            />
            {errorPlate && plate !== "" && (
              <h2 style={{ color: "red", maxWidth: "222px" }}>{errorPlate}</h2>
            )}
          </div>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Vehice Owner"
              value={owner || ""}
              onChange={(e) => setOwner(e.target.value)}
              className={INPUT_FIELD}
              required
            />
          </div>
        </div>
        <div className="col-span-2">
          <div className="flex flex-row gap-x-9 mb-5 p-4 rounded-xl shadow-md border">
            <h2>Type of parking:</h2>
            <div
              className="flex flex-row items-center gap-5"
              onChange={(e) => setParkingType(e.target.value)}
            >
              <input type="radio" name="parking" value="daily" required />
              <label>Daily</label>
              <input type="radio" name="parking" value="monthly" />
              <label>Monthly</label>
            </div>
          </div>
          <div className="flex flex-row gap-x-9 p-4 rounded-xl shadow-md border">
            <h2>Type of vehicle:</h2>
            <div
              className="flex flex-row items-center gap-5"
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <input type="radio" name="vehicle" value="4seatcar" required />
              <label>4 seat car</label>
              <input type="radio" name="vehicle" value="7seatcar" />
              <label>7 seat car</label>
              <input type="radio" name="vehicle" value="truck" />
              <label>Truck</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParkingRegistration;
