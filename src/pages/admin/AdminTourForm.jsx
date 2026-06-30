import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Save, Plus, Trash2, MapPin, DollarSign,
  Users, Image as ImageIcon, Clock, Shield, FileText,
  Utensils, Car, Star, ChevronDown, ChevronUp, Youtube,
  Upload, File as FileIcon, X, Download
} from 'lucide-react';
import axios from 'axios';

// ─── Reusable Components ───────────────────────────────────────────────────────

const SectionCard = ({ icon: Icon, title, children, color = 'yellow' }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
    <div className={`bg-${color}-50 border-b border-${color}-100 px-6 py-4 flex items-center gap-3`}>
      {Icon && <Icon className={`h-5 w-5 text-${color}-600`} />}
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-red-400 ml-1">*</span>}
  </label>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white ${props.className || ''}`}
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white appearance-none"
  >
    {children}
  </select>
);

const Textarea = (props) => (
  <textarea
    {...props}
    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white resize-none"
  />
);

const AddButton = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
  >
    <Plus className="h-3.5 w-3.5" /> {label}
  </button>
);

const RemoveButton = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
  >
    <Trash2 className="h-4 w-4" />
  </button>
);

const SimpleArrayField = ({ field, values, onChange, onAdd, onRemove, placeholder }) => (
  <div className="space-y-2">
    {values.map((val, i) => (
      <div key={i} className="flex items-center gap-2">
        <Input
          type="text"
          value={val}
          onChange={(e) => onChange(field, i, e.target.value)}
          placeholder={placeholder}
        />
        {values.length > 1 && <RemoveButton onClick={() => onRemove(field, i)} />}
      </div>
    ))}
    <AddButton onClick={() => onAdd(field)} label={`Add ${placeholder}`} />
  </div>
);

// ─── Collapsible Itinerary Day ─────────────────────────────────────────────────

const ItineraryDay = ({ day, index, onChange, onArrayChange, onAddArrayItem, onRemoveArrayItem, onRemoveDay }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div
        className="flex items-center justify-between px-4 py-3 bg-gray-50 cursor-pointer"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-sm font-semibold text-gray-700">
          Day {day.day}{day.title ? ` — ${day.title}` : ''}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={(e) => { e.stopPropagation(); onRemoveDay(index); }} className="p-1 text-gray-300 hover:text-red-500 rounded">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </div>
      </div>

      {open && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Day Title</Label>
              <Input type="text" value={day.title} onChange={(e) => onChange(index, 'title', e.target.value)} placeholder="e.g. Arrival & City Tour" />
            </div>
            <div>
              <Label>Accommodation</Label>
              <Input type="text" value={day.accommodation} onChange={(e) => onChange(index, 'accommodation', e.target.value)} placeholder="Hotel/Resort name" />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea rows={3} value={day.description} onChange={(e) => onChange(index, 'description', e.target.value)} placeholder="What happens on this day?" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Activities</Label>
              {day.activities.map((act, j) => (
                <div key={j} className="flex gap-2 mb-2">
                  <Input type="text" value={act} onChange={(e) => onArrayChange(index, 'activities', j, e.target.value)} placeholder="Activity" />
                  {day.activities.length > 1 && <RemoveButton onClick={() => onRemoveArrayItem(index, 'activities', j)} />}
                </div>
              ))}
              <AddButton onClick={() => onAddArrayItem(index, 'activities')} label="Add Activity" />
            </div>

            <div>
              <Label>Meals</Label>
              {day.meals.map((meal, j) => (
                <div key={j} className="flex gap-2 mb-2">
                  <Select value={meal} onChange={(e) => onArrayChange(index, 'meals', j, e.target.value)}>
                    <option value="">Select meal</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Snacks</option>
                  </Select>
                  {day.meals.length > 1 && <RemoveButton onClick={() => onRemoveArrayItem(index, 'meals', j)} />}
                </div>
              ))}
              <AddButton onClick={() => onAddArrayItem(index, 'meals')} label="Add Meal" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Itinerary File Upload ──────────────────────────────────────────────────────

const ItineraryFileUpload = ({ existingFile, selectedFile, onFileSelect, onClearSelected, onRemoveExisting, uploading }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedExt = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExt.includes(ext)) {
      alert('Only PDF and Word documents (.pdf, .doc, .docx) are allowed');
      e.target.value = '';
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      alert('File size must be under 10MB');
      e.target.value = '';
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className="space-y-3">
      <Label>Upload Itinerary Document (PDF / DOC)</Label>

      {/* Existing file (already saved on the tour) */}
      {existingFile?.url && !selectedFile && (
        <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50">
          <div className="flex items-center gap-2 min-w-0">
            <FileIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <a
              href={existingFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-yellow-600 truncate underline-offset-2 hover:underline"
            >
              {existingFile.originalName || 'Itinerary file'}
            </a>
            <a href={existingFile.url} download className="p-1 text-gray-400 hover:text-gray-600 flex-shrink-0">
              <Download className="h-3.5 w-3.5" />
            </a>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 px-2"
            >
              Replace
            </button>
            <RemoveButton onClick={onRemoveExisting} />
          </div>
        </div>
      )}

      {/* Newly selected file, not yet uploaded */}
      {selectedFile && (
        <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-xl bg-yellow-50">
          <div className="flex items-center gap-2 min-w-0">
            <FileIcon className="h-4 w-4 text-yellow-600 flex-shrink-0" />
            <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
            <span className="text-xs text-gray-400 flex-shrink-0">
              ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </span>
          </div>
          <button type="button" onClick={onClearSelected} className="p-1 text-gray-400 hover:text-red-500 flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Dropzone / picker, shown when nothing is selected/saved yet */}
      {!selectedFile && !existingFile?.url && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 cursor-pointer hover:border-yellow-300 hover:bg-yellow-50/40 transition-colors"
        >
          <Upload className="h-6 w-6 text-gray-400" />
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-yellow-600">Click to upload</span> itinerary document
          </p>
          <p className="text-xs text-gray-400">PDF, DOC, or DOCX — max 10MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {uploading && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="animate-spin h-3.5 w-3.5 border-2 border-yellow-400 border-t-transparent rounded-full" />
          Uploading itinerary file...
        </div>
      )}
    </div>
  );
};

// ─── Main Form ─────────────────────────────────────────────────────────────────

const AdminTourForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingItinerary, setUploadingItinerary] = useState(false);

  // File the admin has picked locally but not yet uploaded
  const [selectedItineraryFile, setSelectedItineraryFile] = useState(null);
  // Whether the admin wants to remove an already-saved itinerary file
  const [removeExistingItinerary, setRemoveExistingItinerary] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    video: '',
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
    itineraryFile: null, // { url, originalName, uploadedAt }
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
  });

  const tourTypes = ['Adventure', 'Cultural', 'Beach', 'Mountain', 'Wildlife', 'Religious', 'City', 'Honeymoon'];
  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Expert'];
  const statuses = ['Active', 'Inactive', 'Draft'];
  const seasons = ['January–March', 'April–June', 'July–September', 'October–December', 'Year Round'];

  useEffect(() => {
    if (isEditing) fetchTourData();
  }, [id]);

  const fetchTourData = async () => {
    try {
      setLoading(true);
      const { data: tour } = await axios.get(`/tours/${id}`);
      const fmt = (d) => d ? new Date(d).toISOString().split('T')[0] : '';
      setFormData({
        ...tour,
        startDates: tour.startDates.map(fmt),
        endDates: tour.endDates.map(fmt),
        price: tour.price.toString(),
        originalPrice: tour.originalPrice?.toString() || '',
        itineraryFile: tour.itineraryFile || null,
      });
    } catch {
      alert('Failed to load tour data');
    } finally {
      setLoading(false);
    }
  };

  // ── Handlers ──────────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: type === 'number' ? parseInt(value) || 0 : value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleArrayChange = (field, index, value) =>
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));

  const addArrayItem = (field, def = '') =>
    setFormData(prev => ({ ...prev, [field]: [...prev[field], def] }));

  const removeArrayItem = (field, index) =>
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));

  const handleImageChange = (index, field, value) =>
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? { ...img, [field]: value } : img)
    }));

  const handleItineraryChange = (index, field, value) =>
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));

  const handleItineraryArrayChange = (dayIdx, field, itemIdx, value) =>
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === dayIdx ? { ...day, [field]: day[field].map((v, j) => j === itemIdx ? value : v) } : day
      )
    }));

  const addItineraryArrayItem = (dayIdx, field) =>
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === dayIdx ? { ...day, [field]: [...day[field], ''] } : day
      )
    }));

  const removeItineraryArrayItem = (dayIdx, field, itemIdx) =>
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((day, i) =>
        i === dayIdx ? { ...day, [field]: day[field].filter((_, j) => j !== itemIdx) } : day
      )
    }));

  const addItineraryDay = () =>
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, {
        day: prev.itinerary.length + 1, title: '', description: '',
        activities: [''], meals: [''], accommodation: ''
      }]
    }));

  const removeItineraryDay = (index) =>
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary
        .filter((_, i) => i !== index)
        .map((day, i) => ({ ...day, day: i + 1 }))
    }));

  // ── Itinerary file handlers ─────────────────────────────────────────────────
  // No network calls here — the file just sits in local state and travels
  // along with the rest of the form in a single multipart request on submit.

  const handleItineraryFileSelect = (file) => {
    setSelectedItineraryFile(file);
    setRemoveExistingItinerary(false);
  };

  const handleClearSelectedItinerary = () => setSelectedItineraryFile(null);

  const handleRemoveExistingItinerary = () => {
    setRemoveExistingItinerary(true);
    setSelectedItineraryFile(null);
    setFormData(prev => ({ ...prev, itineraryFile: null }));
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const validateForm = () => {
    if (!formData.title.trim()) { alert('Tour title is required'); return false; }
    if (!formData.description.trim()) { alert('Description is required'); return false; }
    if (!formData.price || parseFloat(formData.price) <= 0) { alert('Valid price is required'); return false; }
    if (!formData.destinations.filter(d => d.trim()).length) { alert('At least one destination required'); return false; }
    return true;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!validateForm()) return;
    setSaving(true);
    try {
      const clean = (arr) => arr.filter(v => (typeof v === 'string' ? v.trim() : v));
      const { itineraryFile, ...rest } = formData;
      const submitData = {
        ...rest,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
        destinations: clean(formData.destinations),
        inclusions: clean(formData.inclusions),
        exclusions: clean(formData.exclusions),
        highlights: clean(formData.highlights),
        packingList: clean(formData.packingList),
        safetyMeasures: clean(formData.safetyMeasures),
        documentsRequired: clean(formData.documentsRequired),
        meals: clean(formData.meals),
        images: formData.images.filter(img => img.url.trim()),
        startDates: formData.startDates.filter(Boolean).map(d => new Date(d)),
        endDates: formData.endDates.filter(Boolean).map(d => new Date(d)),
        itinerary: formData.itinerary.map(day => ({
          ...day,
          activities: clean(day.activities),
          meals: clean(day.meals),
        })),
      };

      let savedTourId = id;

      if (isEditing) {
        await axios.put(`/tours/${id}`, submitData);
      } else {
        const { data: created } = await axios.post('/tours', submitData);
        savedTourId = created._id;
      }

      // Handle itinerary file changes after the tour record exists
      if (selectedItineraryFile) {
        await uploadItineraryFile(savedTourId);
      } else if (removeExistingItinerary) {
        await deleteExistingItineraryFile(savedTourId);
      }

      alert(isEditing ? 'Tour updated successfully!' : 'Tour created successfully!');
      navigate('/admin/tours');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save tour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent" />
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">

      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 z-10 bg-gray-50 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/admin/tours')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Tour' : 'Create Tour'}</h1>
            <p className="text-xs text-gray-500">{isEditing ? 'Update tour details' : 'Add a new package'}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate('/admin/tours')} className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} disabled={saving || uploadingItinerary}
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl transition-colors disabled:opacity-50">
            {saving ? <div className="animate-spin h-4 w-4 border-2 border-gray-900 border-t-transparent rounded-full" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : (isEditing ? 'Update Tour' : 'Create Tour')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── 1. Basic Info ── */}
        <SectionCard icon={FileText} title="Basic Information">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <Label required>Tour Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Kerala Backwaters & Hills 7D/6N" />
            </div>

            <div className="md:col-span-2">
              <Label required>Short Description</Label>
              <Input name="shortDescription" value={formData.shortDescription} onChange={handleChange} placeholder="One-line summary for listing cards" />
            </div>

            <div className="md:col-span-2">
              <Label required>Full Description</Label>
              <Textarea name="description" rows={5} value={formData.description} onChange={handleChange} placeholder="Detailed tour description..." />
            </div>

            <div>
              <Label required>Tour Type</Label>
              <Select name="tourType" value={formData.tourType} onChange={handleChange}>
                {tourTypes.map(t => <option key={t}>{t}</option>)}
              </Select>
            </div>

            <div>
              <Label>Difficulty</Label>
              <Select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                {difficulties.map(d => <option key={d}>{d}</option>)}
              </Select>
            </div>

            <div>
              <Label>Status</Label>
              <Select name="status" value={formData.status} onChange={handleChange}>
                {statuses.map(s => <option key={s}>{s}</option>)}
              </Select>
            </div>

            <div>
              <Label>Best Season</Label>
              <Select name="bestSeason" value={formData.bestSeason} onChange={handleChange}>
                <option value="">Select season</option>
                {seasons.map(s => <option key={s}>{s}</option>)}
              </Select>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange}
                className="w-4 h-4 rounded accent-yellow-500" />
              <label htmlFor="featured" className="text-sm font-medium text-yellow-800 cursor-pointer">
                ⭐ Mark as Featured Tour (shown on homepage)
              </label>
            </div>
          </div>
        </SectionCard>

        {/* ── 2. Media ── */}
        <SectionCard icon={Youtube} title="Media">
          <div className="space-y-5">
            <div>
              <Label>YouTube Video URL</Label>
              <Input name="video" value={formData.video} onChange={handleChange} placeholder="https://youtu.be/..." />
            </div>

            <div>
              <Label required>Tour Images</Label>
              <div className="space-y-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="md:col-span-3">
                      <Input type="url" value={image.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex gap-2">
                        <Input type="text" value={image.caption} onChange={(e) => handleImageChange(index, 'caption', e.target.value)} placeholder="Caption (optional)" />
                        {formData.images.length > 1 && <RemoveButton onClick={() => removeArrayItem('images', index)} />}
                      </div>
                    </div>
                    {image.url && (
                      <div className="md:col-span-5">
                        <img src={image.url} alt="preview" className="h-24 w-full object-cover rounded-lg" onError={e => e.target.style.display = 'none'} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <AddButton onClick={() => addArrayItem('images', { url: '', caption: '' })} label="Add Image" />
            </div>
          </div>
        </SectionCard>

        {/* ── 3. Destinations ── */}
        <SectionCard icon={MapPin} title="Destinations">
          <SimpleArrayField
            field="destinations" values={formData.destinations}
            onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
            placeholder="Destination name"
          />
        </SectionCard>

        {/* ── 4. Duration & Pricing ── */}
        <SectionCard icon={DollarSign} title="Duration & Pricing">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <Label required>Days</Label>
              <Input type="number" name="duration.days" value={formData.duration.days} onChange={handleChange} min="1" />
            </div>
            <div>
              <Label required>Nights</Label>
              <Input type="number" name="duration.nights" value={formData.duration.nights} onChange={handleChange} min="0" />
            </div>
            <div>
              <Label required>Price (₹)</Label>
              <Input type="number" name="price" value={formData.price} onChange={handleChange} min="0" placeholder="15000" />
            </div>
            <div>
              <Label>Original Price (₹)</Label>
              <Input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} min="0" placeholder="18000" />
            </div>
          </div>
          {formData.price && formData.originalPrice && parseFloat(formData.originalPrice) > parseFloat(formData.price) && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-lg">
              <span className="text-xs font-bold text-green-700">
                {Math.round((1 - parseFloat(formData.price) / parseFloat(formData.originalPrice)) * 100)}% OFF
              </span>
              <span className="text-xs text-green-600">discount badge will show automatically</span>
            </div>
          )}
        </SectionCard>

        {/* ── 5. Dates ── */}
        <SectionCard icon={Clock} title="Available Dates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Start Dates</Label>
              {formData.startDates.map((date, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input type="date" value={date} onChange={(e) => handleArrayChange('startDates', i, e.target.value)} />
                  {formData.startDates.length > 1 && <RemoveButton onClick={() => removeArrayItem('startDates', i)} />}
                </div>
              ))}
              <AddButton onClick={() => addArrayItem('startDates')} label="Add Start Date" />
            </div>
            <div>
              <Label>End Dates</Label>
              {formData.endDates.map((date, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <Input type="date" value={date} onChange={(e) => handleArrayChange('endDates', i, e.target.value)} />
                  {formData.endDates.length > 1 && <RemoveButton onClick={() => removeArrayItem('endDates', i)} />}
                </div>
              ))}
              <AddButton onClick={() => addArrayItem('endDates')} label="Add End Date" />
            </div>
          </div>
        </SectionCard>

        {/* ── 6. Group & Age ── */}
        <SectionCard icon={Users} title="Group Size & Age Limit">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <Label>Min Group</Label>
              <Input type="number" name="groupSize.min" value={formData.groupSize.min} onChange={handleChange} min="1" />
            </div>
            <div>
              <Label required>Max Group</Label>
              <Input type="number" name="groupSize.max" value={formData.groupSize.max} onChange={handleChange} min="1" />
            </div>
            <div>
              <Label>Min Age</Label>
              <Input type="number" name="ageLimit.min" value={formData.ageLimit.min} onChange={handleChange} min="0" />
            </div>
            <div>
              <Label>Max Age</Label>
              <Input type="number" name="ageLimit.max" value={formData.ageLimit.max} onChange={handleChange} min="0" />
            </div>
          </div>
        </SectionCard>

        {/* ── 7. Highlights ── */}
        <SectionCard icon={Star} title="Tour Highlights">
          <SimpleArrayField
            field="highlights" values={formData.highlights}
            onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
            placeholder="e.g. Sunset boat ride on backwaters"
          />
        </SectionCard>

        {/* ── 8. Inclusions & Exclusions ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard title="✅ Inclusions">
            <SimpleArrayField
              field="inclusions" values={formData.inclusions}
              onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
              placeholder="e.g. Breakfast & dinner"
            />
          </SectionCard>
          <SectionCard title="❌ Exclusions">
            <SimpleArrayField
              field="exclusions" values={formData.exclusions}
              onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
              placeholder="e.g. Flights & visa"
            />
          </SectionCard>
        </div>

        {/* ── 9. Itinerary ── */}
        <SectionCard icon={Clock} title="Itinerary">
          <div className="space-y-3">
            {formData.itinerary.map((day, index) => (
              <ItineraryDay
                key={index}
                day={day}
                index={index}
                onChange={handleItineraryChange}
                onArrayChange={handleItineraryArrayChange}
                onAddArrayItem={addItineraryArrayItem}
                onRemoveArrayItem={removeItineraryArrayItem}
                onRemoveDay={removeItineraryDay}
              />
            ))}
          </div>
          <AddButton onClick={addItineraryDay} label={`Add Day ${formData.itinerary.length + 1}`} />

          <div className="mt-6 pt-6 border-t border-gray-100">
            <ItineraryFileUpload
              existingFile={formData.itineraryFile}
              selectedFile={selectedItineraryFile}
              onFileSelect={handleItineraryFileSelect}
              onClearSelected={handleClearSelectedItinerary}
              onRemoveExisting={handleRemoveExistingItinerary}
              uploading={uploadingItinerary}
            />
            <p className="mt-2 text-xs text-gray-400">
              Optional: upload a detailed PDF/Word itinerary. It's saved when you click "{isEditing ? 'Update Tour' : 'Create Tour'}" below.
            </p>
          </div>
        </SectionCard>

        {/* ── 10. Logistics ── */}
        <SectionCard icon={Car} title="Logistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label required>Accommodation</Label>
              <Input name="accommodation" value={formData.accommodation} onChange={handleChange} placeholder="e.g. 3-star hotels & resorts" />
            </div>
            <div>
              <Label required>Transport</Label>
              <Input name="transport" value={formData.transport} onChange={handleChange} placeholder="e.g. AC coach, ferry" />
            </div>
          </div>
        </SectionCard>

        {/* ── 11. Meals ── */}
        <SectionCard icon={Utensils} title="Meals Included">
          <div className="space-y-2">
            {formData.meals.map((meal, i) => (
              <div key={i} className="flex gap-2">
                <Select value={meal} onChange={(e) => handleArrayChange('meals', i, e.target.value)}>
                  <option value="">Select meal</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                  <option>All Meals</option>
                </Select>
                {formData.meals.length > 1 && <RemoveButton onClick={() => removeArrayItem('meals', i)} />}
              </div>
            ))}
            <AddButton onClick={() => addArrayItem('meals')} label="Add Meal" />
          </div>
        </SectionCard>

        {/* ── 12. Lists ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCard title="🎒 Packing List">
            <SimpleArrayField
              field="packingList" values={formData.packingList}
              onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
              placeholder="e.g. Sunscreen, trekking shoes"
            />
          </SectionCard>
          <SectionCard title="📄 Documents Required">
            <SimpleArrayField
              field="documentsRequired" values={formData.documentsRequired}
              onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
              placeholder="e.g. Aadhar card, passport"
            />
          </SectionCard>
        </div>

        {/* ── 13. Safety ── */}
        <SectionCard icon={Shield} title="Safety Measures">
          <SimpleArrayField
            field="safetyMeasures" values={formData.safetyMeasures}
            onChange={handleArrayChange} onAdd={addArrayItem} onRemove={removeArrayItem}
            placeholder="e.g. First aid kit on all trips"
          />
        </SectionCard>

        {/* ── 14. Policies ── */}
        <SectionCard icon={FileText} title="Policies">
          <div className="space-y-5">
            <div>
              <Label required>Cancellation Policy</Label>
              <Textarea name="cancellationPolicy" rows={3} value={formData.cancellationPolicy} onChange={handleChange}
                placeholder="e.g. Full refund if cancelled 30+ days before departure..." />
            </div>
            <div>
              <Label required>Refund Policy</Label>
              <Textarea name="refundPolicy" rows={3} value={formData.refundPolicy} onChange={handleChange}
                placeholder="e.g. Refunds processed within 7–10 business days..." />
            </div>
          </div>
        </SectionCard>

        {/* ── Submit ── */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => navigate('/admin/tours')}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={saving || uploadingItinerary}
            className="flex items-center gap-2 px-7 py-2.5 text-sm font-bold bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl disabled:opacity-50">
            {saving ? <div className="animate-spin h-4 w-4 border-2 border-gray-900 border-t-transparent rounded-full" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : (isEditing ? 'Update Tour' : 'Create Tour')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTourForm;
