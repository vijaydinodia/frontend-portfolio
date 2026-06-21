import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';

const AchievementForm = ({ achievement, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(achievement?.imageUrl || '');
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: achievement?.title || '',
    description: achievement?.description || '',
    date: achievement?.date ? new Date(achievement.date).toISOString().split('T')[0] : '',
    category: achievement?.category || 'General',
    link: achievement?.link || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.description) {
      return alert("Title, Date, and Description are required");
    }

    setLoading(true);
    try {
      let imageUrl = imagePreview;

      // Handle Image Upload
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await axios.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        imageUrl = uploadRes.data.url;
      }

      // Format data
      const payload = { ...formData, imageUrl };

      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (achievement?._id) {
        await axios.put(`/api/achievements/${achievement._id}`, payload, config);
      } else {
        await axios.post('/api/achievements', payload, config);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert(error.response?.data?.message || 'Error saving achievement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-xl relative max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold">{achievement ? 'Edit Achievement' : 'Add New Achievement'}</h2>
        <button onClick={onCancel} className="text-textSecondary hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Achievement Title *</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Date *</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Category</label>
            <input name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="e.g. LeetCode, Certification" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Description *</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Associated Link (Optional)</label>
            <input name="link" value={formData.link} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Image/Certificate (Optional)</label>
            <div className="flex items-center space-x-4">
              {imagePreview && <img src={imagePreview} alt="Preview" className="h-20 w-32 object-cover rounded-lg border border-white/10" />}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  id="image-upload"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      setImagePreview(URL.createObjectURL(file));
                    }
                  }}
                />
                <label htmlFor="image-upload" className="inline-flex items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm">
                  <Upload size={18} className="mr-2" /> Upload Image
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors flex items-center">
            {loading ? 'Saving...' : 'Save Achievement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AchievementForm;
