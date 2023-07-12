import React from "react";
import {
  ACTIVE_SUBMIT_FORM_BUTTON,
  INACTIVE_SUBMIT_FORM_BUTTON,
  INPUT_FIELD,
} from "../../../../constants/formConstants";

function VehicleCheckout({
  handleCheckOut,
  plateNumber,
  handleChangePlate,
  parkingKey,
  setParkingKey,
  errorPlate,
  checkoutButton,
}) {
  return (
    <div>
      <form onSubmit={handleCheckOut}>
        <div>
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
            {errorPlate && <h2 style={{ color: "red" }}>{errorPlate}</h2>}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className={
              checkoutButton && !errorPlate
                ? ACTIVE_SUBMIT_FORM_BUTTON
                : INACTIVE_SUBMIT_FORM_BUTTON
            }
            disabled={plateNumber === "" || parkingKey === "" || errorPlate}
          >
            Check out
          </button>
        </div>
      </form>
    </div>
  );
}

export default VehicleCheckout;
