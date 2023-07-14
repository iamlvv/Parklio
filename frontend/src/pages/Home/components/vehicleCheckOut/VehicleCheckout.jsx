import React from "react";
import { INPUT_FIELD } from "../../../../constants/formConstants";

function VehicleCheckout({
  plateNumber,
  handleChangePlate,
  parkingKey,
  setParkingKey,
  errorPlate,
}) {
  return (
    <div className="my-10">
      <div className="flex flex-row gap-5">
        <div>
          <input
            type="text"
            placeholder="Plate Number"
            className={INPUT_FIELD}
            value={plateNumber || ""}
            onChange={handleChangePlate}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Parking Key"
            className={INPUT_FIELD}
            value={parkingKey || ""}
            onChange={(e) => setParkingKey(e.target.value)}
          />
        </div>
      </div>
      {errorPlate && plateNumber !== "" && (
        <h2 style={{ color: "red", maxWidth: "222px" }}>{errorPlate}</h2>
      )}
    </div>
  );
}

export default VehicleCheckout;
