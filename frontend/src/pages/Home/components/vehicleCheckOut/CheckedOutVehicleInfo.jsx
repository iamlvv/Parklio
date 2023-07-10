import React, { useState } from "react";

function CheckedOutVehicleInfo({
  carWashCost,
  oilChangingCost,
  serviceCost,
  plateNumber,
  vehicleOwner,
  vehicleType,
  inputTime,
  parkingType,
  oilType,
  totalCost,
}) {
  const [newPlateNumber, setNewPlateNumber] = useState(plateNumber);
  return (
    <div className="">
      <h2 className="font-bold text-xl mb-5">Vehicle Information</h2>
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
          <h3>{newPlateNumber}</h3>
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
  );
}

export default CheckedOutVehicleInfo;
