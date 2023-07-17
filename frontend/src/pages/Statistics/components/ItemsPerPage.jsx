import { styles } from "../../../components/styles";

const VehicleItems = ({ currentItems }) => {
  // Illustrate the items in the table in Vehicle Statistics
  return (
    currentItems &&
    currentItems.map((vehicle) => (
      <tr key={vehicle._id}>
        <td style={styles.td}>{vehicle.plateNumber}</td>
        <td style={styles.td}>{vehicle.vehicleOwner}</td>
        <td style={styles.td}>{vehicle.vehicleType}</td>
        <td style={styles.td}>{vehicle.inputTime}</td>
        <td
          style={styles.td}
          className={vehicle.outputTime ? "" : "text-red-500"}
        >
          {vehicle.outputTime || "Haven't checked out yet"}
        </td>
        <td style={styles.td}>{vehicle.parkingType}</td>
        <td style={styles.td}>{vehicle.additionalService.carWashing.cost}</td>
        <td style={styles.td}>{vehicle.additionalService.oilChanging.cost}</td>
        <td
          style={styles.td}
          className={
            vehicle.additionalService.oilChanging.oilType === ""
              ? "text-yellow-500"
              : ""
          }
        >
          {vehicle.additionalService.oilChanging.oilType === ""
            ? "No Oil changing"
            : vehicle.additionalService.oilChanging.oilType}
        </td>
        <td style={styles.td}>{vehicle.additionalService.latestCost}</td>
        <td style={styles.td}>{vehicle.totalCost}</td>
      </tr>
    ))
  );
};

const ServiceItems = ({ currentItems }) => {
  // Illustrate the items in the table in Service Statistics
  return (
    currentItems &&
    currentItems.map((service) => (
      <tr key={service._id}>
        <td style={styles.td}>{service.plateNumber}</td>
        <td style={styles.td}>{service.vehicleOwner}</td>
        <td style={styles.td}>{service.vehicleType}</td>
        <td style={styles.td}>{service.registerTime}</td>
        <td style={styles.td}>{service.serviceType}</td>
        <td style={styles.td}>{service.oilType || "No Oil Changing"}</td>
        <td style={styles.td}>{service.cost}</td>
      </tr>
    ))
  );
};
export { VehicleItems, ServiceItems };
