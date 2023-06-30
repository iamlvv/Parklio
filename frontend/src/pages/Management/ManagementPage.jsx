import React from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
function ManagementPage() {
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
                type="text"
                name="4seatcarfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <label>7 seat car fee: </label>
              <input
                type="text"
                name="7seatcarfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <label>Truck fee: </label>
              <input
                type="text"
                name="truckfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
          </div>
          <h2 className="font-bold text-2xl mb-5">Service Price</h2>
          <div className="flex flex-row gap-9 items-center mb-5">
            <div>
              <label>Car wash price: </label>
              <input
                type="text"
                name="carwashfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <label>Oil changing price: </label>
              <input
                type="text"
                name="oilchangingfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
            <div>
              <label>Fuel filling price: </label>
              <input
                type="text"
                name="fuelfillingfee"
                style={styles.backgroundInputField}
                className="p-4 rounded-xl"
              />
            </div>
          </div>
          <button className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ManagementPage;
