import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  Star,
  Image as ImageIcon
} from 'lucide-react';
import axios from 'axios';

const AdminTourForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    destinations: [''],
    duration: { days: 1, nights: 0 },
    price: '',
    originalPrice: '',
    images: [{ url: '', caption: '' }],
    tourType: 'Cultural',
    difficulty: 'Easy',
    groupSize: { min: 1, max: 20 },
    ageLimit: { min: 0, max: 100 },
    inclusions: [''],
    exclusions: [''],
    itinerary: [{ day: 1, title: '', description: '', activities: [''], meals: [''], accommodation: '' }],
    highlights: [''],
    startDates: [''],
    endDates: [''],
    accommodation: '',
    meals: [''],
    transport: '',
    packingList: [''],
    cancellationPolicy: '',
    refundPolicy: '',
    safetyMeasures: [''],
    bestSeason: '',
    documentsRequired: [''],
    featured: false,
    status: 'Active',
    video:''
  });

  const tourTypes = ['Adventure', 'Cultural', 'Beach', 'Mountain', 'Wildlife', 'Religious', 'City', 'Honeymoon'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Expert'];
  const statuses = ['Active', 'Inactive', 'Draft'];

  useEffect(() => {
    if (isEditing) {
      fetchTourData();
    }
  }, [id, isEditing]);

  const fetchTourData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/tours/${id}`);
      const tour = response.data;
      
      // Format dates for input fields
      const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : '';
      
      setFormData({
        ...tour,
        startDates: tour.startDates.map(formatDate),
        endDates: tour.endDates.map(formatDate),
        price: tour.price.toString(),
        originalPrice: tour.originalPrice?.toString() || ''
      });
    } catch (error) {
      console.error('Error fetching tour data:', error);
      alert('Failed to load tour data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? parseInt(value) || 0 : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => 
        i === index ? { ...img, [field]: value } : img
      )
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleItineraryArrayChange = (dayIndex, field, itemIndex, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) => 
        i === dayIndex ? {
          ...day,
          [field]: day[field].map((item, j) => j === itemIndex ? value : item)
        } : day
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: prev.itinerary.length + 1,
        title: '',
        description: '',
        activities: [''],
        meals: [''],
        accommodation: ''
      }]
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Tour title is required');
      return false;
    }
    if (!formData.description.trim()) {
      alert('Tour description is required');
      return false;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Valid price is required');
      return false;
    }
    if (formData.destinations.filter(d => d.trim()).length === 0) {
      alert('At least one destination is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSaving(true);
    
    try {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        destinations: formData.destinations.filter(d => d.trim()),
        inclusions: formData.inclusions.filter(i => i.trim()),
        exclusions: formData.exclusions.filter(e => e.trim()),
        highlights: formData.highlights.filter(h => h.trim()),
        packingList: formData.packingList.filter(p => p.trim()),
        safetyMeasures: formData.safetyMeasures.filter(s => s.trim()),
        documentsRequired: formData.documentsRequired.filter(d => d.trim()),
        meals: formData.meals.filter(m => m.trim()),
        images: formData.images.filter(img => img.url.trim()),
        startDates: formData.startDates.filter(d => d).map(d => new Date(d)),
        endDates: formData.endDates.filter(d => d).map(d => new Date(d))
      };

      if (isEditing) {
        await axios.put(`/tours/${id}`, submitData);
        alert('Tour updated successfully!');
      } else {
        await axios.post('/tours', submitData);
        alert('Tour created successfully!');
      }
      
      navigate('/admin/tours');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save tour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/tours')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Tour' : 'Create New Tour'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Update tour information' : 'Add a new tour package to your catalog'}
            </p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
          ) : (
            <Save className="h-5 w-5 mr-2" />
          )}
          {saving ? 'Saving...' : 'Save Tour'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter tour title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Brief description for tour cards"
              />
            </div>
             <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
               Youtube URL *
              </label>
              <input
                type="text"
                name="video"
                value={formData.video}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="https://youtu.be/..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Detailed tour description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tour Type *
              </label>
              <select
                name="tourType"
                value={formData.tourType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {tourTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {difficulties.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
              />
              <label className="ml-2 text-sm text-gray-700">Featured Tour</label>
            </div>
          </div>
        </div>

        {/* Destinations */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="h-6 w-6 mr-2 text-yellow-500" />
            Destinations
          </h2>
          
          {formData.destinations.map((destination, index) => (
            <div key={index} className="flex items-center space-x-2 mb-3">
              <input
                type="text"
                value={destination}
                onChange={(e) => handleArrayChange('destinations', index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Enter destination"
              />
              {formData.destinations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem('destinations', index)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('destinations')}
            className="text-yellow-600 hover:text-yellow-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Destination
          </button>
        </div>

        {/* Duration and Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <DollarSign className="h-6 w-6 mr-2 text-yellow-500" />
            Duration & Pricing
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Days *
              </label>
              <input
                type="number"
                name="duration.days"
                value={formData.duration.days}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nights *
              </label>
              <input
                type="number"
                name="duration.nights"
                value={formData.duration.nights}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Group Size and Age Limit */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Users className="h-6 w-6 mr-2 text-yellow-500" />
            Group Size & Age Limit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Group Size
              </label>
              <input
                type="number"
                name="groupSize.min"
                value={formData.groupSize.min}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Group Size *
              </label>
              <input
                type="number"
                name="groupSize.max"
                value={formData.groupSize.max}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Age
              </label>
              <input
                type="number"
                name="ageLimit.min"
                value={formData.ageLimit.min}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Age
              </label>
              <input
                type="number"
                name="ageLimit.max"
                value={formData.ageLimit.max}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <ImageIcon className="h-6 w-6 mr-2 text-yellow-500" />
            Tour Images
          </h2>
          
          {formData.images.map((image, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={image.url}
                  onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Image caption"
                  />
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('images', index)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={() => addArrayItem('images', { url: '', caption: '' })}
            className="text-yellow-600 hover:text-yellow-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Image
          </button>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Inclusions</h3>
            {formData.inclusions.map((inclusion, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={inclusion}
                  onChange={(e) => handleArrayChange('inclusions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="What's included"
                />
                {formData.inclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('inclusions', index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('inclusions')}
              className="text-yellow-600 hover:text-yellow-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Inclusion
            </button>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Exclusions</h3>
            {formData.exclusions.map((exclusion, index) => (
              <div key={index} className="flex items-center space-x-2 mb-3">
                <input
                  type="text"
                  value={exclusion}
                  onChange={(e) => handleArrayChange('exclusions', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="What's not included"
                />
                {formData.exclusions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem('exclusions', index)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('exclusions')}
              className="text-yellow-600 hover:text-yellow-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Exclusion
            </button>
          </div>
        </div>

        {/* Tour Details */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tour Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accommodation
              </label>
              <input
                type="text"
                name="accommodation"
                value={formData.accommodation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Type of accommodation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transport
              </label>
              <input
                type="text"
                name="transport"
                value={formData.transport}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Mode of transport"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best Season
              </label>
              <input
                type="text"
                name="bestSeason"
                value={formData.bestSeason}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Best time to visit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Policy
              </label>
              <input
                type="text"
                name="cancellationPolicy"
                value={formData.cancellationPolicy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Cancellation terms"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Policy
              </label>
              <input
                type="text"
                name="refundPolicy"
                value={formData.refundPolicy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                placeholder="Refund terms"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/tours')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={saving}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2"></div>
            ) : (
              <Save className="h-5 w-5 mr-2" />
            )}
            {saving ? 'Saving...' : (isEditing ? 'Update Tour' : 'Create Tour')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTourForm;