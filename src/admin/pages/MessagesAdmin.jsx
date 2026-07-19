import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
  Trash2, Eye, Mail, MailOpen, Send, Reply, Clock,
  CheckCircle2, AlertCircle, Loader2, MessageSquare,
  Monitor, Smartphone, Tablet, Laptop
} from 'lucide-react';

const DEVICE_ICONS = { Mobile: Smartphone, Tablet: Tablet, Desktop: Monitor, Unknown: Laptop };

const flagEmoji = (code) => {
  if (!code || code.length !== 2) return '🌍';
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};


const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Reply state
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);
  const [replyStatus, setReplyStatus] = useState(null); // 'success' | 'error' | null
  const [showReplyBox, setShowReplyBox] = useState(false);

  const token = localStorage.getItem('adminToken');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/messages', authHeader);
      const fetchedMessages = Array.isArray(res.data) ? res.data : [];
      const linkedMessageId = searchParams.get('message');
      const linkedMessage = linkedMessageId
        ? fetchedMessages.find((msg) => msg._id === linkedMessageId)
        : null;

      setMessages(fetchedMessages);

      if (linkedMessage) {
        setSelectedMsg(linkedMessage);

        if (!linkedMessage.isRead) {
          await markAsRead(linkedMessage._id, false);
          setMessages((prev) => prev.map((msg) => (
            msg._id === linkedMessage._id ? { ...msg, isRead: true } : msg
          )));
          setSelectedMsg((prev) => prev ? { ...prev, isRead: true } : prev);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await axios.delete(`/api/admin/messages/${id}`, authHeader);
        if (selectedMsg?._id === id) {
          setSelectedMsg(null);
          setSearchParams({});
        }
        fetchMessages();
      } catch (err) {
        console.error(err);
        alert('Failed to delete message: ' + (err.response?.data?.error || err.response?.data?.message || err.message));
      }
    }
  };

  const markAsRead = async (id, shouldRefresh = true) => {
    try {
      await axios.put(`/api/admin/messages/${id}/read`, {}, authHeader);
      if (shouldRefresh) {
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openMessage = (msg) => {
    setSelectedMsg(msg);
    setSearchParams({ message: msg._id });
    setShowReplyBox(false);
    setReplyText('');
    setReplyStatus(null);

    if (!msg.isRead) {
      markAsRead(msg._id);
    }
  };

  const backToInbox = () => {
    setSelectedMsg(null);
    setSearchParams({});
    setShowReplyBox(false);
    setReplyText('');
    setReplyStatus(null);
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMsg) return;

    setReplying(true);
    setReplyStatus(null);

    try {
      const res = await axios.post(
        `/api/admin/messages/${selectedMsg._id}/reply`,
        { body: replyText.trim() },
        authHeader
      );

      setReplyStatus('success');
      setReplyText('');
      setShowReplyBox(false);

      // Update the selected message with the reply data
      const updatedMsg = res.data.data;
      setSelectedMsg(updatedMsg);
      setMessages((prev) => prev.map((msg) =>
        msg._id === updatedMsg._id ? updatedMsg : msg
      ));

      // Auto-clear success message after 4s
      setTimeout(() => setReplyStatus(null), 4000);
    } catch (err) {
      console.error(err);
      setReplyStatus('error');
      setTimeout(() => setReplyStatus(null), 5000);
    } finally {
      setReplying(false);
    }
  };

  // Time ago helper
  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // ─── Message Detail View ───────────────────────────────────────
  if (selectedMsg) {
    return (
      <div className="max-w-3xl mx-auto mt-6 space-y-6">

        {/* Message Header */}
        <div className="glass p-6 sm:p-8 rounded-xl border border-white/10">
          <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-2xl font-bold text-white">{selectedMsg.subject}</h2>
                {selectedMsg.isReplied && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-500/15 text-green-400 px-2.5 py-1 rounded-full border border-green-500/20">
                    <CheckCircle2 size={12} />
                    Replied
                  </span>
                )}
              </div>
              <p className="text-textSecondary">
                From: <span className="text-white font-medium">{selectedMsg.name}</span> &lt;{selectedMsg.email}&gt;
              </p>
              <p className="text-sm text-textSecondary/50 mt-1 flex items-center gap-1.5">
                <Clock size={12} />
                {new Date(selectedMsg.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
            <button
              onClick={backToInbox}
              className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm text-textSecondary hover:text-white flex-shrink-0"
            >
              Back to Inbox
            </button>
          </div>

          {/* Original Message Body */}
          <div className="prose prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap text-textMain">{selectedMsg.message}</p>
          </div>
        </div>

        {/* Sender Session & Device Details Card */}
        <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
          <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-2">
            <Monitor size={14} className="text-primary" />
            Sender Session & Device Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <span className="text-xs text-textSecondary/70 block">Location</span>
              <div className="flex items-center gap-2 text-white font-medium">
                <span>{flagEmoji(selectedMsg.countryCode)}</span>
                <span>{selectedMsg.city || 'Unknown'}, {selectedMsg.country || 'Unknown'}</span>
              </div>
              {selectedMsg.region && selectedMsg.region !== 'Unknown' && (
                <span className="text-xs text-textSecondary/50 block pl-6">{selectedMsg.region}</span>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-xs text-textSecondary/70 block">Device & Environment</span>
              <div className="flex items-center gap-2 text-white font-medium">
                {(() => {
                  const Icon = DEVICE_ICONS[selectedMsg.device] || Monitor;
                  return <Icon size={14} className="text-textSecondary" />;
                })()}
                <span>{selectedMsg.device || 'Unknown'}</span>
              </div>
              <span className="text-xs text-textSecondary/50 block">
                {selectedMsg.os || 'Unknown OS'} · {selectedMsg.browser || 'Unknown Browser'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-textSecondary/70 block">Origin Details</span>
              <div className="text-white truncate font-medium" title={selectedMsg.path || '/'}>
                Page: <code className="bg-white/5 px-1.5 py-0.5 rounded text-xs font-mono text-accent">{selectedMsg.path || '/'}</code>
              </div>
              {selectedMsg.referrer && (
                <div className="text-xs text-textSecondary/50 truncate" title={selectedMsg.referrer}>
                  Ref: <span className="font-mono">{selectedMsg.referrer}</span>
                </div>
              )}
              {selectedMsg.ip && (
                <div className="text-xs text-textSecondary/50 mt-1">
                  IP: <span className="font-mono">{selectedMsg.ip}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reply History */}
        {selectedMsg.replies && selectedMsg.replies.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-2">
              <MessageSquare size={14} />
              Reply History ({selectedMsg.replies.length})
            </h3>
            {selectedMsg.replies.map((reply, idx) => (
              <div key={reply._id || idx} className="glass rounded-xl p-5 border border-white/10 border-l-4 border-l-primary/50">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
                    V
                  </div>
                  <span className="text-sm font-medium text-white">You</span>
                  <span className="text-xs text-textSecondary/50">·</span>
                  <span className="text-xs text-textSecondary/50 flex items-center gap-1">
                    <Clock size={10} />
                    {timeAgo(reply.sentAt)}
                  </span>
                  <CheckCircle2 size={12} className="text-green-400 ml-auto" title="Sent" />
                </div>
                <p className="text-sm text-textMain leading-relaxed whitespace-pre-wrap">{reply.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Reply Status Messages */}
        {replyStatus === 'success' && (
          <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm animate-in">
            <CheckCircle2 size={16} />
            Reply sent successfully! The email has been delivered to {selectedMsg.email}
          </div>
        )}
        {replyStatus === 'error' && (
          <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            <AlertCircle size={16} />
            Failed to send reply. Please check your SendGrid configuration and try again.
          </div>
        )}

        {/* Reply Section */}
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          {!showReplyBox ? (
            <button
              onClick={() => setShowReplyBox(true)}
              className="w-full flex items-center gap-3 px-6 py-4 text-sm text-textSecondary hover:text-white hover:bg-white/5 transition-all group"
            >
              <Reply size={16} className="group-hover:text-primary transition-colors" />
              <span>Reply to {selectedMsg.name}…</span>
            </button>
          ) : (
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm text-textSecondary pb-3 border-b border-white/5">
                <Reply size={14} className="text-primary" />
                <span>Replying to <span className="text-white font-medium">{selectedMsg.name}</span> · {selectedMsg.email}</span>
              </div>

              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                rows={5}
                autoFocus
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-textSecondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 resize-y text-sm leading-relaxed transition-all"
              />

              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setShowReplyBox(false);
                    setReplyText('');
                  }}
                  className="px-4 py-2 text-sm text-textSecondary hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={!replyText.trim() || replying}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/80 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30"
                >
                  {replying ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ─── Inbox List View ────────────────────────────────────────────
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Contact Messages</h1>
      </div>

      <div className="glass rounded-xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-sm font-semibold text-textSecondary">Status</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Name</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Email</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Subject</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Date</th>
                <th className="p-4 text-sm font-semibold text-textSecondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="p-4 text-center">Loading...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="6" className="p-4 text-center text-textMuted">No messages found.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${!msg.isRead ? 'bg-primary/5 font-medium text-white' : 'text-textMain'}`}>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {msg.isRead ? <MailOpen size={18} className="text-textMuted" /> : <Mail size={18} className="text-primary" />}
                        {msg.isReplied && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] bg-green-500/15 text-green-400 px-1.5 py-0.5 rounded-full" title="Replied">
                            <CheckCircle2 size={10} />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">{msg.name}</td>
                    <td className="p-4">{msg.email}</td>
                    <td className="p-4 truncate max-w-[200px]">{msg.subject}</td>
                    <td className="p-4">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <div className="flex space-x-3 items-center">
                        <button
                          onClick={() => openMessage(msg)}
                          className="text-accent hover:text-white transition-colors"
                          title="View message"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => openMessage(msg)}
                          className="text-primary hover:text-white transition-colors"
                          title="Reply"
                        >
                          <Reply size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(msg._id)}
                          className="text-red-400 hover:text-red-200 transition-colors"
                          title="Delete"
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

export default MessagesAdmin;
