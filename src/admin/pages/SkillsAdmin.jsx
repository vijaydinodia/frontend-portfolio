import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import SkillForm from '../components/SkillForm';

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [editingSkill, setEditingSkill] = useState(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/skills/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSkills(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/skills/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchSkills();
      } catch (err) {
        console.error(err);
        alert('Failed to delete skill: ' + (err.response?.data?.error || err.response?.data?.message || err.message));
      }
    }
  };

  if (view === 'form') {
    return (
      <SkillForm 
        skill={editingSkill} 
        onSuccess={() => { setView('list'); fetchSkills(); }}
        onCancel={() => setView('list')}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Skills Management</h1>
        <button 
          onClick={() => { setEditingSkill(null); setView('form'); }}
          className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg flex items-center transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <Plus size={20} className="mr-2" /> Add Skill
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-semibold text-textSecondary">Name</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Category</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Level (%)</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Experience</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="5" className="p-4 text-center">Loading...</td></tr>
              ) : skills.length === 0 ? (
                <tr><td colSpan="5" className="p-4 text-center text-textMuted">No skills found.</td></tr>
              ) : (
                skills.map((skill) => (
                  <tr key={skill._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-textMain font-medium">{skill.name}</td>
                    <td className="p-4 text-textMuted">{skill.category}</td>
                    <td className="p-4 text-textMuted">{skill.level}</td>
                    <td className="p-4 text-textMuted">{skill.experience}</td>
                    <td className="p-4">
                      <div className="flex space-x-3 items-center">
                        <button 
                          onClick={() => { setEditingSkill(skill); setView('form'); }}
                          className="text-accent hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(skill._id)}
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

export default SkillsAdmin;
