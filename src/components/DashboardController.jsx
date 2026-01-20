import { useEffect } from "react";
import { api } from "../services/api";
import { useStore } from "@nanostores/react";
import {
  fetchTelemetry,
  fetchUser,
  fetchVehicles,
  vehicleStore,
} from "../stores/vehicleStore";

export default function DashboardController({ vin: initialVin }) {
  const { vin } = useStore(vehicleStore);

  useEffect(() => {
    const init = async () => {
      // Sunset Notice: Force redirect to login for everyone
      console.log("VinFast Dashboard is now archived. Redirecting to sunset notice.");
      api.clearSession();
      window.location.href = "/login";
      return;
    };

    init();
  }, [initialVin]); // Only run on load or if SSR vin changes

  // Polling Effect
  useEffect(() => {
    // Polling Interval: 1 hour (3600000 ms)
    const interval = setInterval(() => {
      const currentVin = vin || initialVin;
      if (currentVin) {
        fetchTelemetry(currentVin);
        fetchUser(); // Refresh user too
      }
    }, 3600000);

    return () => clearInterval(interval);
  }, [vin, initialVin]);

  return null; // Headless
}
