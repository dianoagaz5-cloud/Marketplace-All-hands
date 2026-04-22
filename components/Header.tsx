'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Package, Wrench, BookOpen, Star, Store, TrendingUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { products, services, ebooks } from '@/data/mockData';
import styles from './Header.module.css';

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/boutique' },
  { label: 'Services', href: '/services' },
  { label: 'Ebooks', href: '/ebooks' },
  { label: 'Vendeurs', href: '/vendeurs' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

const sellOptions = [
  { label: 'Vendre des produits', icon: Package, href: '/vendeur/produits' },
  { label: 'Proposer un service', icon: Wrench, href: '/vendeur/services' },
  { label: 'Vendre un ebook', icon: BookOpen, href: '/vendeur/ebooks' },
];

export default function Header() {
  const pathname = usePathname();
  const { cartCount, user, setUser, setAiOpen } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sellDropdownOpen, setSellDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const productResults = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 3);
      const serviceResults = services.filter(s => s.title.toLowerCase().includes(query)).slice(0, 2);
      const ebookResults = ebooks.filter(e => e.title.toLowerCase().includes(query)).slice(0, 2);
      setSearchResults([...productResults, ...serviceResults, ...ebookResults]);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = () => {
    setUser({
      id: 'user1',
      name: 'Jean Dupont',
      email: 'jean@example.com',
      isVendor: true,
      vendorId: 'v1',
    });
    setAccountDropdownOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Store size={24} />
          </div>
          <span className={styles.logoText}>Marketplace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className={styles.searchWrapper} ref={searchRef}>
          <div className={`${styles.searchBar} ${searchOpen ? styles.searchOpen : ''}`}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Rechercher produits, services, ebooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={styles.clearSearch}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {searchOpen && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.searchResults}
              >
                {searchResults.map((result, index) => (
                  <Link
                    key={result.id}
                    href={result.price ? `/produit/${result.id}` : `/service/${result.id}`}
                    className={styles.searchResultItem}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className={styles.resultImage}>
                      {result.images?.[0] ? (
                        <img src={result.images[0]} alt={result.name || result.title} />
                      ) : result.cover ? (
                        <img src={result.cover} alt={result.title} />
                      ) : (
                        <Package size={20} />
                      )}
                    </div>
                    <div className={styles.resultInfo}>
                      <span className={styles.resultName}>{result.name || result.title}</span>
                      <span className={styles.resultPrice}>
                        {result.price?.toLocaleString('fr-BJ')} FCAF
                      </span>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Sell Button with Dropdown */}
          <div className={styles.dropdownWrapper}>
            <button
              className={`btn btn-secondary ${styles.sellBtn}`}
              onClick={() => setSellDropdownOpen(!sellDropdownOpen)}
            >
              Commencer à vendre
              <ChevronDown size={16} />
            </button>

            <AnimatePresence>
              {sellDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.dropdown}
                >
                  {sellOptions.map((option) => (
                    <Link
                      key={option.href}
                      href={option.href}
                      className={styles.dropdownItem}
                      onClick={() => setSellDropdownOpen(false)}
                    >
                      <option.icon size={18} />
                      <span>{option.label}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Assistant Button */}
          <button
            className={styles.iconBtn}
            onClick={() => setAiOpen(true)}
            aria-label="Assistant IA"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
              <circle cx="7.5" cy="14.5" r="1.5" fill="currentColor" />
              <circle cx="16.5" cy="14.5" r="1.5" fill="currentColor" />
            </svg>
          </button>

          {/* Cart */}
          <Link href="/panier" className={styles.iconBtn}>
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>

          {/* Account */}
          <div className={styles.dropdownWrapper}>
            <button
              className={styles.iconBtn}
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
            >
              <User size={22} />
            </button>

            <AnimatePresence>
              {accountDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={styles.dropdown}
                >
                  {user ? (
                    <>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{user.name}</span>
                        <span className={styles.userEmail}>{user.email}</span>
                      </div>
                      <Link
                        href="/compte"
                        className={styles.dropdownItem}
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        <User size={18} />
                        <span>Mon compte</span>
                      </Link>
                      {user.isVendor && (
                        <Link
                          href="/dashboard"
                          className={styles.dropdownItem}
                          onClick={() => setAccountDropdownOpen(false)}
                        >
                          <Store size={18} />
                          <span>Dashboard Vendeur</span>
                        </Link>
                      )}
                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          setUser(null);
                          setAccountDropdownOpen(false);
                        }}
                      >
                        <X size={18} />
                        <span>Déconnexion</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className={styles.dropdownItem}
                        onClick={handleLogin}
                      >
                        <User size={18} />
                        <span>Connexion Demo</span>
                      </button>
                      <Link
                        href="/inscription"
                        className={styles.dropdownItem}
                        onClick={() => setAccountDropdownOpen(false)}
                      >
                        <Store size={18} />
                        <span>Devenir vendeur</span>
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={styles.mobileMenu}
          >
            <nav className={styles.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${pathname === item.href ? styles.active : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className={styles.mobileSellSection}>
              <span className={styles.mobileSellTitle}>Commencer à vendre</span>
              <Link href="/vendeur/produits" className={styles.mobileSellLink} onClick={() => setMenuOpen(false)}>
                <Package size={18} />
                <span>Vendre des produits</span>
              </Link>
              <Link href="/vendeur/services" className={styles.mobileSellLink} onClick={() => setMenuOpen(false)}>
                <Wrench size={18} />
                <span>Proposer un service</span>
              </Link>
              <Link href="/vendeur/ebooks" className={styles.mobileSellLink} onClick={() => setMenuOpen(false)}>
                <BookOpen size={18} />
                <span>Vendre un ebook</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}