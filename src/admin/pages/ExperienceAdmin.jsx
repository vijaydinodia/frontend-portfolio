import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import ExperienceForm from '../components/ExperienceForm';

const ExperienceAdmin = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [editingExp, setEditingExp] = useState(null);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/experiences/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExperiences(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/experiences/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchExperiences();
      } catch (err) {
        console.error(err);
        alert('Failed to delete experience');
      }
    }
  };

  if (view === 'form') {
    return (
      <ExperienceForm 
        experience={editingExp} 
        onSuccess={() => { setView('list'); fetchExperiences(); }}
        onCancel={() => setView('list')}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <button 
          onClick={() => { setEditingExp(null); setView('form'); }}
          className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg flex items-center transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <Plus size={20} className="mr-2" /> Add Experience
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-semibold text-textSecondary">Role</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Company</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Type</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Current</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
              ) : experiences.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-textMuted">No experience found.</td></tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-textMain font-medium">{exp.role}</td>
                    <td className="p-4 text-textMuted">{exp.company}</td>
                    <td className="p-4 text-textMuted">{exp.type}</td>
                    <td className="p-4 text-textMuted">{exp.current ? 'Yes' : 'No'}</td>
                    <td className="p-4">
                      <div className="flex space-x-3 items-center">
                        <button 
                          onClick={() => { setEditingExp(exp); setView('form'); }}
                          className="text-accent hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(exp._id)}
                          className="text-red-400 hover:text-red-200 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExperienceAdmin;
