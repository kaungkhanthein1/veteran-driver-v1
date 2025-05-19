import React from "react";
import './home.css'

const Service = () => {
  const services = ["service1", "service2", "service3", "service4"];

  return (
    <div className="flex gap-[6px] px-[14px]">
      {services.map((service, index) => (
        <div className="service_box px-[16px] py-[12px] text-theme-primary text-[14px] font-[500]" key={index}>
          {service}
        </div>
      ))}
    </div>
  );
};

export default Service;
