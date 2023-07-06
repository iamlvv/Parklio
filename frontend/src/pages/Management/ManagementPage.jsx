import React, { useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
import Header from "../../components/Header";
function ManagementPage() {
  const [fourseatCarFee, setFourseatCarFee] = useState(0);
  const [seventseatCarFee, setSeventseatCarFee] = useState(0);
  const [truckFee, setTruckFee] = useState(0);
  const [carWashFee, setCarWashFee] = useState(0);
  const [oilChangingFee, setOilChangingFee] = useState(0);
  return (
    <div>
      <Header />
      <div>
        <NavigationBar />
      </div>
      <div style={styles.content}>
        <form className="mt-10">
          <div className="grid grid-cols-2">
            <div>
              <h2 className="font-bold text-2xl mb-5">Parking Price</h2>
              <div className="flex flex-row gap-9 items-center mb-5 mr-7">
                <div>
                  <label>4 seat car fee: </label>
                  <input
                    type="number"
                    name="4seatcarfee"
                    className="p-4 rounded-xl drop-shadow-md border"
                    value={fourseatCarFee || ""}
                    onChange={(e) => setFourseatCarFee(e.target.value)}
                  />
                </div>
                <div>
                  <label>7 seat car fee: </label>
                  <input
                    type="number"
                    name="7seatcarfee"
                    className="p-4 rounded-xl drop-shadow-md border"
                    value={seventseatCarFee || ""}
                    onChange={(e) => setSeventseatCarFee(e.target.value)}
                  />
                </div>
                <div>
                  <label>Truck fee: </label>
                  <input
                    type="number"
                    name="truckfee"
                    className="p-4 rounded-xl drop-shadow-md border"
                    value={truckFee || ""}
                    onChange={(e) => setTruckFee(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-2xl mb-5">Service Price</h2>
              <div className="flex flex-row gap-9 mb-5">
                <div>
                  <label>Car wash price: </label>
                  <div>
                    <input
                      type="number"
                      name="carwashfee"
                      className="p-4 rounded-xl drop-shadow-md border"
                      value={carWashFee || ""}
                      onChange={(e) => setCarWashFee(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label>Oil changing price: </label>
                  <div>
                    <input
                      type="number"
                      name="oilchangingfee"
                      className="p-4 rounded-xl drop-shadow-md border"
                      value={oilChangingFee || ""}
                      onChange={(e) => setOilChangingFee(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              type="button"
              className="rounded-2xl p-4 font-bold hover:bg-black hover:text-white bg-white text-black transition border ease-in-out cursor-pointer"
              value="Save changes"
              disabled={
                fourseatCarFee === 0 &&
                seventseatCarFee === 0 &&
                truckFee === 0 &&
                carWashFee === 0 &&
                oilChangingFee === 0
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagementPage;
