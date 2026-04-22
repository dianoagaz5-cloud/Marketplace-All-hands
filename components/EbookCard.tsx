'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, FileText, Download, User } from 'lucide-react';
import { Ebook, formatPrice } from '@/data/mockData';
import styles from './EbookCard.module.css';

interface EbookCardProps {
  ebook: Ebook;
  index?: number;
}

export default function EbookCard({ ebook, index = 0 }: EbookCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/ebook/${ebook.id}`} className={styles.link}>
        {/* Cover Container */}
        <div className={styles.coverContainer}>
          <img
            src={ebook.cover}
            alt={ebook.title}
            className={styles.cover}
          />
          
          <div className={styles.overlay}>
            <span className={styles.preview}>
              <FileText size={20} />
              Aperçu
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Category */}
          <span className={styles.category}>{ebook.category}</span>

          {/* Title */}
          <h3 className={styles.title}>{ebook.title}</h3>

          {/* Author */}
          <div className={styles.author}>
            <User size={14} />
            <span>{ebook.author}</span>
          </div>

          {/* Pages */}
          <div className={styles.pages}>
            <FileText size={14} />
            <span>{ebook.pages} pages</span>
          </div>

          {/* Rating */}
          <div className={styles.rating}>
            <Star size={14} className={styles.starIcon} />
            <span className={styles.ratingValue}>{ebook.rating}</span>
            <span className={styles.reviews}>({ebook.reviews})</span>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.price}>{formatPrice(ebook.price)}</span>
            <span className={styles.download}>
              <Download size={14} />
              Télécharger
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}