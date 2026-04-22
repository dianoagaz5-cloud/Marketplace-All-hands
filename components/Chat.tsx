'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { vendors } from '@/data/mockData';
import styles from './Chat.module.css';

export default function Chat() {
  const { chatOpen, setChatOpen, messages, sendMessage, user } = useApp();
  const [selectedVendor, setSelectedVendor] = useState(vendors[0]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const filteredMessages = messages.filter(
    m => m.senderId === user?.id || m.receiverId === selectedVendor.id || m.senderId === selectedVendor.id
  );

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [filteredMessages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message, selectedVendor.id);
    setMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!chatOpen) {
    return (
      <motion.button
        className={styles.floatingBtn}
        onClick={() => setChatOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
        <span className={styles.floatingBadge}>1</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.vendorSelect}>
            <img
              src={selectedVendor.avatar}
              alt={selectedVendor.shopName}
              className={styles.vendorAvatar}
            />
            <div>
              <h3 className={styles.vendorName}>{selectedVendor.shopName}</h3>
              <span className={styles.vendorStatus}>En ligne</span>
            </div>
          </div>
        </div>
        <button className={styles.closeBtn} onClick={() => setChatOpen(false)}>
          <X size={20} />
        </button>
      </div>

      {/* Vendor List */}
      <div className={styles.vendorList}>
        {vendors.slice(0, 4).map((vendor) => (
          <button
            key={vendor.id}
            className={`${styles.vendorItem} ${selectedVendor.id === vendor.id ? styles.active : ''}`}
            onClick={() => setSelectedVendor(vendor)}
          >
            <img src={vendor.avatar} alt={vendor.shopName} className={styles.vendorItemAvatar} />
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className={styles.messages} ref={chatRef}>
        {filteredMessages.length === 0 ? (
          <div className={styles.emptyState}>
            <MessageCircle size={48} className={styles.emptyIcon} />
            <p>Commencez une conversation avec {selectedVendor.shopName}</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`${styles.message} ${msg.senderId === user?.id ? styles.sent : styles.received}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.senderId !== user?.id && (
                <img src={selectedVendor.avatar} alt="" className={styles.messageAvatar} />
              )}
              <div className={styles.messageBubble}>
                {msg.text}
              </div>
            </motion.div>
          ))
        )}
        
        {isTyping && (
          <div className={`${styles.message} ${styles.received}`}>
            <img src={selectedVendor.avatar} alt="" className={styles.messageAvatar} />
            <div className={styles.typing}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tapez votre message..."
          className={styles.input}
        />
        <button className={styles.sendBtn} onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>
    </motion.div>
  );
}