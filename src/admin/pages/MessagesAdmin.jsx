import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Eye, Mail, MailOpen } from 'lucide-react';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
        const token = localStorage.getItem('adminToken');
        await axios.delete(`/api/admin/messages/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchMessages();
      } catch (err) {
        console.error(err);
        alert('Failed to delete message: ' + (err.response?.data?.error || err.response?.data?.message || err.message));
      }
    }
  };

  const markAsRead = async (id, shouldRefresh = true) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/admin/messages/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
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

    if (!msg.isRead) {
      markAsRead(msg._id);
    }
  };

  const backToInbox = () => {
    setSelectedMsg(null);
    setSearchParams({});
  };

  if (selectedMsg) {
    return (
      <div className="glass p-8 rounded-xl max-w-3xl mx-auto mt-10">
        <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">{selectedMsg.subject}</h2>
            <p className="text-textSecondary">From: <span className="text-white font-medium">{selectedMsg.name}</span> &lt;{selectedMsg.email}&gt;</p>
            <p className="text-sm text-textMuted mt-1">{new Date(selectedMsg.createdAt).toLocaleString()}</p>
          </div>
          <button 
            onClick={backToInbox}
            className="px-4 py-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
          >
            Back to Inbox
          </button>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed whitespace-pre-wrap text-textMain">{selectedMsg.message}</p>
        </div>
      </div>
    );
  }

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
                      {msg.isRead ? <MailOpen size={18} className="text-textMuted" /> : <Mail size={18} className="text-primary" />}
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
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(msg._id)}
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

export default MessagesAdmin;
