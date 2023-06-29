import React, { useState } from "react";
import { styles } from "../../../components/styles";
function CheckOutForm() {
  const [plate, setPlate] = useState("");
  return (
    <div>
      <h2 className="font-bold text-2xl mt-10">Check out vehicle</h2>
      <div>
        <form>
          <div>
            <div className="my-10">
              <input
                type="text"
                placeholder="Plate Number"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
              <div className="mt-10">
                <button
                  type="button"
                  className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
                >
                  Verify Vehicle
                </button>
              </div>
            </div>
            <div>{/** Show vehicle info cost */}</div>
          </div>
          <div>
            <button
              type="submit"
              className="mb-10 rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out"
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
