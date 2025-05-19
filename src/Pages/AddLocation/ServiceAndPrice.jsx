import React from 'react';
import FormInput from '../../components/FormInput';

const ServiceAndPrice = ({ formData, setFormData }) => {
  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', price: '' }]
    }));
  };

  const updateService = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const removeService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Services & Prices *</h2>
      
      <FormInput
            label="Best Price(USD)"
            name="price"
            placeholder="Please enter the price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />

      {formData.services.map((service, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Service name"
              className="flex-1 bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={service.name}
              onChange={(e) => updateService(index, 'name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-24 bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={service.price}
              onChange={(e) => updateService(index, 'price', e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeService(index)}
              className="text-red-500"
            >
              ×
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addService}
        className="w-full bg-[#232323] rounded-lg px-4 py-3 text-sm flex items-center justify-center gap-2"
      >
        <span>+</span>
        Add services
      </button>
    </div>
  );
};

export default ServiceAndPrice;