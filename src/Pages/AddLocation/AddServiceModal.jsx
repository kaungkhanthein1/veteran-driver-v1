import React, { useState } from 'react';

const AddServiceModal = ({ isOpen, onClose, onAdd }) => {
  const [serviceData, setServiceData] = useState({
    name: '',
    price: ''
  });

  const handleSubmit = () => {
    if (serviceData.name && serviceData.price) {
      onAdd(serviceData);
      setServiceData({ name: '', price: '' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[1000]" 
        onClick={onClose}
      />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[1001] bg-theme-primary rounded-2xl">
        <div className="p-6">
          <h3 className="text-theme-primary text-xl font-medium mb-2">Add Service and price</h3>
          <p className="text-theme-secondary text-sm mb-6">
            Please enter the service you want to offer and its price in USD.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-theme-primary text-sm mb-1">
                Service Type <span className="text-[#FDC51B]">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the name of the service"
                className="w-full bg-theme-secondary border border-theme rounded-lg px-4 py-3 text-sm text-theme-primary placeholder-theme-secondary"
                value={serviceData.name}
                onChange={(e) => setServiceData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-theme-primary text-sm mb-1">
                Service Price (USD)
              </label>
              <input
                type="number"
                placeholder="Enter the price of the service"
                className="w-full bg-theme-secondary border border-theme rounded-lg px-4 py-3 text-sm text-theme-primary placeholder-theme-secondary"
                value={serviceData.price}
                onChange={(e) => setServiceData(prev => ({ ...prev, price: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 text-theme-primary text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`flex-1 py-3 text-base font-medium rounded-lg ${
                serviceData.name && serviceData.price
                  ? 'bg-[#FDC51B] text-black'
                  : 'bg-theme-secondary text-theme-secondary'
              }`}
              disabled={!serviceData.name || !serviceData.price}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddServiceModal;