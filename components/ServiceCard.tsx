'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, DollarSign, Briefcase, Image } from 'lucide-react';
import { Service, formatPrice } from '@/data/mockData';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/service/${service.id}`} className={styles.link}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <img
            src={service.images[0]}
            alt={service.title}
            className={styles.image}
          />
          
          <div className={styles.categoryBadge}>
            {service.category}
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Vendor */}
          <div className={styles.vendor}>
            <img
              src={service.vendor.avatar}
              alt={service.vendor.shopName}
              className={styles.vendorAvatar}
            />
            <div className={styles.vendorInfo}>
              <span className={styles.vendorName}>{service.vendor.shopName}</span>
              <span className={styles.vendorLocation}>{service.vendor.location}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={styles.title}>{service.title}</h3>

          {/* Description */}
          <p className={styles.description}>{service.description}</p>

          {/* Meta */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Star size={14} className={styles.starIcon} />
              <span>{service.rating}</span>
              <span className={styles.reviews}>({service.reviews})</span>
            </div>
            <div className={styles.metaItem}>
              <Clock size={14} />
              <span>{service.deliveryTime}</span>
            </div>
            {service.portfolio.length > 0 && (
              <div className={styles.metaItem}>
                <Image size={14} />
                <span>{service.portfolio.length}</span>
              </div>
            )}
          </div>

          {/* Price & Action */}
          <div className={styles.footer}>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{formatPrice(service.price)}</span>
              {service.negotiable && (
                <span className={styles.negotiable}>Négociable</span>
              )}
            </div>
            <span className={styles.cta}>
              Voir détail
              <Briefcase size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}