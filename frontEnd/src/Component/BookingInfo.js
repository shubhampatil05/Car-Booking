import React from "react";
import { useNavigate } from "react-router";

const BookingInfo = () => {
  const navigate = useNavigate();
  const info = JSON.parse(localStorage.getItem("info"));
  const days = localStorage.getItem("days");
  const perDayCharge = 2700;
  const driverDetails = JSON.parse(localStorage.getItem("driver"));

  const handleBooking = () => {
    navigate("/payment");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <table
        className="table table-striped table-dark mt-4"
        style={{ textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>Pickup Date</th>
            <th>Drop Date</th>
            <th>Pickup Time</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Journy</th>
            <th>Charges/Day</th>
            <th>Payable Amount</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{info.pickupDate}</td>
            <td>{info.dropDate}</td>
            <td>{info.pickupTime}</td>
            <td>{info.pickupLocation}</td>
            <td>{info.dropLocation}</td>
            <td>{`${days} Days`}</td>
            <td>{perDayCharge}</td>
            <td>{days * perDayCharge}</td>
          </tr>
        </tbody>
      </table>

      <table
        className="table table-striped"
        style={{ width: "350px", textAlign: "center", borderRadius: "10px" }}
      >
        <thead>
          <tr>
            <th>Driver Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{driverDetails.name}</td>
            <td>{driverDetails.Phone}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={handleBooking} className="btn btn-success">
        Proceed To Payment
      </button>
    </div>
  );
};

export default BookingInfo;
