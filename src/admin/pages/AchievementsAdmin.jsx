import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import AchievementForm from '../components/AchievementForm';

const AchievementsAdmin = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [editingAchievement, setEditingAchievement] = useState(null);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/achievements/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAchievements(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/achievements/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAchievements();
      } catch (err) {
        console.error(err);
        alert('Failed to delete achievement: ' + (err.response?.data?.error || err.response?.data?.message || err.message));
      }
    }
  };

  if (view === 'form') {
    return (
      <AchievementForm 
        achievement={editingAchievement} 
        onSuccess={() => { setView('list'); fetchAchievements(); }}
        onCancel={() => setView('list')}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Achievements Management</h1>
        <button 
          onClick={() => { setEditingAchievement(null); setView('form'); }}
          className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg flex items-center transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <Plus size={20} className="mr-2" /> Add Achievement
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-semibold text-textSecondary">Title</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Organization</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Date</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>
              ) : achievements.length === 0 ? (
                <tr><td colSpan="4" className="p-4 text-center text-textMuted">No achievements found.</td></tr>
              ) : (
                achievements.map((achievement) => (
                  <tr key={achievement._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-textMain font-medium">{achievement.title}</td>
                    <td className="p-4 text-textMuted">{achievement.organization}</td>
                    <td className="p-4 text-textMuted">{new Date(achievement.date).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex space-x-3 items-center">
                        <button 
                          onClick={() => { setEditingAchievement(achievement); setView('form'); }}
                          className="text-accent hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(achievement._id)}
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

export default AchievementsAdmin;
