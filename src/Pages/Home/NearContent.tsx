import { useLocation, useNavigate } from "react-router-dom";
import NearestPlaceHomeCard from "../../components/cards/NearestPlaceHomeCard";

import { useState } from "react";
import ShareModal from "../../components/common/ShareModal";
import { getAccessToken } from "../../Pages/services/tokenUtils";

export default function NearContent({
  selectedPlace,
  setSelectedPlace,
  setIsExpanded,
}: any) {
  const navigate = useNavigate();
  const [showShare, setshowShare] = useState(false);
  const token = getAccessToken();
  const location = useLocation();

  return (
    <div className="w-full max-w-[480px] mx-auto z-[1001]">
      {/* Nearest Recommendation Section */}
      <div className="px-4 py-2 bg-theme-secondary">
        <div className="flex justify-between items-center">
          <div
            onClick={() => {
              setSelectedPlace(null);
              setIsExpanded(false);
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
          <div className="gap-3 flex items-center">
            <div
              onClick={() => {
                setshowShare(true);
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
                  d="M13 10.9988L21.2 2.79883"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.0002 6.8V2H17.2002"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              onClick={() => {
                if (token) {
                  navigate(`/favorite/${selectedPlace?.id}`);
                } else {
                  navigate("/login", {
                    state: {
                      background: location,
                      replace: true, // This is the key change
                    },
                  });
                }
              }}
              className="rounded-full bg-theme-primary p-2 cursor-pointer hover:bg-theme-secondary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="21"
                viewBox="0 0 22 21"
                fill="none"
              >
                <path
                  d="M11 19L9.83816 17.9602C8.09325 16.3843 6.65026 15.0301 5.50921 13.8976C4.36816 12.765 3.46395 11.757 2.79658 10.8736C2.12921 9.99035 1.66298 9.18458 1.39789 8.45627C1.13263 7.72814 1 6.98926 1 6.23964C1 4.75246 1.50368 3.50734 2.51105 2.5043C3.5186 1.50143 4.7693 1 6.26316 1C7.18211 1 8.05053 1.21395 8.86842 1.64186C9.68632 2.06976 10.3968 2.68341 11 3.4828C11.6032 2.68341 12.3137 2.06976 13.1316 1.64186C13.9495 1.21395 14.8179 1 15.7368 1C17.2307 1 18.4814 1.50143 19.4889 2.5043C20.4963 3.50734 21 4.75246 21 6.23964C21 6.98926 20.8674 7.72814 20.6021 8.45627C20.337 9.18458 19.8708 9.99035 19.2034 10.8736C18.5361 11.757 17.6335 12.765 16.4958 13.8976C15.3582 15.0301 13.9136 16.3843 12.1618 17.9602L11 19Z"
                  stroke="#1B1B11"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <NearestPlaceHomeCard item={selectedPlace} />
        </div>
        <ShareModal isOpen={showShare} onClose={() => setshowShare(false)} />
      </div>
    </div>
  );
}
