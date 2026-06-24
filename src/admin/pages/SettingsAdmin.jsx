import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Save, Plus, Trash2, User, Globe, Info, Upload, FileText, CheckCircle2, ExternalLink, Image } from 'lucide-react';

const TABS = [
  { id: 'hero', label: 'Hero Section', icon: User },
  { id: 'about', label: 'About Section', icon: Info },
  { id: 'social', label: 'Socials & Profile', icon: Globe },
];

const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors";
const labelClass = "block text-sm font-medium text-textSecondary mb-1";
const textareaClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary transition-colors resize-none";

const SettingsAdmin = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [cvSuccess, setCvSuccess] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const cvInputRef = useRef();
  const imageInputRef = useRef();

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    subtitle: '',
    bio: '',
    resumeUrl: '',
    aboutPara1: '',
    aboutPara2: '',
    highlights: [],
    github: '',
    leetcode: '',
    linkedin: '',
    twitter: '',
    email: '',
    phone: '',
    location: '',
    profileImageUrl: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/profile');
        const d = res.data.data;
        setForm({
          name: d.name || '',
          tagline: d.tagline || '',
          subtitle: d.subtitle || '',
          bio: d.bio || '',
          resumeUrl: d.resumeUrl || '',
          aboutPara1: d.aboutPara1 || '',
          aboutPara2: d.aboutPara2 || '',
          highlights: d.highlights || [],
          github: d.github || '',
          leetcode: d.leetcode || '',
          linkedin: d.linkedin || '',
          twitter: d.twitter || '',
          email: d.email || '',
          phone: d.phone || '',
          location: d.location || '',
          profileImageUrl: d.profileImageUrl || '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleHighlightChange = (idx, field, value) => {
    setForm(prev => {
      const updated = [...prev.highlights];
      updated[idx] = { ...updated[idx], [field]: value };
      return { ...prev, highlights: updated };
    });
  };

  const addHighlight = () => {
    setForm(prev => ({ ...prev, highlights: [...prev.highlights, { title: '', desc: '' }] }));
  };

  const removeHighlight = (idx) => {
    setForm(prev => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put('/api/profile', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') return alert('Please select a PDF file.');
    setCvUploading(true);
    setCvSuccess(false);
    try {
      const data = new FormData();
      data.append('cv', file);
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('/api/upload/cv', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setForm(prev => ({ ...prev, resumeUrl: res.data.url }));
      setCvSuccess(true);
      setTimeout(() => setCvSuccess(false), 5000);
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || err.message || 'CV upload failed. Make sure Cloudinary is configured.');
    } finally {
      setCvUploading(false);
      if (cvInputRef.current) cvInputRef.current.value = '';
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return alert('Please select an image file.');
    setImageUploading(true);
    setImageSuccess(false);
    try {
      const data = new FormData();
      data.append('image', file);
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('/api/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      setForm(prev => ({ ...prev, profileImageUrl: res.data.url }));
      setImageSuccess(true);
      setTimeout(() => setImageSuccess(false), 5000);
    } catch (err) {
      alert(err.response?.data?.error || err.response?.data?.message || err.message || 'Image upload failed. Make sure Cloudinary is configured.');
    } finally {
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
    }
  };

  if (loading) return <div className="text-center py-20 text-textSecondary">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary/20 disabled:opacity-60"
        >
          <Save size={18} />
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10 pb-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-textSecondary hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass rounded-xl p-6 space-y-6">

        {/* ── HERO TAB ── */}
        {activeTab === 'hero' && (
          <>
            <h2 className="text-lg font-semibold text-textSecondary border-b border-white/10 pb-3">Hero Section</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Your Name</label>
                <input name="name" value={form.name} onChange={handleChange} className={inputClass} placeholder="Vijay Dinodia" />
              </div>
              <div>
                <label className={labelClass}>Subtitle Badge</label>
                <input name="subtitle" value={form.subtitle} onChange={handleChange} className={inputClass} placeholder="Welcome to my world" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Tagline (gradient text)</label>
                <input name="tagline" value={form.tagline} onChange={handleChange} className={inputClass} placeholder="I build Digital Experiences" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Bio / Description</label>
                <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} className={textareaClass} placeholder="A passionate MERN Stack Developer..." />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Resume / CV</label>

                {/* Upload zone */}
                <div className="border border-dashed border-white/20 rounded-xl p-5 bg-white/5 mb-3">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-medium text-white">Upload PDF Resume</p>
                      <p className="text-xs text-textSecondary mt-0.5">Max 10 MB · Requires Cloudinary config</p>
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        ref={cvInputRef}
                        onChange={handleCvUpload}
                      />
                      <button
                        type="button"
                        onClick={() => cvInputRef.current?.click()}
                        disabled={cvUploading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primaryHover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                      >
                        {cvUploading ? (
                          <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" /> Uploading...</>
                        ) : (
                          <><Upload size={16} /> Choose PDF</>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Success message */}
                  {cvSuccess && (
                    <div className="flex items-center gap-2 mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
                      <span className="text-sm text-green-400">CV uploaded successfully!</span>
                      {form.resumeUrl && (
                        <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1 text-xs text-green-400 hover:underline">
                          Preview <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Manual URL fallback */}
                <label className="text-xs text-textSecondary mb-1 block">Or paste a URL manually (Google Drive, Dropbox, etc.)</label>
                <input name="resumeUrl" value={form.resumeUrl} onChange={handleChange} className={inputClass} placeholder="https://drive.google.com/..." />
                {form.resumeUrl && (
                  <a href={form.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary mt-1.5 hover:underline">
                    <ExternalLink size={12} /> View current resume
                  </a>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── ABOUT TAB ── */}
        {activeTab === 'about' && (
          <>
            <h2 className="text-lg font-semibold text-textSecondary border-b border-white/10 pb-3">About Section</h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Paragraph 1</label>
                <textarea name="aboutPara1" value={form.aboutPara1} onChange={handleChange} rows={4} className={textareaClass} />
              </div>
              <div>
                <label className={labelClass}>Paragraph 2</label>
                <textarea name="aboutPara2" value={form.aboutPara2} onChange={handleChange} rows={4} className={textareaClass} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-textSecondary">Highlight Cards</label>
                <button onClick={addHighlight} className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <Plus size={14} /> Add Card
                </button>
              </div>
              <div className="space-y-3">
                {form.highlights.map((h, idx) => (
                  <div key={idx} className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex-1 space-y-2">
                      <input
                        value={h.title}
                        onChange={(e) => handleHighlightChange(idx, 'title', e.target.value)}
                        className={inputClass}
                        placeholder="Title e.g. LeetCode Practice"
                      />
                      <input
                        value={h.desc}
                        onChange={(e) => handleHighlightChange(idx, 'desc', e.target.value)}
                        className={inputClass}
                        placeholder="Description"
                      />
                    </div>
                    <button onClick={() => removeHighlight(idx)} className="text-red-400 hover:text-red-300 mt-1 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── SOCIAL TAB ── */}
        {activeTab === 'social' && (
          <>
            <h2 className="text-lg font-semibold text-textSecondary border-b border-white/10 pb-3">Social & Contact Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>GitHub URL</label>
                <input name="github" value={form.github} onChange={handleChange} className={inputClass} placeholder="https://github.com/username" />
              </div>
              <div>
                <label className={labelClass}>LeetCode URL</label>
                <input name="leetcode" value={form.leetcode} onChange={handleChange} className={inputClass} placeholder="https://leetcode.com/u/username/" />
              </div>
              <div>
                <label className={labelClass}>LinkedIn URL</label>
                <input name="linkedin" value={form.linkedin} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/in/username" />
              </div>
              <div>
                <label className={labelClass}>Twitter / X URL</label>
                <input name="twitter" value={form.twitter} onChange={handleChange} className={inputClass} placeholder="https://twitter.com/username" />
              </div>
              <div>
                <label className={labelClass}>Email Address</label>
                <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
              </div>
              <div>
                <label className={labelClass}>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+91 9876543210" />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input name="location" value={form.location} onChange={handleChange} className={inputClass} placeholder="India" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Profile Image</label>

                {/* Upload zone */}
                <div className="border border-dashed border-white/20 rounded-xl p-5 bg-white/5 mb-3">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 flex-shrink-0 flex items-center justify-center">
                      {form.profileImageUrl ? (
                        <img src={form.profileImageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Image size={32} className="text-textSecondary" />
                      )}
                      {imageUploading && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="animate-spin inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-medium text-white">Upload Profile Photo</p>
                      <p className="text-xs text-textSecondary mt-0.5">Supports PNG, JPG, WEBP · Max 5 MB</p>
                      {imageSuccess && (
                        <p className="text-xs text-green-400 mt-1 flex items-center justify-center sm:justify-start gap-1">
                          <CheckCircle2 size={12} /> Image uploaded successfully!
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={imageInputRef}
                        onChange={handleImageUpload}
                      />
                      <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        disabled={imageUploading}
                        className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primaryHover text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60"
                      >
                        {imageUploading ? (
                          'Uploading...'
                        ) : (
                          <><Upload size={16} /> Choose Image</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Manual URL fallback */}
                <label className="text-xs text-textSecondary mb-1 block">Or paste image URL manually</label>
                <input name="profileImageUrl" value={form.profileImageUrl} onChange={handleChange} className={inputClass} placeholder="https://..." />
              </div>
            </div>
          </>
        )}

        {/* Bottom Save */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primaryHover text-white font-medium rounded-lg transition-colors disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAdmin;
