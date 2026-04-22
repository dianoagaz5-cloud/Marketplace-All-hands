'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, MapPin, Package, Wrench, BookOpen, CheckCircle } from 'lucide-react';
import { Vendor } from '@/data/mockData';
import styles from './VendorCard.module.css';

interface VendorCardProps {
  vendor: Vendor;
  index?: number;
}

export default function VendorCard({ vendor, index = 0 }: VendorCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/boutique/${vendor.id}`} className={styles.link}>
        {/* Banner */}
        <div className={styles.banner}>
          <img
            src={vendor.banner}
            alt={vendor.shopName}
            className={styles.bannerImage}
          />
          <div className={styles.bannerOverlay} />
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Avatar */}
          <div className={styles.avatarContainer}>
            <img
              src={vendor.avatar}
              alt={vendor.name}
              className={styles.avatar}
            />
            {vendor.verified && (
              <span className={styles.verifiedBadge}>
                <CheckCircle size={14} />
              </span>
            )}
          </div>

          {/* Info */}
          <div className={styles.info}>
            <h3 className={styles.shopName}>
              {vendor.shopName}
              {vendor.verified && <CheckCircle size={16} className={styles.verifiedIcon} />}
            </h3>
            <p className={styles.vendorName}>{vendor.name}</p>
            <div className={styles.location}>
              <MapPin size={12} />
              <span>{vendor.location}</span>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Package size={16} />
              <span>{vendor.products}</span>
              <label>Produits</label>
            </div>
            <div className={styles.stat}>
              <Wrench size={16} />
              <span>{vendor.services}</span>
              <label>Services</label>
            </div>
            <div className={styles.stat}>
              <BookOpen size={16} />
              <span>{vendor.ebooks}</span>
              <label>Ebooks</label>
            </div>
          </div>

          {/* Rating */}
          <div className={styles.rating}>
            <Star size={16} className={styles.starIcon} />
            <span className={styles.ratingValue}>{vendor.rating}</span>
            <span className={styles.reviews}>/ 5</span>
            <span className={styles.ratingLabel}>note</span>
          </div>

          {/* CTA */}
          <div className={styles.cta}>
            <span>Visiter la boutique</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}