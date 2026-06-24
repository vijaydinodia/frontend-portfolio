import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const ExperienceForm = ({ experience, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: experience?.role || '',
    company: experience?.company || '',
    type: experience?.type || 'Full-time',
    startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
    endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    current: experience?.current || false,
    description: experience?.description || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role || !formData.company || !formData.startDate) {
      return alert("Role, Company, and Start Date are required");
    }

    setLoading(true);
    try {
      const payload = { ...formData };
      if (formData.current) {
        payload.endDate = null;
      }

      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (experience?._id) {
        await axios.put(`/api/experiences/${experience._id}`, payload, config);
      } else {
        await axios.post('/api/experiences', payload, config);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert(error.response?.data?.error || error.response?.data?.message || error.message || 'Error saving experience');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-xl relative max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold">{experience ? 'Edit Experience' : 'Add New Experience'}</h2>
        <button onClick={onCancel} className="text-textSecondary hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Role/Job Title *</label>
            <input name="role" value={formData.role} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Company/Organization *</label>
            <input name="company" value={formData.company} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Employment Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#111827] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="flex items-center mt-6">
            <input type="checkbox" name="current" checked={formData.current} onChange={handleChange} className="w-4 h-4 text-primary bg-white/5 border-white/10 rounded focus:ring-primary" />
            <label className="ml-2 text-sm font-medium text-textSecondary">I currently work here</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Start Date *</label>
            <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">End Date</label>
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} disabled={formData.current} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            <span className="text-xs text-textMuted mt-1 block">Leave blank if current</span>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors placeholder-white/30" placeholder="Describe your responsibilities and achievements..."></textarea>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors flex items-center">
            {loading ? 'Saving...' : 'Save Experience'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceForm;
