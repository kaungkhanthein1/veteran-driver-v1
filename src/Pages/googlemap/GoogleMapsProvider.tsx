// GoogleMapsProvider.tsx
import { LoadScript } from "@react-google-maps/api";
import { ReactNode } from "react";

const GoogleMapsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDohcQddxZEnx7L4V0pMguyEElDI4ZazRI"
      libraries={["places", "geometry"]}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
