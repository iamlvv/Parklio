import React from "react";
import { styles } from "../../../../components/styles";

function ServiceIncluded({
  carWash,
  setCarWash,
  setServiceCost,
  serviceCost,
  oilChanging,
  setOilChanging,
  setOilType,
  carWashCost,
  oilChangingCost,
}) {
  return (
    <div className="">
      <h2 className="font-bold text-2xl ">Service Included</h2>
      <div className="grid grid-cols-3 mt-10">
        <div className="flex flex-row gap-5">
          <div>
            <input
              type="checkbox"
              name="service"
              value={carWash}
              onChange={(e) => {
                setCarWash(!carWash);
                if (carWash) {
                  setServiceCost(serviceCost - carWashCost);
                } else {
                  setServiceCost(serviceCost + carWashCost);
                }
              }}
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
                onChange={(e) => {
                  setOilChanging(!oilChanging);
                  if (oilChanging) {
                    setServiceCost(serviceCost - oilChangingCost);
                  }
                  if (!oilChanging) {
                    setServiceCost(serviceCost + oilChangingCost);
                  }
                }}
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
      </div>
      <h1 className="my-10 font-bold">Service cost: {serviceCost || 0}</h1>
    </div>
  );
}

export default ServiceIncluded;
