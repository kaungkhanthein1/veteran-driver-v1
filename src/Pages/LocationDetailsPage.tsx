import { useNavigate, useLocation, useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import ShareIcon from "icons/Share.svg";
import BookmarkIcon from "icons/Bookmark.svg";
import RoomImage from "assets/Room.png";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { useBookmarks } from "../hooks/useBookmarks";
import { useGetPlaceQuery } from "../features/HomeApi";
import startloc from "./loc.svg";

import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";

import BottomSheetModalShow from "./Home/BottomSheetModalShow";
import gmap from "../assets/gmap.png";
import amap from "../assets/amap.png";
import bmap from "../assets/bmap.png";
import rmap from "../assets/rmap.png";
import "../components/cards/card.css";

const LocationDetailsPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showHeaderBg, setShowHeaderBg] = useState(false);
  const { data: detail, isLoading, isFetching } = useGetPlaceQuery({ id });
  const placeData = detail?.data || null;
  console.log("Place Data:", placeData); // Log the fetched place data
  const { t } = useTranslation();
  const { toggleBookmark, isBookmarked } = useBookmarks();

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (!rootElement) return; // Exit if root element is not found

    const handleScroll = () => {
      const scrollPosition = rootElement.scrollTop;
      // Show background when scrolled past the image carousel height (approx 300px)
      const shouldShow = scrollPosition > 300;
      setShowHeaderBg(shouldShow);
    };

    rootElement.addEventListener("scroll", handleScroll);
    // Check initial scroll position
    handleScroll();
    return () => rootElement.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const [directions, setDirections] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [destinationIcon, setDestinationIcon] =
    useState<google.maps.Icon | null>(null);
  const [startIcon, setStartIcon] = useState<google.maps.Icon | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const [showMap, setshowMap] = useState(false);

  const startLocation = { lat: 11.5458547, lng: 104.9305413 };
  const destination = {
    lat: placeData?.location?.coordinates[1],
    lng: placeData?.location?.coordinates[0],
  };

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    marginTop: "16px",
  };
  const createCustomMarkerIcon = (imageUrl: string) => {
    // Canvas setup for 40x50 marker
    const scaleFactor = 2;
    const canvas = document.createElement("canvas");
    canvas.width = 40 * scaleFactor;
    canvas.height = 50 * scaleFactor;
    const context = canvas.getContext("2d");

    if (!context) return null;
    context.scale(scaleFactor, scaleFactor);

    // Create image element
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    return new Promise<google.maps.Icon>((resolve) => {
      img.onload = () => {
        // 1. Draw yellow border circle (20px radius)
        const outerRadius = 20;
        context.beginPath();
        context.arc(20, 20, outerRadius, 0, 2 * Math.PI);
        context.fillStyle = "#FFD700";
        context.fill();

        // 2. Create clipping path slightly smaller for border effect
        const borderWidth = 2; // 2px yellow border
        const clipRadius = outerRadius - borderWidth;

        // 3. Clip and draw image
        context.save();
        context.beginPath();
        context.arc(20, 20, clipRadius, 0, 2 * Math.PI);
        context.closePath();
        context.clip();

        // Draw image to fill the clipped area
        const imgSize = clipRadius * 2;
        const imgX = 20 - clipRadius;
        const imgY = 20 - clipRadius;
        context.drawImage(img, imgX, imgY, imgSize, imgSize);
        context.restore();

        // 4. Draw reverse triangle pin (12px wide, 8px tall)
        const pinBottomWidth = 12;
        const pinBottomHeight = 8;

        context.beginPath();
        context.moveTo(20 - pinBottomWidth / 2, 40);
        context.lineTo(20 + pinBottomWidth / 2, 40);
        context.lineTo(20, 40 + pinBottomHeight);
        context.closePath();
        context.fillStyle = "#FFD700";
        context.fill();

        resolve({
          url: canvas.toDataURL(),
          scaledSize: new google.maps.Size(40, 50),
          anchor: new google.maps.Point(20, 50),
        });
      };

      img.onerror = () => {
        // Fallback version with visible border
        const outerRadius = 20;
        const borderWidth = 2;
        const pinBottomWidth = 12;
        const pinBottomHeight = 8;

        // Draw yellow outer circle
        context.beginPath();
        context.arc(20, 20, outerRadius, 0, 2 * Math.PI);
        context.fillStyle = "#FFD700";
        context.fill();

        // Draw white inner circle to create border effect
        context.beginPath();
        context.arc(20, 20, outerRadius - borderWidth, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

        // Draw pin
        context.beginPath();
        context.moveTo(20 - pinBottomWidth / 2, 40);
        context.lineTo(20 + pinBottomWidth / 2, 40);
        context.lineTo(20, 40 + pinBottomHeight);
        context.closePath();
        context.fillStyle = "#FFD700";
        context.fill();

        resolve({
          url: canvas.toDataURL(),
          scaledSize: new google.maps.Size(40, 50),
          anchor: new google.maps.Point(20, 50),
        });
      };
    });
  };
  const calculateBearing = (
    start: google.maps.LatLngLiteral,
    end: google.maps.LatLngLiteral
  ) => {
    const startLat = (start.lat * Math.PI) / 180;
    const startLng = (start.lng * Math.PI) / 180;
    const endLat = (end.lat * Math.PI) / 180;
    const endLng = (end.lng * Math.PI) / 180;

    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  useEffect(() => {
    if (!mapLoaded) return;

    const createRotatedIcon = async () => {
      const angle = calculateBearing(startLocation, destination);
      const size = 30;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = startloc;

      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx.clearRect(0, 0, size, size);
          ctx.save();
          ctx.translate(size / 2, size / 2);
          ctx.rotate((angle * Math.PI) / 180);
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();
          resolve();
        };
      });

      setStartIcon({
        url: canvas.toDataURL(),
        scaledSize: new google.maps.Size(35, 30),
        anchor: new google.maps.Point(size / 2, size / 2),
      });
    };

    createRotatedIcon();
  }, [mapLoaded, destination.lat, destination.lng]);

  // Load the icon when the component mounts or item changes

  useEffect(() => {
    if (!mapLoaded) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: startLocation,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Directions request failed: ${status}`);
        }
      }
    );
  }, [mapLoaded, destination.lat, destination.lng]);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
  };

  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [selectionType, setSelectionType] = useState<"once" | "always" | null>(
    null
  );

  const openMapByVendor = ({
    lat,
    lng,
    name = placeData.name,
    address = placeData.address,
    vendor,
  }: any) => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    const queryName = encodeURIComponent(name || address || "Destination");

    let url = "";

    switch (vendor) {
      case "amap":
        url = isIOS
          ? `iosamap://viewMap?sourceApplication=myApp&lat=${lat}&lon=${lng}&poiname=${queryName}`
          : isAndroid
          ? `amapuri://viewMap?sourceApplication=myApp&lat=${lat}&lon=${lng}&poiname=${queryName}`
          : `https://uri.amap.com/marker?position=${lng},${lat}&name=${queryName}`;
        break;

      case "baidu":
        url =
          isIOS || isAndroid
            ? `baidumap://map/marker?location=${lat},${lng}&title=${queryName}&content=${queryName}&src=webapp.marker`
            : `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${queryName}&content=${queryName}&output=html`;
        break;

      case "tencent":
        url =
          isIOS || isAndroid
            ? `qqmap://map/marker?marker=coord:${lat},${lng};title:${queryName}&referer=myApp`
            : `https://apis.map.qq.com/uri/v1/marker?marker=coord:${lat},${lng};title:${queryName}&referer=myApp`;
        break;

      case "google":
        url =
          isIOS || isAndroid
            ? `geo:${lat},${lng}?q=${lat},${lng}(${queryName})`
            : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        break;

      case "apple":
        url = `http://maps.apple.com/?q=${queryName}&ll=${lat},${lng}`;
        break;

      default:
        console.warn("Unsupported map vendor");
        return;
    }

    // For "Always" selection, save preference to localStorage
    if (selectionType === "always") {
      localStorage.setItem("preferredMapVendor", vendor);
    }

    window.location.href = url;
  };

  const handleMapSelect = (vendor: string) => {
    setSelectedVendor(vendor);
  };

  const handleConfirm = () => {
    if (selectedVendor && selectionType) {
      openMapByVendor({
        lat: destination.lat,
        lng: destination.lng,
        name: placeData.name,
        vendor: selectedVendor as any["vendor"],
      });
      setshowMap(false);
    }
  };
  const handleCall = (selectedVendor: any) => {
    openMapByVendor({
      lat: destination.lat,
      lng: destination.lng,
      name: placeData.name,
      vendor: selectedVendor as any["vendor"],
    });
    setshowMap(false);
  };

  const locationData = placeData || location.state?.locationData;

  useEffect(() => {
    const loadIcon = async () => {
      console.log("aa");
      try {
        const icon = await createCustomMarkerIcon(
          locationData?.photos?.[0] || ""
        );

        setDestinationIcon(icon);
      } catch (error) {
        console.error("Failed to create marker icon:", error);
        setDestinationIcon(null);
      }
    };

    loadIcon();
  }, [locationData]);

  if (isLoading || isFetching) {
    return (
      <div className="dvh-fallback bg-white">
        <div className="p-5 flex items-center justify-center h-[100dvh]">
          <div className="spiner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dvh-fallback relative bg-white">
      {/* Header */}
      <div
        className={`fixed top-0  w-full left-0 z-50 transition-all duration-300 ${
          showHeaderBg ? "bg-theme-primary" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <div onClick={() => navigate(-1)} className="cursor-pointer">
            <BackButton />
          </div>
          <div className="flex items-center flex-grow justify-center">
            <h1
              className={`text-lg font-semibold transition-colors duration-300 ${
                showHeaderBg ? "text-theme-text" : "text-white"
              }`}
            >
              {locationData.name}
            </h1>
          </div>
          <button className="p-2 z-10">
            <img
              src={ShareIcon}
              alt={t("locationDetails.shareAltText")}
              className={`w-6 h-6 transition-all duration-300 ${
                showHeaderBg
                  ? "[filter:var(--icon-filter)]"
                  : "[filter:brightness(0)_invert(1)]"
              }`}
            />
          </button>
        </div>
      </div>
      {/* Image Carousel */}
      <div className="relative w-full h-[300px] image-carousel">
        <img
          src={
            locationData.photos && locationData.photos.length > 0
              ? locationData.photos[activeImageIndex]
              : RoomImage
          }
          alt={`${locationData.name} view ${activeImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {locationData.photos &&
            locationData.photos.map((_: any, index: number) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeImageIndex ? "bg-[#FDC51B]" : "bg-white/50"
                } inline-block cursor-pointer`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
        </div>
        <button
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30"
          onClick={() => toggleBookmark(locationData)}
        >
          <img
            src={BookmarkIcon}
            alt={t("locationDetails.bookmarkAltText")}
            className={`w-6 h-6 ${
              isBookmarked(locationData?.id)
                ? "filter-orange"
                : "[filter:brightness(0)_saturate(100%)_invert(100%)]"
            }`}
          />
        </button>
      </div>

      {/* Location Details */}
      <div className="flex flex-col">
        <div className="mt-3  gap-2 px-4">
          <span className="text-black place-name">{locationData?.name}</span>
          <span className="distance ml-2">
            ({locationData?.distance}km away)
          </span>
        </div>
        <div className="gap-2 px-4">
          <span className="text-black other-name">
            {locationData?.otherName}
          </span>
        </div>
        <div className="flex items-center justify-between mb-3 mt-2 px-4">
          <div className="flex items-center gap-1">
            <span className="text-black text-[16px]">
              {locationData?.rating}
            </span>
            {/* Star Icons (adjust based on rating) */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(locationData?.rating)
                    ? "text-[#FFC61B]"
                    : "text-[#B5B5B5]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="rat-count">({locationData?.ratingCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="view-count">{locationData?.viewCount}</span>
            <span className="text-[12px]">Views</span>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.3729 9.03907C11.3729 10.3486 10.3109 11.4106 9.00138 11.4106C7.69188 11.4106 6.62988 10.3486 6.62988 9.03907C6.62988 7.72882 7.69188 6.6676 9.00138 6.6676C10.3109 6.6676 11.3729 7.72882 11.3729 9.03907Z"
                stroke="black"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.0625 9.03898C2.0625 11.499 5.169 14.5155 9.00147 14.5155C12.8332 14.5155 15.9405 11.5012 15.9405 9.03898C15.9405 6.57675 12.8332 3.5625 9.00147 3.5625C5.169 3.5625 2.0625 6.579 2.0625 9.03898Z"
                stroke="black"
                stroke-width="1.125"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg> */}
          </div>
        </div>
        <div className="flex flex-wrap items-center mb-3 px-4">
          {locationData?.tags.map((tag: any, index: number) => (
            <span key={index} className="tag-div">
              {tag?.name}
            </span>
          ))}
        </div>
        {/* Image and Rank */}

        <div className="flex items-center gap-1 mt-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
          >
            <path
              d="M17 8L15.2981 13.1047C15.2055 13.3826 15.0494 13.6351 14.8423 13.8423C14.6351 14.0494 14.3826 14.2055 14.1047 14.2981L9 16L10.7019 10.8953C10.7945 10.6174 10.9506 10.3649 11.1577 10.1577C11.3649 9.95057 11.6174 9.79451 11.8953 9.70189L17 8Z"
              stroke="black"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.75 22C18.2728 22 22.75 17.5228 22.75 12C22.75 6.47715 18.2728 2 12.75 2C7.22715 2 2.75 6.47715 2.75 12C2.75 17.5228 7.22715 22 12.75 22Z"
              stroke="black"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="13" cy="12" r="1" fill="black" />
          </svg>
          <h1 className="loc-text">Location Guide</h1>
        </div>
        <div className="mt-2 px-4">
          <p className="loc-des">{locationData?.description}</p>
        </div>
        <div className="mt-2">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={destination}
            zoom={15}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              gestureHandling: "greedy",
            }}
            onLoad={(map) => {
              onMapLoad(map);
              // Fit bounds to show both markers
              const bounds = new window.google.maps.LatLngBounds();
              bounds.extend(startLocation);
              bounds.extend(destination);
              map.fitBounds(bounds);
            }}
          >
            {startIcon && (
              <Marker position={startLocation} icon={startIcon || ""} />
            )}

            {destinationIcon && (
              <Marker position={destination} icon={destinationIcon || ""} />
            )}

            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  suppressMarkers: true,
                  polylineOptions: {
                    strokeColor: "#4285F4",
                    strokeWeight: 3,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>

        <div className="px-4 ">
          <button
            className="check-btn  mt-5 mb-5"
            onClick={() => {
              if (localStorage.getItem("preferredMapVendor")) {
                handleCall(localStorage.getItem("preferredMapVendor"));
                setshowMap(false);
              } else {
                setshowMap(true);
              }
            }}
          >
            {t("地图查看")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="19"
              viewBox="0 0 15 19"
              fill="none"
            >
              <path
                d="M7.50162 9.36791C7.963 9.36791 8.35746 9.20015 8.68498 8.86463C9.01266 8.52912 9.1765 8.12582 9.1765 7.65474C9.1765 7.18366 9.0122 6.78083 8.68359 6.44626C8.35498 6.11185 7.95991 5.94465 7.49838 5.94465C7.037 5.94465 6.64254 6.1124 6.31502 6.44792C5.98734 6.78344 5.8235 7.18681 5.8235 7.65805C5.8235 8.12913 5.9878 8.53188 6.31641 8.86629C6.64502 9.2007 7.04009 9.36791 7.50162 9.36791ZM7.5 16.61C9.3143 14.9517 10.7027 13.361 11.6652 11.8381C12.6277 10.3152 13.1089 8.98134 13.1089 7.83654C13.1089 6.11035 12.5718 4.69127 11.4975 3.5793C10.4233 2.46733 9.0908 1.91135 7.5 1.91135C5.9092 1.91135 4.57669 2.46733 3.50245 3.5793C2.42821 4.69127 1.8911 6.11035 1.8911 7.83654C1.8911 8.98134 2.37234 10.3152 3.33482 11.8381C4.29731 13.361 5.6857 14.9517 7.5 16.61ZM7.5 18.5C5.16605 16.4351 3.41589 14.5135 2.24954 12.7351C1.08318 10.9565 0.5 9.32364 0.5 7.83654C0.5 5.65142 1.19223 3.88239 2.57668 2.52943C3.96128 1.17648 5.60239 0.5 7.5 0.5C9.39761 0.5 11.0387 1.17648 12.4233 2.52943C13.8078 3.88239 14.5 5.65142 14.5 7.83654C14.5 9.32364 13.9168 10.9565 12.7505 12.7351C11.5841 14.5135 9.83395 16.4351 7.5 18.5Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <BottomSheetModalShow isExpanded={showMap} setIsExpanded={setshowMap}>
          <div className="px-4 py-2">
            <div className="flex justify-between items-center">
              <h1 className="open_text">Open This Location With</h1>
              <div
                onClick={() => {
                  setshowMap(false);
                }}
                className="rounded-full bg-theme-primary p-2 cursor-pointer hover:bg-theme-secondary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5 justify-center">
              {["google", "apple", "baidu", "amap"].map((vendor) => (
                <div
                  key={vendor}
                  className={`flex items-center flex-col p-2 rounded-lg cursor-pointer ${
                    selectedVendor === vendor ? "bg-[#F2F4FA]" : ""
                  }`}
                  onClick={() => handleMapSelect(vendor)}
                >
                  <img
                    src={
                      vendor === "google"
                        ? gmap
                        : vendor === "apple"
                        ? amap
                        : vendor === "baidu"
                        ? bmap
                        : rmap
                    }
                    alt={`${vendor} map`}
                    className="w-16 h-16"
                  />
                  <span className="capitalize g_name">
                    {vendor === "amap" ? "AMAP" : vendor}
                  </span>
                  <span className="capitalize g_name">map</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 justify-center ">
              <button
                className={`once-btn mt-5`}
                onClick={() => {
                  setSelectionType("once");
                  handleConfirm();
                }}
              >
                Once
              </button>
              <button
                className={`always-btn mt-5 ${
                  selectionType === "always" ? " text-white" : ""
                }`}
                onClick={() => {
                  setSelectionType("always");
                  handleConfirm();
                }}
              >
                Always
              </button>
            </div>
          </div>
        </BottomSheetModalShow>
      </div>
    </div>
  );
};

export default LocationDetailsPage;
