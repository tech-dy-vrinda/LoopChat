import{ useState, useEffect } from "react";

export default function ShipmentTracker() {
  const [status, setStatus] = useState("In Transit");
  const [location, setLocation] = useState("Chicago, IL");
  const [estimatedDelivery, /*setEstimatedDelivery*/] = useState("Dec 9, 2024");
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());

      // Randomly change shipment status and location for simulation
      const randomStatus = ["In Transit", "Out for Delivery", "Delivered"];
      setStatus(randomStatus[Math.floor(Math.random() * randomStatus.length)]);

      const randomLocations = ["Chicago, IL", "New York, NY", "Los Angeles, CA", "Dallas, TX"];
      setLocation(randomLocations[Math.floor(Math.random() * randomLocations.length)]);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Image based on shipment status
  

  const getShipmentImage = () => {
    switch (status) {
      case "In Transit":
        return "https://via.placeholder.com/150/FF9900/FFFFFF?text=In+Transit"; // Custom "In Transit" image
      case "Out for Delivery":
        return "https://via.placeholder.com/150/0066FF/FFFFFF?text=Out+for+Delivery"; // Custom "Out for Delivery" image
      case "Delivered":
        return "https://via.placeholder.com/150/28A745/FFFFFF?text=Delivered"; // Custom "Delivered" image
      default:
        return "https://via.placeholder.com/150/6C757D/FFFFFF?text=Shipment"; // Custom "Shipment" image
    }
  };
  

  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src={getShipmentImage()}
              alt="shipment"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Shipment Tracking Information
            </h2>
            <p className="mt-6 text-gray-600">
              <strong>Shipment ID:</strong> 1234567890
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Carrier:</strong> UPS
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Status:</strong> {status}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Current Location:</strong> {location}
            </p>
            <p className="mt-2 text-gray-600">
              <strong>Estimated Delivery:</strong> {estimatedDelivery}
            </p>
            <p className="mt-4 text-gray-600">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
            <p className="mt-6 text-gray-600">
              Track your package in real-time and get updated status information at regular intervals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
