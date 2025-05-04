import  { useState } from 'react';
import { X, Camera, Check, AlertTriangle } from 'lucide-react';

interface Vehicle {
  id?: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  description: string;
  available: boolean;
  location: string;
  category: string;
  features: string[];
}

interface AdminVehicleFormProps {
  onSubmit: (vehicle: Vehicle) => void;
  onCancel: () => void;
  initialData?: Vehicle;
}

export const AdminVehicleForm = ({ onSubmit, onCancel, initialData }: AdminVehicleFormProps) => {
  const [formData, setFormData] = useState<Vehicle>(
    initialData || {
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: '',
      description: '',
      available: true,
      location: 'Kigali',
      category: 'suv',
      features: []
    }
  );
  
  const [newFeature, setNewFeature] = useState('');
  const [validationError, setValidationError] = useState('');
  const [previewImage, setPreviewImage] = useState(formData.image);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value)
      }));
    } else if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (name === 'image') {
      setPreviewImage(value);
    }
  };
  
  const addFeature = () => {
    if (!newFeature.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));
    
    setNewFeature('');
  };
  
  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = (): boolean => {
    if (!formData.name || !formData.brand || !formData.model || !formData.image || !formData.description) {
      setValidationError('All fields marked with * are required');
      return false;
    }
    
    if (formData.price <= 0) {
      setValidationError('Price must be greater than 0');
      return false;
    }
    
    if (formData.year < 2000 || formData.year > new Date().getFullYear() + 1) {
      setValidationError('Please enter a valid year');
      return false;
    }
    
    if (!formData.image.startsWith('http')) {
      setValidationError('Please enter a valid image URL');
      return false;
    }
    
    setValidationError('');
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {validationError && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Basic Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Vehicle Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input w-full"
              placeholder="e.g. Luxury SUV Safari"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g. Toyota"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g. Land Cruiser"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="input w-full"
                min="2000"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($/day) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="input w-full"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Seats
              </label>
              <input
                type="number"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="input w-full"
                min="1"
                max="20"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="input w-full"
                placeholder="e.g. Kigali"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
            />
            <label htmlFor="available" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Available for booking
            </label>
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            Additional Details
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="input w-full"
              >
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="economy">Economy</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
              <option value="sports">Sports</option>
              <option value="van">Van</option>
              <option value="pickup">Pickup</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input w-full"
              rows={3}
              placeholder="Describe the vehicle..."
              required
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Vehicle Features
            </label>
            <div className="flex">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="input w-full"
                placeholder="e.g. Leather Seats"
              />
              <button
                type="button"
                onClick={addFeature}
                className="ml-2 px-4 py-2 bg-accent text-primary rounded-md hover:bg-accent-light"
              >
                Add
              </button>
            </div>
            
            {formData.features.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          Vehicle Image
        </h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL *
            </label>
            <div className="relative">
              <Camera className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input w-full pl-10"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Enter the URL of the vehicle image. For best results, use images with a 16:9 aspect ratio.
            </p>
          </div>
          
          <div className="md:w-1/2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image Preview
            </label>
            <div className="h-48 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Vehicle Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewImage('')}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
                  <span>No image preview</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-accent"
        >
          {initialData ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </div>
    </form>
  );
};
 