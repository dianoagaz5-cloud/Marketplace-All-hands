'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Store, MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react';
import styles from './Footer.module.css';

const footerLinks = {
  products: [
    { label: 'Électronique', href: '/boutique?cat=electronique' },
    { label: 'Mode & Beauté', href: '/boutique?cat=mode' },
    { label: 'Maison & Décoration', href: '/boutique?cat=maison' },
    { label: 'Alimentation', href: '/boutique?cat=alimentation' },
    { label: 'Sports', href: '/boutique?cat=sports' },
  ],
  services: [
    { label: 'Développement', href: '/services?cat=developpement' },
    { label: 'Design', href: '/services?cat=design' },
    { label: 'Réparation', href: '/services?cat=repair' },
    { label: 'Livraison', href: '/services?cat=livraison' },
  ],
  company: [
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
    { label: 'Carrières', href: '/carrieres' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Conditions générales', href: '/conditions' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Politique de livraison', href: '/livraison' },
    { label: 'Retours & Remboursements', href: '/retours' },
  ],
};

const socialLinks = [
  { icon: Globe, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Globe, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Globe, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Globe, href: 'https://youtube.com', label: 'Youtube' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brandColumn}>
              <Link href="/" className={styles.logo}>
                <div className={styles.logoIcon}>
                  <Store size={24} />
                </div>
                <span className={styles.logoText}>Marketplace</span>
              </Link>
              <p className={styles.description}>
                La première marketplace multi-vendeurs du Bénin. Achetez et vendez facilement des produits physiques, des services et des ebooks.
              </p>
              
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <MapPin size={18} />
                  <span>Rue 224, Akplomèdji, Cotonou, Bénin</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={18} />
                  <span>+229 97 XX XX XX</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={18} />
                  <span>contact@marketplace.bj</span>
                </div>
                <div className={styles.contactItem}>
                  <Clock size={18} />
                  <span>Lun - Sam: 8h - 20h</span>
                </div>
              </div>
            </div>

            {/* Products Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Produits</h4>
              <ul className={styles.linkList}>
                {footerLinks.products.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Services</h4>
              <ul className={styles.linkList}>
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className={styles.linkColumn}>
              <h4 className={styles.columnTitle}>Entreprise</h4>
              <ul className={styles.linkList}>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletterColumn}>
              <h4 className={styles.columnTitle}>Newsletter</h4>
              <p className={styles.newsletterText}>
                Inscrivez-vous pour recevoir nos offres spéciales et nouvelles.
              </p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Votre email"
                  className={styles.newsletterInput}
                />
                <button type="submit" className={styles.newsletterBtn}>
                  <Send size={18} />
                </button>
              </form>

              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Section */}
      <div className={styles.legal}>
        <div className={styles.container}>
          <div className={styles.legalContent}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Marketplace Benin. Tous droits réservés.
            </p>
            <div className={styles.legalLinks}>
              {footerLinks.legal.map((link) => (
                <Link key={link.href} href={link.href} className={styles.legalLink}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentLabel}>Moyens de paiement:</span>
              <div className={styles.paymentIcons}>
                <span className={styles.paymentIcon}>MTN MoMo</span>
                <span className={styles.paymentIcon}>Moov Money</span>
                <span className={styles.paymentIcon}>Celtiis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}