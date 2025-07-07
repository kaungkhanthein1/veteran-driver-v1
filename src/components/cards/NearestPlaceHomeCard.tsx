import { useTranslation } from "react-i18next";
import "./card.css"; // Ensure this path is correct based on your project structure

const NearestPlacHomeCard = ({ item }: any) => {
  const { t } = useTranslation();

  return (
    <div className="bg-theme-secondary rounded-2xl overflow-hidden">
      <div className="flex flex-col">
        <div className="mt-3 flex items-center gap-2">
          <h1 className="text-black place-name">{item.name}</h1>
          <span className="distance">({item?.distance}km away)</span>
        </div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            <span className="text-black text-[16px]">{item.rating}</span>
            {/* Star Icons (adjust based on rating) */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(item.rating)
                    ? "text-[#FFC61B]"
                    : "text-[#B5B5B5]"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="rat-count">({item.ratingCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="view-count">{item.viewCount}</span>
            <svg
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
            </svg>
          </div>
        </div>
        <div className="flex flex-wrap items-center mb-3">
          {item?.tags.map((tag: any, index: number) => (
            <span key={index} className="tag-div">
              {tag?.name}
            </span>
          ))}
        </div>
        {/* Image and Rank */}
        <div className="flex overflow-x-auto pb-4 space-x-2">
          {item?.photos.map((data: any, index: any) => (
            <div
              key={index}
              className={`flex-shrink-0 rounded-lg overflow-hidden ${
                index % 2 === 0 ? "w-[250px] h-[300px]" : "w-[200px]"
              }`}
            >
              {/* Even index - single large photo */}
              {index % 2 === 0 ? (
                <img src={data} className="w-full h-full object-cover" />
              ) : (
                /* Odd index - vertical stack of two photos */
                <div className="flex flex-col space-y-2">
                  <img
                    src={data}
                    className="w-[200px] h-[146px] object-cover"
                  />
                  {item?.photos[index + 1] && (
                    <img
                      src={item?.photos[index + 1]}
                      className="w-[200px] h-[146px] object-cover"
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1">
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
        <div className="mt-2">
          <p className="loc-des">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Exercitationem, vero laboriosam? Magnam culpa inventore quis,
            tempora quos animi quisquam dolore temporibus saepe, ducimus iusto,
            reiciendis consectetur enim veniam! Fuga, quibusdam! Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Exercitationem, vero
            laboriosam? Magnam culpa inventore quis, tempora quos animi quisquam
            dolore temporibus saepe, ducimus iusto, reiciendis consectetur enim
            veniam! Fuga, quibusdam!
          </p>
        </div>
        <div>
          <button className="check-btn mb-20 mt-5">
            {t("Check On Map")}
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
      </div>
    </div>
  );
};

export default NearestPlacHomeCard;
