import { useState, useCallback } from 'react';

interface LocationData {
  lat: number;
  lng: number;
}

interface UseLocationReturn {
  location: LocationData | null;
  error: string | null;
  loading: boolean;
  getCurrentLocation: () => Promise<LocationData>;
}

const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getCurrentLocation = useCallback((): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        const error = new Error("Geolocation is not supported");
        setError(error.message);
        reject(error);
        return;
      }

      setLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }, []);

  return {
    location,
    error,
    loading,
    getCurrentLocation
  };
};

export default useLocation;