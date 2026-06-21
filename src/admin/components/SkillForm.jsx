import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, RefreshCw, Upload } from 'lucide-react';

// Map common display names to correct Simple Icons slugs
const SLUG_OVERRIDES = {
  'react': 'react', 'react.js': 'react', 'reactjs': 'react',
  'node.js': 'nodedotjs', 'nodejs': 'nodedotjs',
  'next.js': 'nextdotjs', 'nextjs': 'nextdotjs',
  'vue.js': 'vuedotjs', 'vuejs': 'vuedotjs',
  'express': 'express', 'express.js': 'express',
  'mongodb': 'mongodb', 'mysql': 'mysql',
  'postgresql': 'postgresql', 'postgres': 'postgresql',
  'tailwind': 'tailwindcss', 'tailwindcss': 'tailwindcss',
  'typescript': 'typescript', 'javascript': 'javascript',
  'python': 'python', 'java': 'java',
  'c++': 'cplusplus', 'cpp': 'cplusplus', 'c#': 'csharp',
  'git': 'git', 'github': 'github', 'docker': 'docker',
  'aws': 'amazonaws', 'firebase': 'firebase', 'redux': 'redux',
  'graphql': 'graphql', 'html': 'html5', 'css': 'css3',
  'sass': 'sass', 'figma': 'figma', 'linux': 'linux',
  'nginx': 'nginx', 'redis': 'redis', 'prisma': 'prisma', 'vite': 'vite',
};

// Devicons slug map (different from Simple Icons)
const DEVICON_OVERRIDES = {
  'node.js': 'nodejs', 'nodejs': 'nodejs',
  'next.js': 'nextjs', 'nextjs': 'nextjs',
  'vue.js': 'vuejs', 'vuejs': 'vuejs',
  'express': 'express', 'express.js': 'express',
  'c++': 'cplusplus', 'cpp': 'cplusplus',
  'c#': 'csharp', 'tailwind': 'tailwindcss',
  'postgresql': 'postgresql', 'postgres': 'postgresql',
  'aws': 'amazonwebservices',
};

const getDeviconSlug = (name) => {
  const key = name.trim().toLowerCase();
  return DEVICON_OVERRIDES[key] || key.replace(/[^a-z0-9]/g, '');
};

const getSimpleSlug = (name) => {
  const key = name.trim().toLowerCase();
  return SLUG_OVERRIDES[key] || key.replace(/[^a-z0-9]/g, '');
};

// Returns all possible icon URLs for a given skill name
const buildIconSources = (name) => {
  if (!name.trim()) return [];
  const simple = getSimpleSlug(name);
  const devicon = getDeviconSlug(name);
  const base = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons`;
  return [
    { url: `${base}/${devicon}/${devicon}-original.svg`, label: 'Devicons (Original)', filter: false },
    { url: `${base}/${devicon}/${devicon}-plain.svg`, label: 'Devicons (Plain)', filter: false },
    { url: `${base}/${devicon}/${devicon}-original-wordmark.svg`, label: 'Devicons (Wordmark)', filter: false },
    { url: `https://cdn.simpleicons.org/${simple}`, label: 'Simple Icons', filter: true },
    { url: `${base}/${devicon}/${devicon}-plain-wordmark.svg`, label: 'Devicons (Plain Wordmark)', filter: false },
  ];
};

const SkillForm = ({ skill, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [iconSources, setIconSources] = useState([]);
  const [iconError, setIconError] = useState(false);
  const [spinning, setSpinning] = useState(false);

  // Upload state
  const [uploadMode, setUploadMode] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState('');
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || 'Frontend',
    experience: skill?.experience || '',
  });

  // Rebuild sources when name changes
  useEffect(() => {
    const sources = buildIconSources(formData.name);
    setIconSources(sources);
    setSourceIndex(0);
    setIconError(false);
    setUploadMode(false);
    setUploadedUrl('');
    setIconPreview('');
    setIconFile(null);
  }, [formData.name]);

  const currentSource = iconSources[sourceIndex];
  const currentIconUrl = uploadMode ? (uploadedUrl || iconPreview) : (iconError ? '' : currentSource?.url || '');
  const currentFilter = uploadMode ? false : (currentSource?.filter ?? true);

  const handleRefresh = () => {
    if (!iconSources.length) return;
    setSpinning(true);
    setIconError(false);
    setSourceIndex((prev) => (prev + 1) % iconSources.length);
    setTimeout(() => setSpinning(false), 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
      setUploadMode(true);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Name is required');
    setLoading(true);

    try {
      let finalIconUrl = currentIconUrl;

      // If user selected a file, upload it first
      if (iconFile && uploadMode) {
        const uploadData = new FormData();
        uploadData.append('image', iconFile);
        const token = localStorage.getItem('adminToken');
        const uploadRes = await axios.post('/api/upload', uploadData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        });
        finalIconUrl = uploadRes.data.url;
      }

      const payload = { ...formData, iconUrl: iconError && !uploadMode ? '' : finalIconUrl };
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (skill?._id) {
        await axios.put(`/api/skills/${skill._id}`, payload, config);
      } else {
        await axios.post('/api/skills', payload, config);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving skill:', error);
      alert(error.response?.data?.message || 'Error saving skill');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-xl relative max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold">{skill ? 'Edit Skill' : 'Add New Skill'}</h2>
        <button onClick={onCancel} className="text-textSecondary hover:text-white transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">

        {/* Skill Name */}
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">Skill Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., React, Node.js, Python"
          />
        </div>

        {/* Icon Section */}
        {formData.name.trim() && (
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-3">Skill Icon</label>
            <div className="flex items-center gap-4">

              {/* Icon Preview Box */}
              <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl p-2 relative">
                {currentIconUrl && !iconError ? (
                  <img
                    src={currentIconUrl}
                    alt="icon"
                    className="h-full w-full object-contain"
                    style={currentFilter ? { filter: 'invert(1)' } : {}}
                    onError={() => setIconError(true)}
                  />
                ) : (
                  <span className="text-2xl font-bold text-textSecondary">
                    {formData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-col gap-2 flex-1">
                {/* Source label */}
                {!uploadMode && currentSource && (
                  <p className={`text-xs font-medium ${iconError ? 'text-yellow-400' : 'text-green-400'}`}>
                    {iconError ? '⚠ Not found on this source' : `✓ ${currentSource.label}`}
                  </p>
                )}
                {uploadMode && (
                  <p className="text-xs font-medium text-blue-400">📁 Custom upload</p>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Refresh / cycle button */}
                  {!uploadMode && (
                    <button
                      type="button"
                      onClick={handleRefresh}
                      title="Try next icon source"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    >
                      <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} />
                      Try Next
                      <span className="text-textSecondary text-xs">
                        ({sourceIndex + 1}/{iconSources.length})
                      </span>
                    </button>
                  )}

                  {/* Switch back to auto */}
                  {uploadMode && (
                    <button
                      type="button"
                      onClick={() => { setUploadMode(false); setIconFile(null); setIconPreview(''); setIconError(false); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm"
                    >
                      <RefreshCw size={14} /> Auto-fetch
                    </button>
                  )}

                  {/* Upload button (optional) */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm text-textSecondary"
                  >
                    <Upload size={14} /> Upload (optional)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-[#111827] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Tools">Tools</option>
            <option value="DevOps">DevOps</option>
            <option value="Programming Languages">Programming Languages</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-textSecondary mb-2">Experience (Optional)</label>
          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., 2 Years"
          />
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end space-x-4">
          <button type="button" onClick={onCancel} className="px-6 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors">
            {loading ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
