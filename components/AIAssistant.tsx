'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Zap, HelpCircle, ShoppingBag, Store, BookOpen } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import styles from './AIAssistant.module.css';

const quickActions = [
  { icon: ShoppingBag, label: 'Comment acheter', prompt: 'Explique-moi comment acheter sur la marketplace' },
  { icon: Store, label: 'Comment vendre', prompt: 'Comment devenir vendeur sur la plateforme?' },
  { icon: BookOpen, label: 'Ebooks', prompt: 'Quels ebooks sont disponibles?' },
  { icon: HelpCircle, label: 'Aide', prompt: 'J\'ai besoin d\'aide' },
];

const aiResponses: Record<string, string> = {
  default: "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui? Vous pouvez me poser des questions sur les produits, services, ou utiliser les actions rapides ci-dessous.",
  achat: "Pour acheter sur Marketplace:\n\n1. **Parcourir**: Utilisez le menu ou la recherche pour trouver ce que vous cherchez\n2. **Ajouter au panier**: Cliquez sur le bouton \"Ajouter au panier\" sur n'importe quel produit\n3. **Commander**: Allez dans votre panier et cliquez sur \"Commander\"\n4. **Paiement**: Choisissez MTN MoMo, Moov Money ou Celtiis Cash\n5. **Livraison**: Sélectionnez votre zone de livraison (Cotonou, Calavi, Porto-Novo, etc.)\n\nEst-ce que cela répond à votre question?",
  vente: "Pour devenir vendeur sur Marketplace:\n\n1. **Inscription**: Cliquez sur \"Commencer à vendre\" puis sélectionnez votre type de vente\n2. **Complétez votre profil**: Ajoutez votre photo, description de boutique\n3. **Ajoutez vos produits/services/ebooks**: Utilisez votre dashboard vendeur\n4. **Validation**: Votre boutique sera examinée par notre équipe\n\nUne fois approved, vous pouvez:\n- Gérer vos annonces\n- Suivre vos ventes\n- Recevoir des paiements via MTN MoMo ou Moov Money\n- Retirer vos revenus (seuil minimum: 15 000 FCAF)\n\nVoulez-vous commencer le processus d'inscription?",
  ebooks: "Notre section **Ebooks** propose des livres numériques dans plusieurs catégories:\n\n📚 **Business**: Guide du marketing digital, Entrepreneuriat\n🍳 **Cuisine**: Recettes béninoises authentiques\n💻 **Programmation**: Apprendre Python\n🧘 **Bien-être**: Yoga et méditation\n\nAprès achat, vous pouvez:\n- Télécharger votre ebook instantanément\n- Le retrouver dans \"Mon compte\"\n- Le partager avec vos proches\n\nVoulez-vous parcourir notre catalogue d'ebooks?",
  aide: "Je suis là pour vous aider! Voici quelques choses que je peux faire:\n\n✅ Vous guider pour acheter ou vendre\n✅ Expliquer le fonctionnement de la plateforme\n✅ Vous aider à trouver des produits\n✅ Répondre à vos questions sur les paiements\n\nComment puis-je vous aider aujourd'hui?",
};

export default function AIAssistant() {
  const { aiOpen, setAiOpen } = useApp();
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: aiResponses.default },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = aiResponses.default;
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('achet') || lowerMessage.includes('commander') || lowerMessage.includes('panier')) {
        response = aiResponses.achat;
      } else if (lowerMessage.includes('vend') || lowerMessage.includes('inscription') || lowerMessage.includes('produit')) {
        response = aiResponses.vente;
      } else if (lowerMessage.includes('ebook') || lowerMessage.includes('livre') || lowerMessage.includes('télécharg')) {
        response = aiResponses.ebook;
      } else if (lowerMessage.includes('aide') || lowerMessage.includes('question') || lowerMessage.includes('problème')) {
        response = aiResponses.aide;
      }

      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    setMessage(prompt);
    setTimeout(() => handleSend(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!aiOpen) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setAiOpen(false)}
    >
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.aiIcon}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className={styles.title}>Assistant IA</h3>
              <p className={styles.subtitle}>Powered by Marketplace</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setAiOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Chat */}
        <div className={styles.chat} ref={chatRef}>
          {chatHistory.map((msg, index) => (
            <motion.div
              key={index}
              className={`${styles.message} ${styles[msg.role]}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {msg.role === 'ai' && (
                <div className={styles.aiAvatar}>
                  <Sparkles size={16} />
                </div>
              )}
              <div className={styles.messageContent}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className={`${styles.message} ${styles.ai}`}>
              <div className={styles.aiAvatar}>
                <Sparkles size={16} />
              </div>
              <div className={styles.typing}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          {quickActions.map((action) => (
            <button
              key={action.label}
              className={styles.quickAction}
              onClick={() => handleQuickAction(action.prompt)}
            >
              <action.icon size={16} />
              <span>{action.label}</span>
            </button>
          ))}
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
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}