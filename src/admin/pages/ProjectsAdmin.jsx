import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, GripVertical } from 'lucide-react';
import ProjectForm from '../components/ProjectForm';
import { Reorder, useDragControls } from 'framer-motion';

const ProjectRow = ({ project, onEdit, onDelete, onDragEnd }) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      as="tr"
      value={project}
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={onDragEnd}
      className="border-b border-white/5 hover:bg-white/5 transition-colors select-none"
    >
      <td className="p-4 w-10">
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-white/10 rounded transition-colors text-textSecondary hover:text-white inline-flex items-center justify-center"
        >
          <GripVertical size={16} />
        </div>
      </td>
      <td className="p-4 text-textMain font-medium">{project.title}</td>
      <td className="p-4 text-textMuted">{project.category}</td>
      <td className="p-4 text-textMuted">{project.displayOrder ?? 0}</td>
      <td className="p-4 text-textMuted">{project.status}</td>
      <td className="p-4 text-textMuted">{project.featured ? 'Yes' : 'No'}</td>
      <td className="p-4">
        <div className="flex space-x-3 items-center">
          <button 
            onClick={() => onEdit(project)}
            className="text-accent hover:text-white transition-colors"
          >
            <Edit2 size={18} />
          </button>
          <button 
            onClick={() => onDelete(project._id)}
            className="text-red-400 hover:text-red-200 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </Reorder.Item>
  );
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/projects/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchProjects();
      } catch (err) {
        console.error(err);
        alert('Failed to delete project');
      }
    }
  };

  const handleDragEnd = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const ids = projects.map(p => p._id);
      await axios.put('/api/projects/reorder', { ids }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error("Failed to save reordered projects:", err);
      alert("Failed to save sorting order to database.");
    }
  };

  if (view === 'form') {
    return (
      <ProjectForm 
        project={editingProject} 
        onSuccess={() => { setView('list'); fetchProjects(); }}
        onCancel={() => setView('list')}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <button 
          onClick={() => { setEditingProject(null); setView('form'); }}
          className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg flex items-center transition-colors font-medium shadow-lg shadow-primary/20"
        >
          <Plus size={20} className="mr-2" /> Add Project
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 w-10"></th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Title</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Category</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Order</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Status</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Featured</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Actions</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr><td colSpan="7" className="p-4 text-center">Loading...</td></tr>
              </tbody>
            ) : projects.length === 0 ? (
              <tbody>
                <tr><td colSpan="7" className="p-4 text-center text-textMuted">No projects found.</td></tr>
              </tbody>
            ) : (
              <Reorder.Group as="tbody" axis="y" values={projects} onReorder={setProjects}>
                {projects.map((project) => (
                  <ProjectRow
                    key={project._id}
                    project={project}
                    onEdit={(p) => { setEditingProject(p); setView('form'); }}
                    onDelete={handleDelete}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </Reorder.Group>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
