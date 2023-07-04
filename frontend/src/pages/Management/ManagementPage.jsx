import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
function ManagementPage() {
  const [fourseatCarFee, setFourseatCarFee] = useState(0);
  const [seventseatCarFee, setSeventseatCarFee] = useState(0);
  const [truckFee, setTruckFee] = useState(0);
  const [carWashFee, setCarWashFee] = useState(0);
  const [oilChangingFee, setOilChangingFee] = useState(0);
  return (
    <div>
      <div>
        <NavigationBar />
      </div>
      <div style={styles.content}>
        <h1 className="font-bold text-3xl my-10">Management</h1>
        <form>
          <h2 className="font-bold text-2xl mb-5">Parking Price</h2>
          <div className="flex flex-row gap-9 items-center mb-5 mr-7">
            <div>
              <label>4 seat car fee: </label>
              <input
                type="number"
                name="4seatcarfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={fourseatCarFee || ""}
                onChange={(e) => setFourseatCarFee(e.target.value)}
              />
            </div>
            <div>
              <label>7 seat car fee: </label>
              <input
                type="number"
                name="7seatcarfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={seventseatCarFee || ""}
                onChange={(e) => setSeventseatCarFee(e.target.value)}
              />
            </div>
            <div>
              <label>Truck fee: </label>
              <input
                type="number"
                name="truckfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={truckFee || ""}
                onChange={(e) => setTruckFee(e.target.value)}
              />
            </div>
          </div>
          <h2 className="font-bold text-2xl mb-5">Service Price</h2>
          <div className="flex flex-row gap-9 items-center mb-5">
            <div>
              <label>Car wash price: </label>
              <input
                type="number"
                name="carwashfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={carWashFee || ""}
                onChange={(e) => setCarWashFee(e.target.value)}
              />
            </div>
            <div>
              <label>Oil changing price: </label>
              <input
                type="number"
                name="oilchangingfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl drop-shadow-md"
                value={oilChangingFee || ""}
                onChange={(e) => setOilChangingFee(e.target.value)}
              />
            </div>
          </div>
          <input
            type="button"
            className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out cursor-pointer"
            value="Save changes"
            disabled={
              fourseatCarFee === 0 &&
              seventseatCarFee === 0 &&
              truckFee === 0 &&
              carWashFee === 0 &&
              oilChangingFee === 0
            }
          />
        </form>
      </div>
    </div>
  );
}

export default ManagementPage;
