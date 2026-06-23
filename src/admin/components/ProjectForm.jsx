import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';

const ProjectForm = ({ project, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(project?.thumbnail || '');
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    shortDescription: project?.shortDescription || '',
    fullDescription: project?.fullDescription || '',
    techStack: project?.techStack ? project.techStack.join(', ') : '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    status: project?.status || 'Completed',
    category: project?.category || 'Full Stack',
    displayOrder: project?.displayOrder !== undefined ? project.displayOrder : 0,
    featured: project?.featured || false,
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
    if (!formData.title) return alert("Title is required");

    setLoading(true);
    try {
      let thumbnail = imagePreview;

      // Handle Image Upload — gracefully skip if Cloudinary isn't configured
      if (imageFile) {
        try {
          const uploadData = new FormData();
          uploadData.append('image', imageFile);
          const uploadRes = await axios.post('/api/upload', uploadData, {
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
          });
          thumbnail = uploadRes.data.url;
        } catch (uploadErr) {
          console.warn('Image upload failed (Cloudinary not configured?). Saving without image.', uploadErr);
          thumbnail = ''; // skip image, don't block save
        }
      }

      // Format data
      const payload = {
        ...formData,
        displayOrder: Number(formData.displayOrder) || 0,
        techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
        thumbnail,
      };

      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (project?._id) {
        await axios.put(`/api/projects/${project._id}`, payload, config);
      } else {
        await axios.post('/api/projects', payload, config);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(`Error: ${error.response?.data?.message} - ${error.response?.data?.error || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-xl relative">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold">{project ? 'Edit Project' : 'Add New Project'}</h2>
        <button onClick={onCancel} className="text-textSecondary hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Title *</label>
            <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Slug *</label>
            <input name="slug" value={formData.slug} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Short Description *</label>
            <input name="shortDescription" value={formData.shortDescription} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Full Description</label>
            <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows="6" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-textSecondary mb-2">Cover Image</label>

            {/* Option 1: Paste image URL */}
            <input
              type="url"
              placeholder="Paste image URL (e.g. https://...)"
              value={imageFile ? '' : imagePreview}
              onChange={(e) => { setImagePreview(e.target.value); setImageFile(null); }}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors mb-3"
            />

            {/* Option 2: File upload (requires Cloudinary) */}
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
                    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
                  }}
                />
                <label htmlFor="image-upload" className="flex items-center justify-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors text-sm">
                  <Upload size={18} className="mr-2" /> Upload File (needs Cloudinary)
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Tech Stack (comma separated)</label>
            <input name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" placeholder="React, Node.js, MongoDB" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#111827] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Display Order</label>
            <input 
              type="number" 
              name="displayOrder" 
              value={formData.displayOrder} 
              onChange={handleChange} 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" 
              placeholder="0" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">GitHub URL</label>
            <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-2">Live URL</label>
            <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
          </div>

          <div className="flex items-center mt-6">
            <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 text-primary bg-white/5 border-white/10 rounded focus:ring-primary" />
            <label className="ml-2 text-sm font-medium text-textSecondary">Featured Project</label>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors flex items-center">
            {loading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
