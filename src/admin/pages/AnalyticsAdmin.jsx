import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users, Monitor, Smartphone, Tablet, Globe, MapPin,
  TrendingUp, Clock, RefreshCw, Eye, BarChart3,
  Laptop, Chrome, ArrowUpRight, ArrowDownRight, Minus,
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar,
  Legend,
} from 'recharts';

// ─── Color Palette ──────────────────────────────────────────────────
const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#7c3aed', '#4f46e5', '#4338ca'];
const DEVICE_COLORS = { Mobile: '#f472b6', Tablet: '#fbbf24', Desktop: '#6366f1', Unknown: '#6b7280' };
const DEVICE_ICONS = { Mobile: Smartphone, Tablet: Tablet, Desktop: Monitor, Unknown: Laptop };

// Country code → flag emoji
const flagEmoji = (code) => {
  if (!code || code.length !== 2) return '🌍';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

// Time ago helper
const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

// ─── Custom Tooltip for Area Chart ──────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3 shadow-2xl">
        <p className="text-xs text-textSecondary mb-1">{label}</p>
        <p className="text-lg font-bold text-white">{payload[0].value} <span className="text-xs font-normal text-textSecondary">visitors</span></p>
      </div>
    );
  }
  return null;
};

// ─── Stat Summary Card ──────────────────────────────────────────────
const SummaryCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all group">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      {trend !== undefined && trend !== null && (
        <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
          trend > 0 ? 'bg-green-500/15 text-green-400' : trend < 0 ? 'bg-red-500/15 text-red-400' : 'bg-white/10 text-textSecondary'
        }`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : trend < 0 ? <ArrowDownRight size={12} /> : <Minus size={12} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-white">{value ?? '—'}</div>
    <div className="text-xs text-textSecondary mt-1">{label}</div>
  </div>
);

// ─── Donut Chart Component ──────────────────────────────────────────
const DonutChart = ({ data, colors, title, icon: Icon }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      <div className="flex items-center gap-2 mb-5">
        {Icon && <Icon size={16} className="text-textSecondary" />}
        <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">{title}</h3>
      </div>
      {data.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-textSecondary text-sm">No data yet</div>
      ) : (
        <div className="flex items-center gap-6">
          <div className="w-40 h-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={typeof colors === 'object' && !Array.isArray(colors) ? (colors[data[i]?.name] || COLORS[i % COLORS.length]) : (colors?.[i % colors.length] || COLORS[i % COLORS.length])} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2.5 min-w-0">
            {data.map((item, i) => {
              const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
              const color = typeof colors === 'object' && !Array.isArray(colors) ? (colors[item.name] || COLORS[i % COLORS.length]) : (colors?.[i % colors.length] || COLORS[i % COLORS.length]);
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm text-white truncate flex-1">{item.name}</span>
                  <span className="text-xs text-textSecondary tabular-nums">{pct}%</span>
                  <span className="text-xs text-textSecondary/60 tabular-nums w-8 text-right">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ═════════════════════════════════════════════════════════════════════
// Analytics Admin Page
// ═════════════════════════════════════════════════════════════════════
const AnalyticsAdmin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem('adminToken');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAnalytics = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const res = await axios.get('/api/visitors/analytics', authHeader);
      setData(res.data.data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Calculate trend percentage (compare today vs yesterday average from 7d)
  const calcTrend = () => {
    if (!data?.totals) return null;
    const avgPer7d = data.totals.last7Days / 7;
    if (avgPer7d === 0) return null;
    return Math.round(((data.totals.today - avgPer7d) / avgPer7d) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-sm text-textSecondary">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <BarChart3 size={48} className="text-textSecondary/30 mx-auto mb-4" />
          <p className="text-textSecondary">No analytics data available yet.</p>
          <p className="text-xs text-textSecondary/50 mt-1">Visitor data will appear here as people visit your site.</p>
        </div>
      </div>
    );
  }

  const trend = calcTrend();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="text-primary" size={28} />
            Visitor Analytics
          </h1>
          <p className="text-textSecondary mt-1 text-sm">
            Track your portfolio's reach and audience insights
          </p>
        </div>
        <button
          onClick={() => fetchAnalytics(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2.5 glass border border-white/10 hover:border-white/25 rounded-xl text-sm text-textSecondary hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          {refreshing ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <SummaryCard icon={Eye} label="Today" value={data.totals.today} trend={trend} color="bg-primary/20" />
        <SummaryCard icon={TrendingUp} label="Last 7 Days" value={data.totals.last7Days} color="bg-accent/20" />
        <SummaryCard icon={Users} label="Last 30 Days" value={data.totals.last30Days} color="bg-secondary/20" />
        <SummaryCard icon={Globe} label="All Time" value={data.totals.allTime} color="bg-green-500/20" />
      </div>

      {/* Daily Trend Chart */}
      <div className="glass rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={16} className="text-textSecondary" />
          <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Daily Visitors (Last 30 Days)</h3>
        </div>
        {data.dailyTrend.length === 0 ? (
          <div className="h-64 flex items-center justify-center text-textSecondary text-sm">No data yet</div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.dailyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="visitorsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  tickFormatter={(v) => v.slice(5)}
                  interval="preserveStartEnd"
                />
                <YAxis
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#visitorsGradient)"
                  dot={false}
                  activeDot={{ r: 5, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Device + OS Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DonutChart data={data.byDevice} colors={DEVICE_COLORS} title="Device Distribution" icon={Smartphone} />
        <DonutChart data={data.byOS} colors={COLORS} title="Operating Systems" icon={Monitor} />
      </div>

      {/* Browser Stats */}
      <div className="glass rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-2 mb-5">
          <Chrome size={16} className="text-textSecondary" />
          <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Browser Usage</h3>
        </div>
        {data.byBrowser.length === 0 ? (
          <div className="h-48 flex items-center justify-center text-textSecondary text-sm">No data yet</div>
        ) : (
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byBrowser} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={70}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {data.byBrowser.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Top Cities + Top Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Cities */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-5">
            <MapPin size={16} className="text-textSecondary" />
            <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Top Cities</h3>
          </div>
          {data.topCities.length === 0 ? (
            <div className="py-8 text-center text-textSecondary text-sm">No location data yet</div>
          ) : (
            <div className="space-y-3">
              {data.topCities.map((city, i) => {
                const maxCount = data.topCities[0]?.count || 1;
                const pct = (city.count / maxCount) * 100;
                return (
                  <div key={city.city + i} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base">{flagEmoji(city.countryCode)}</span>
                        <span className="text-sm text-white truncate">{city.city}</span>
                        <span className="text-xs text-textSecondary/50 truncate hidden sm:inline">{city.country}</span>
                      </div>
                      <span className="text-sm font-semibold text-white tabular-nums ml-2">{city.count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Countries */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-5">
            <Globe size={16} className="text-textSecondary" />
            <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Top Countries</h3>
          </div>
          {data.topCountries.length === 0 ? (
            <div className="py-8 text-center text-textSecondary text-sm">No location data yet</div>
          ) : (
            <div className="space-y-3">
              {data.topCountries.map((c, i) => {
                const maxCount = data.topCountries[0]?.count || 1;
                const pct = (c.count / maxCount) * 100;
                return (
                  <div key={c.country + i} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{flagEmoji(c.countryCode)}</span>
                        <span className="text-sm text-white truncate">{c.country}</span>
                      </div>
                      <span className="text-sm font-semibold text-white tabular-nums ml-2">{c.count}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-secondary transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="glass rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5">
          <Clock size={16} className="text-textSecondary" />
          <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider">Recent Visitors</h3>
        </div>
        {data.recentVisitors.length === 0 ? (
          <div className="p-8 text-center text-textSecondary text-sm">No visitors recorded yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-textSecondary/60 uppercase tracking-wider border-b border-white/5">
                  <th className="text-left px-6 py-3 font-medium">Location</th>
                  <th className="text-left px-6 py-3 font-medium">Device</th>
                  <th className="text-left px-6 py-3 font-medium">Browser</th>
                  <th className="text-left px-6 py-3 font-medium">OS</th>
                  <th className="text-left px-6 py-3 font-medium">Page</th>
                  <th className="text-right px-6 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.recentVisitors.map((v, i) => {
                  const DeviceIcon = DEVICE_ICONS[v.device] || Monitor;
                  return (
                    <tr key={v._id || i} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <span>{flagEmoji(v.countryCode)}</span>
                          <span className="text-white">{v.city}</span>
                          {v.country && v.country !== 'Unknown' && (
                            <span className="text-textSecondary/50 hidden sm:inline">· {v.country}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <DeviceIcon size={14} className="text-textSecondary" />
                          <span className="text-white">{v.device}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-white">{v.browser}</td>
                      <td className="px-6 py-3.5 text-white">{v.os}</td>
                      <td className="px-6 py-3.5 text-textSecondary font-mono text-xs">{v.path}</td>
                      <td className="px-6 py-3.5 text-right text-textSecondary text-xs whitespace-nowrap">{timeAgo(v.timestamp)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer note */}
      <div className="flex items-center gap-2 text-xs text-textSecondary/50 pt-2 border-t border-white/5">
        <Eye size={12} className="text-primary/60" />
        Data auto-cleans after 90 days · IP addresses are masked for privacy
      </div>
    </div>
  );
};

export default AnalyticsAdmin;
