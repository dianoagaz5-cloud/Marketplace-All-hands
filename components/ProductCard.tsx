'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, Star, Flame, Clock } from 'lucide-react';
import { Product, formatPrice } from '@/data/mockData';
import { useApp } from '@/contexts/AppContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      type: 'product',
      item: product,
      quantity: 1,
    });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Calculate flash sale time remaining
  const getTimeRemaining = () => {
    if (!product.flashSaleEnds) return null;
    const diff = product.flashSaleEnds.getTime() - Date.now();
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
  };

  const timeRemaining = getTimeRemaining();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Link href={`/produit/${product.id}`} className={styles.link}>
        {/* Image Container */}
        <div className={styles.imageContainer}>
          {!imageLoaded && <div className={`${styles.imageSkeleton} skeleton`} />}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Badges */}
          <div className={styles.badges}>
            {product.flashSale && (
              <span className={`${styles.badge} ${styles.badgeFlash}`}>
                <Flame size={14} />
                Flash
              </span>
            )}
            {product.originalPrice && (
              <span className={`${styles.badge} ${styles.badgeSale}`}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Flash Sale Timer */}
          {product.flashSale && timeRemaining && (
            <div className={styles.flashTimer}>
              <Clock size={14} />
              <span>
                {String(timeRemaining.hours).padStart(2, '0')}:
                {String(timeRemaining.minutes).padStart(2, '0')}:
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <button
              className={`${styles.quickAction} ${isFavorite ? styles.active : ''}`}
              onClick={handleFavorite}
              aria-label="Ajouter aux favoris"
            >
              <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button
              className={styles.quickAction}
              onClick={handleAddToCart}
              aria-label="Ajouter au panier"
            >
              <ShoppingCart size={18} />
            </button>
            <Link href={`/produit/${product.id}`} className={styles.quickAction}>
              <Eye size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {/* Vendor */}
          <div className={styles.vendor}>
            <img
              src={product.vendor.avatar}
              alt={product.vendor.shopName}
              className={styles.vendorAvatar}
            />
            <span className={styles.vendorName}>{product.vendor.shopName}</span>
            {product.vendor.verified && (
              <span className={styles.verified}>✓</span>
            )}
          </div>

          {/* Title */}
          <h3 className={styles.title}>{product.name}</h3>

          {/* Rating */}
          <div className={styles.rating}>
            <Star size={14} className={styles.starIcon} />
            <span className={styles.ratingValue}>{product.rating}</span>
            <span className={styles.reviews}>({product.reviews})</span>
          </div>

          {/* Price */}
          <div className={styles.priceContainer}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}