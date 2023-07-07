import { CountOutputTime } from "../../../../components/actions/vehicleActions";

function InfoEachVehicle({ vehicle, vehicleId, vehicleOriginalList }) {
  console.log(vehicleOriginalList);
  return (
    <div className="border p-5 rounded-md shadow-md">
      <h1 className="font-bold text-2xl">Vehicle Information</h1>
      <div className="grid grid-cols-2 gap-x-5">
        <div>
          <h2>Plate Number</h2>
          <h2>Vehicle Owner</h2>
          <h2>Vehicle Type</h2>
          <h2>Number of input Time up to now</h2>
          <h2>Number of output Time up to now</h2>
          <h2>Total cost has been purchased up to now</h2>
        </div>
        <div>
          <h2>{vehicle._id}</h2>
          <h2>{vehicle.vehicleOwner}</h2>
          <h2>
            {vehicle.vehicleType === "4seatcar"
              ? "4 seat car"
              : vehicle.vehicleType === "7seatcar"
              ? "7 seat car"
              : "truck"}
          </h2>
          <h2>{vehicle.inputTime}</h2>
          <h2>{CountOutputTime({ vehicleOriginalList, vehicleId })}</h2>
          <h2>{vehicle.totalCost}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoEachVehicle;
