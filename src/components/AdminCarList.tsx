import  { useState } from 'react';
import { Edit, Trash2, Check, X, Plus } from 'lucide-react';
import { Car } from '../types';
import { AdminVehicleForm } from './AdminVehicleForm';

interface AdminCarListProps {
  cars: Car[];
  onAddCar: (car: Car) => void;
  onEditCar: (car: Car) => void;
  onDeleteCar: (id: string) => void;
  onToggleAvailability: (id: string) => void;
}

export const AdminCarList = ({ 
  cars, 
  onAddCar, 
  onEditCar, 
  onDeleteCar, 
  onToggleAvailability 
}: AdminCarListProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deletingCar, setDeletingCar] = useState<Car | null>(null);
  
  const handleEdit = (car: Car) => {
    setEditingCar(car);
  };
  
  const handleDelete = (car: Car) => {
    setDeletingCar(car);
  };
  
  const confirmDelete = () => {
    if (deletingCar) {
      onDeleteCar(deletingCar.id);
      setDeletingCar(null);
    }
  };
  
  const handleAddSubmit = (car: Car) => {
    onAddCar(car);
    setShowAddForm(false);
  };
  
  const handleEditSubmit = (car: Car) => {
    onEditCar(car);
    setEditingCar(null);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-primary dark:text-white">Vehicle Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-accent flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Vehicle
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 p-6">
          <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Add New Vehicle
          </h3>
          <AdminVehicleForm 
            onSubmit={handleAddSubmit} 
            onCancel={() => setShowAddForm(false)} 
          />
        </div>
      )}
      
      {editingCar && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8 p-6">
          <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Edit Vehicle: {editingCar.brand} {editingCar.model}
          </h3>
          <AdminVehicleForm 
            onSubmit={handleEditSubmit} 
            onCancel={() => setEditingCar(null)} 
            initialData={editingCar}
          />
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Vehicle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {cars.map((car) => (
                <tr key={car.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-16 w-16 flex-shrink-0">
                        <img className="h-16 w-16 rounded-md object-cover" src={car.image} alt={car.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{car.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{car.brand} {car.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{car.year} • {car.seats} seats</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{car.transmission} • {car.fuelType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">${car.price}/day</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{car.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onToggleAvailability(car.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium 
                        ${car.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}
                    >
                      {car.available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(car)}
                        className="text-primary dark:text-white hover:text-accent transition-colors"
                        title="Edit vehicle"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(car)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete vehicle"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deletingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete {deletingCar.brand} {deletingCar.model}? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeletingCar(null)}
                  className="btn btn-outline border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 