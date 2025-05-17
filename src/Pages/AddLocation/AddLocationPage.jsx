import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SetLocationIcon from '../../icons/SetLocation.svg';
import OpeningTime from './OpeningTime';
import ServiceAndPrice from './ServiceAndPrice';

const AddLocationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    mobileNumber: '',
    locationSet: false,
    openingTime: {
      is24Hours: false,
      timeSet: false,
      selectedDays: []
    },
    services: [],
    basicPrice: '',
    photos: [],
    document: null,
    agreementChecked: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation and submission logic will be implemented here
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newImages].slice(0, 10)
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleDocumentSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        document: {
          url: URL.createObjectURL(file),
          file: file
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#181818] text-white p-4">
      <div className="flex items-center mb-6">
        <button 
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">Add Location</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Please enter the name"
              className="w-full bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Description *</label>
            <input
              type="text"
              name="description"
              placeholder="Please enter the description"
              className="w-full bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Address *</label>
            <input
              type="text"
              name="address"
              placeholder="Please enter the address"
              className="w-full bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mobile number *</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Please enter the address"
              className="w-full bg-[#232323] rounded-lg px-4 py-3 text-sm"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
          </div>

          <button type="button" className="w-full bg-[#232323] rounded-lg px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src={SetLocationIcon} 
                alt="Set Location" 
                className="w-5 h-5 mr-2"
                style={{ filter: 'invert(76%) sepia(41%) saturate(845%) hue-rotate(338deg) brightness(101%) contrast(103%)' }}
              />
              <span>Set Location On Map</span>
            </div>
            <span className="text-gray-400">Not Set</span>
          </button>
        </div>

        {/* Opening Time Component */}
        <OpeningTime
          formData={formData}
          setFormData={setFormData}
        />

        {/* Service and Price Component */}
        <ServiceAndPrice
          formData={formData}
          setFormData={setFormData}
        />

        {/* Photo Upload */}
        <div>
          <label className="block text-sm mb-2">Share a picture of your location ({formData.photos.length}/10) *</label>
          <div className="grid grid-cols-5 gap-2">
            {formData.photos.map((image, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={image.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            {formData.photos.length < 10 && (
              <label className="aspect-square bg-[#232323] rounded-lg flex items-center justify-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </label>
            )}
          </div>
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-sm mb-2">Upload Document *</label>
          <p className="text-gray-400 text-xs mb-2">Upload Valid Certification & Documents</p>
          <label className="cursor-pointer block">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleDocumentSelect}
              className="hidden"
            />
            <div className="w-full aspect-square max-h-[100px] bg-[#232323] rounded-lg flex items-center justify-center">
              {formData.document ? (
                <div className="text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-[#FDC51B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-400">Document uploaded</span>
                </div>
              ) : (
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>
          </label>
        </div>

        {/* Agreement */}
        <div className="space-y-4">
          <p className="text-gray-400 text-xs">Note : Guest accounts are limited to share only 3 locations per day.</p>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreement"
              checked={formData.agreementChecked}
              onChange={(e) => setFormData(prev => ({ ...prev, agreementChecked: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="agreement" className="text-sm">I have read and agree to the upload guidelines.</label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#FDC51B] text-black rounded-lg py-3 font-medium"
          disabled={!formData.agreementChecked}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddLocationPage;