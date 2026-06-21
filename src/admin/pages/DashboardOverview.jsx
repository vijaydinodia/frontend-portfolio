import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FolderGit2, Code2, Briefcase, Trophy,
  MessageSquare, Github, Code, Mail,
  TrendingUp, Eye, Clock, ArrowRight,
  CheckCircle2, AlertCircle
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, sub, color, onClick }) => (
  <div
    onClick={onClick}
    className={`glass rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer group ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={22} className="text-white" />
      </div>
      {onClick && (
        <ArrowRight size={16} className="text-textSecondary group-hover:text-white transition-colors mt-1" />
      )}
    </div>
    <div className="text-3xl font-bold text-white mb-1">
      {value ?? <span className="animate-pulse text-textSecondary text-xl">—</span>}
    </div>
    <div className="text-sm font-medium text-textSecondary">{label}</div>
    {sub && <div className="text-xs text-textSecondary/60 mt-1">{sub}</div>}
  </div>
);

const QuickLinkCard = ({ icon: Icon, label, desc, href, color }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(href)}
      className="glass rounded-xl p-5 border border-white/10 hover:border-white/25 transition-all hover:-translate-y-1 text-left w-full group"
    >
      <div className={`inline-flex p-2.5 rounded-lg mb-3 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="font-semibold text-white group-hover:text-primary transition-colors">{label}</div>
      <div className="text-xs text-textSecondary mt-1">{desc}</div>
    </button>
  );
};

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({
    projects: null, skills: null, experiences: null,
    achievements: null, messages: null, unread: null,
  });
  const [externalStats, setExternalStats] = useState({ githubRepos: null, leetcodeSolved: null });
  const [recentMessages, setRecentMessages] = useState([]);
  const [profile, setProfile] = useState({ name: 'Admin' });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('adminToken');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [projects, skills, experiences, achievements, messages, stats, prof] = await Promise.allSettled([
          axios.get('/api/projects/all', authHeader),
          axios.get('/api/skills', authHeader),
          axios.get('/api/experiences', authHeader),
          axios.get('/api/achievements', authHeader),
          axios.get('/api/admin/messages', authHeader),
          axios.get('/api/stats'),
          axios.get('/api/profile'),
        ]);

        const msgs = messages.status === 'fulfilled' ? messages.value.data : [];
        const unread = Array.isArray(msgs) ? msgs.filter(m => !m.isRead).length : 0;

        setCounts({
          projects: projects.status === 'fulfilled' ? (projects.value.data?.data?.length ?? 0) : '—',
          skills: skills.status === 'fulfilled' ? (skills.value.data?.data?.length ?? 0) : '—',
          experiences: experiences.status === 'fulfilled' ? (experiences.value.data?.data?.length ?? 0) : '—',
          achievements: achievements.status === 'fulfilled' ? (achievements.value.data?.data?.length ?? 0) : '—',
          messages: Array.isArray(msgs) ? msgs.length : '—',
          unread,
        });

        setRecentMessages(Array.isArray(msgs) ? msgs.slice(0, 5) : []);

        if (stats.status === 'fulfilled') {
          setExternalStats(stats.value.data?.data || {});
        }
        if (prof.status === 'fulfilled') {
          setProfile(prof.value.data?.data || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{profile.name?.split(' ')[0] || 'Admin'}</span> 👋
          </h1>
          <p className="text-textSecondary mt-1 text-sm">
            {now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {counts.unread > 0 && (
          <button
            onClick={() => navigate('/admin/messages')}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/25 transition-colors text-sm font-medium"
          >
            <AlertCircle size={16} />
            {counts.unread} unread message{counts.unread > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Content Stats */}
      <div>
        <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">Content Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard icon={FolderGit2} label="Projects" value={counts.projects} color="bg-primary/20" onClick={() => navigate('/admin/projects')} />
          <StatCard icon={Code2} label="Skills" value={counts.skills} color="bg-accent/20" onClick={() => navigate('/admin/skills')} />
          <StatCard icon={Briefcase} label="Experiences" value={counts.experiences} color="bg-secondary/20" onClick={() => navigate('/admin/experience')} />
          <StatCard icon={Trophy} label="Achievements" value={counts.achievements} color="bg-yellow-500/20" onClick={() => navigate('/admin/achievements')} />
          <StatCard
            icon={MessageSquare}
            label="Messages"
            value={counts.messages}
            sub={counts.unread > 0 ? `${counts.unread} unread` : 'All read ✓'}
            color="bg-green-500/20"
            onClick={() => navigate('/admin/messages')}
          />
        </div>
      </div>

      {/* External Stats */}
      <div>
        <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">Live Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-xl p-6 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/10">
              <Github size={22} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {externalStats.githubRepos ?? <span className="text-textSecondary text-base animate-pulse">Fetching…</span>}
              </div>
              <div className="text-sm text-textSecondary">GitHub Public Repos</div>
            </div>
          </div>
          <div className="glass rounded-xl p-6 border border-white/10 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-500/20">
              <Code size={22} className="text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {externalStats.leetcodeSolved ?? <span className="text-textSecondary text-base animate-pulse">Fetching…</span>}
              </div>
              <div className="text-sm text-textSecondary">LeetCode Problems Solved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions + Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Quick Actions */}
        <div>
          <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickLinkCard icon={FolderGit2} label="Add Project" desc="Create a new project entry" href="/admin/projects" color="bg-primary/20" />
            <QuickLinkCard icon={Code2} label="Add Skill" desc="Add a new skill to your stack" href="/admin/skills" color="bg-accent/20" />
            <QuickLinkCard icon={Briefcase} label="Add Experience" desc="Log a new work experience" href="/admin/experience" color="bg-secondary/20" />
            <QuickLinkCard icon={Trophy} label="Add Achievement" desc="Record a new achievement" href="/admin/achievements" color="bg-yellow-500/20" />
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Recent Messages</h2>
            <button onClick={() => navigate('/admin/messages')} className="text-xs text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="glass rounded-xl border border-white/10 divide-y divide-white/5 overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-textSecondary text-sm">Loading…</div>
            ) : recentMessages.length === 0 ? (
              <div className="p-6 text-center text-textSecondary text-sm">No messages yet.</div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg._id} className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors">
                  <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${msg.isRead ? 'bg-white/20' : 'bg-primary'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-white truncate">{msg.name}</span>
                      {!msg.isRead && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full flex-shrink-0">New</span>
                      )}
                    </div>
                    <p className="text-xs text-textSecondary truncate mt-0.5">{msg.message}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-textSecondary/50">
                      <Mail size={10} />
                      <span className="truncate">{msg.email}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-2 text-xs text-textSecondary/50 pt-2 border-t border-white/5">
        <CheckCircle2 size={12} className="text-green-500" />
        Portfolio CMS is running — all systems operational
      </div>
    </div>
  );
};

export default DashboardOverview;
