export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  vendor: Vendor;
  rating: number;
  reviews: number;
  inStock: boolean;
  flashSale?: boolean;
  flashSaleEnds?: Date;
  createdAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  negotiable: boolean;
  images: string[];
  category: string;
  vendor: Vendor;
  rating: number;
  reviews: number;
  portfolio: string[];
  deliveryTime: string;
  createdAt: Date;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  author: string;
  pages: number;
  category: string;
  vendor: Vendor;
  rating: number;
  reviews: number;
  preview: string;
  createdAt: Date;
}

export interface Vendor {
  id: string;
  name: string;
  shopName: string;
  description: string;
  avatar: string;
  banner: string;
  location: string;
  rating: number;
  products: number;
  services: number;
  ebooks: number;
  verified: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  count: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Électronique', icon: 'smartphone', slug: 'electronique', count: 245 },
  { id: '2', name: 'Mode & Beauté', icon: 'shirt', slug: 'mode-beaute', count: 532 },
  { id: '3', name: 'Alimentation', icon: 'apple', slug: 'alimentation', count: 189 },
  { id: '4', name: 'Maison & Décoration', icon: 'home', slug: 'maison-decoration', count: 321 },
  { id: '5', name: 'Services', icon: 'wrench', slug: 'services', count: 156 },
  { id: '6', name: 'Ebooks', icon: 'book', slug: 'ebooks', count: 78 },
  { id: '7', name: 'Sports', icon: 'dumbbell', slug: 'sports', count: 112 },
  { id: '8', name: 'Véhicules', icon: 'car', slug: 'vehicules', count: 67 },
];

export const serviceCategories = [
  { id: 'dev', name: 'Développement', icon: 'code' },
  { id: 'design', name: 'Design', icon: 'palette' },
  { id: 'repair', name: 'Réparation', icon: 'tool' },
  { id: 'delivery', name: 'Livraison', icon: 'truck' },
];

export const locations = [
  'Cotonou',
  'Abomey-Calavi',
  'Porto-Novo',
  'Ouidah',
  'Parakou',
  'Natitingou',
  'Bohicon',
  'Save',
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    name: 'Alain Kped',
    shopName: 'TechZone Benin',
    description: 'Spécialiste en produits électroniques et gadgets technologiques au Benin. Nous proposons les dernières nouveautés en matière de smartphones, ordinateurs et accessoires.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=400&fit=crop',
    location: 'Cotonou',
    rating: 4.8,
    products: 45,
    services: 3,
    ebooks: 0,
    verified: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 'v2',
    name: 'Marie Adanvo',
    shopName: 'Marie Couture',
    description: 'Créatrice demode authentiqueinspired par la culture béninoise. Robes traditionnelles et modernes, accessoires uniques.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    location: 'Abomey-Calavi',
    rating: 4.9,
    products: 28,
    services: 0,
    ebooks: 0,
    verified: true,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: 'v3',
    name: 'Jean-Marc Houngbo',
    shopName: 'JM Services',
    description: 'Expert en développement web et mobile. Création de sites web, applications mobiles et solutions digitales.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop',
    location: 'Cotonou',
    rating: 4.7,
    products: 0,
    services: 12,
    ebooks: 5,
    verified: true,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: 'v4',
    name: 'Sophie Adeyemi',
    shopName: 'Sophie Bio',
    description: 'Produits biologiques et naturels du Benin. Cosmétiques, alimentaire et produits d\'entretien écologiques.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
    location: 'Porto-Novo',
    rating: 4.6,
    products: 34,
    services: 0,
    ebooks: 0,
    verified: true,
    createdAt: new Date('2024-04-05'),
  },
  {
    id: 'v5',
    name: 'David Okou',
    shopName: 'AutoCare Benin',
    description: 'Réparation et entretien de véhicules toutes marques. Service rapide et professionnel à domicile.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    banner: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&h=400&fit=crop',
    location: 'Cotonou',
    rating: 4.5,
    products: 0,
    services: 8,
    ebooks: 2,
    verified: false,
    createdAt: new Date('2024-05-12'),
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Le dernier né d\'Apple avec écran Super Retina XDR, processeur A17 Pro et appareil photo professionnelle. Garantie 1 an.',
    price: 625000,
    originalPrice: 699000,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
    ],
    category: 'Électronique',
    vendor: vendors[0],
    rating: 4.9,
    reviews: 124,
    inStock: true,
    flashSale: true,
    flashSaleEnds: new Date(Date.now() + 8 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'p2',
    name: 'Robe Traditionnelle Béninoise',
    description: 'Robe artisanale en wax authentique avec motifs traditionnels.Confectionnée par des tisserands locaux.',
    price: 45000,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
    ],
    category: 'Mode & Beauté',
    vendor: vendors[1],
    rating: 4.8,
    reviews: 67,
    inStock: true,
    createdAt: new Date('2024-11-05'),
  },
  {
    id: 'p3',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Smartphone haut de gamme avec S Pen intégré, écran Dynamic AMOLED et appareil photo 200MP.',
    price: 585000,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
    ],
    category: 'Électronique',
    vendor: vendors[0],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    createdAt: new Date('2024-11-10'),
  },
  {
    id: 'p4',
    name: 'Huiles Essentielles Bio',
    description: 'Collection d\'huiles essentielles 100% naturelles: eucalyptus, lavande, citronnelle. Pression à froid.',
    price: 8500,
    originalPrice: 12000,
    images: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
    ],
    category: 'Alimentation',
    vendor: vendors[3],
    rating: 4.6,
    reviews: 45,
    inStock: true,
    createdAt: new Date('2024-11-12'),
  },
  {
    id: 'p5',
    name: 'MacBook Air M3 13"',
    description: 'Ord ultraportable avec-puissant processeur M3, autonomie exceptionnelle et design fin.',
    price: 795000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    ],
    category: 'Électronique',
    vendor: vendors[0],
    rating: 5.0,
    reviews: 56,
    inStock: true,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: 'p6',
    name: 'Sac en Cuir Artisanal',
    description: 'Sac à main en cuir véritable confectionné par des artisans béninois. Style unique et durable.',
    price: 35000,
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
    ],
    category: 'Mode & Beauté',
    vendor: vendors[1],
    rating: 4.7,
    reviews: 32,
    inStock: true,
    createdAt: new Date('2024-11-18'),
  },
  {
    id: 'p7',
    name: 'Casque Audio Sony WH-1000XM5',
    description: 'Casque sans fil à réduction de bruit active premium. Qualité audio exceptionnelle.',
    price: 125000,
    originalPrice: 150000,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop',
    ],
    category: 'Électronique',
    vendor: vendors[0],
    rating: 4.8,
    reviews: 78,
    inStock: true,
    flashSale: true,
    flashSaleEnds: new Date(Date.now() + 4 * 60 * 60 * 1000),
    createdAt: new Date('2024-11-20'),
  },
  {
    id: 'p8',
    name: 'Miroir Art Déco',
    description: 'M décoratif mural avec cadre en bois sculpté. Pièce unique faite main.',
    price: 28000,
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop',
    ],
    category: 'Maison & Décoration',
    vendor: vendors[3],
    rating: 4.5,
    reviews: 21,
    inStock: true,
    createdAt: new Date('2024-11-22'),
  },
];

export const services: Service[] = [
  {
    id: 's1',
    title: 'Création de Site Web Professionnel',
    description: 'Sites web responsives, optimisés SEO, administration facile. Includes hébergement et domaine .bj gratuit.',
    price: 150000,
    negotiable: true,
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
    ],
    category: 'Développement',
    vendor: vendors[2],
    rating: 4.9,
    reviews: 34,
    portfolio: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    ],
    deliveryTime: '7 jours',
    createdAt: new Date('2024-10-01'),
  },
  {
    id: 's2',
    title: 'Design Logo & Identité Visuelle',
    description: 'Création de logo professionnel, carte de visite, papier en-tête. 3 propositions + modifications illimitées.',
    price: 75000,
    negotiable: true,
    images: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
    ],
    category: 'Design',
    vendor: vendors[2],
    rating: 4.8,
    reviews: 56,
    portfolio: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    ],
    deliveryTime: '3 jours',
    createdAt: new Date('2024-10-15'),
  },
  {
    id: 's3',
    title: 'Réparation Téléphone Toutes Marques',
    description: 'Remplacement écran, batterie, connecteur. Diagnostic gratuit. Pièces originales garanties.',
    price: 15000,
    negotiable: false,
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop',
    ],
    category: 'Réparation',
    vendor: vendors[4],
    rating: 4.6,
    reviews: 89,
    portfolio: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop',
    ],
    deliveryTime: '2 heures',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 's4',
    title: 'Livraison Express à Cotonou',
    description: 'Livraison rapide de colis dans tout Cotonou. Suivi en temps réel. Assurance incluse.',
    price: 2000,
    negotiable: true,
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop',
    ],
    category: 'Livraison',
    vendor: vendors[4],
    rating: 4.7,
    reviews: 234,
    portfolio: [],
    deliveryTime: '2 heures',
    createdAt: new Date('2024-11-10'),
  },
  {
    id: 's5',
    title: 'Développement Application Mobile',
    description: 'Applications iOS et Android natives ou cross-platform. UI/UX design inclus.',
    price: 350000,
    negotiable: true,
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    ],
    category: 'Développement',
    vendor: vendors[2],
    rating: 4.9,
    reviews: 23,
    portfolio: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    ],
    deliveryTime: '30 jours',
    createdAt: new Date('2024-11-15'),
  },
];

export const ebooks: Ebook[] = [
  {
    id: 'e1',
    title: 'Guide Complet du Marketing Digital au Benin',
    description: 'Apprenez à promouvoir votre business en ligne avec des stratégies adaptées au marché béninois. Includes études de cas locales.',
    price: 8500,
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop',
    author: 'Jean-Marc Houngbo',
    pages: 245,
    category: 'Business',
    vendor: vendors[2],
    rating: 4.7,
    reviews: 45,
    preview: 'Chapitre 1: Introduction au Marketing Digital...',
    createdAt: new Date('2024-09-01'),
  },
  {
    id: 'e2',
    title: 'Recettes de Cuisine Béninoise Authentique',
    description: '50 recettes traditionnelles du Benin: from akassa to tapioca. Photos step-by-step pour chaque plat.',
    price: 4500,
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
    author: 'Marie Adanvo',
    pages: 180,
    category: 'Cuisine',
    vendor: vendors[1],
    rating: 4.9,
    reviews: 78,
    preview: 'Introduction: La cuisine béninoise...',
    createdAt: new Date('2024-10-15'),
  },
  {
    id: 'e3',
    title: 'Apprendre à Programmer en Python',
    description: 'Cours complet pour débutants. Exercices pratiques et projets concrets. Parfait pour démarrer dans la programmation.',
    price: 12000,
    cover: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=600&fit=crop',
    author: 'Jean-Marc Houngbo',
    pages: 420,
    category: 'Programmation',
    vendor: vendors[2],
    rating: 4.8,
    reviews: 123,
    preview: 'Chapitre 1: Premiers pas avec Python...',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'e4',
    title: 'Guide de l\'Entrepreneuriat au Benin',
    description: 'Tout ce qu\'il faut savoir pour créer son entreprise au Benin: formalités, financement, gestion.',
    price: 6500,
    cover: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop',
    author: 'Sophie Adeyemi',
    pages: 156,
    category: 'Business',
    vendor: vendors[3],
    rating: 4.6,
    reviews: 34,
    preview: 'Chapitre 1: Choisir son statut juridique...',
    createdAt: new Date('2024-11-20'),
  },
  {
    id: 'e5',
    title: 'Yoga et Bien-être pourTous',
    description: 'Cours de yoga détaillé avec illustrations. Séances de méditation et exercices de respiration.',
    price: 5500,
    cover: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop',
    author: 'Sophie Adeyemi',
    pages: 198,
    category: 'Bien-être',
    vendor: vendors[3],
    rating: 4.8,
    reviews: 67,
    preview: 'Introduction: Le yoga, une philosophie de vie...',
    createdAt: new Date('2024-12-01'),
  },
];

// Helper function to format price in FCAF
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-BJ', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Get flash sale products
export function getFlashSaleProducts(): Product[] {
  return products.filter(p => p.flashSale);
}

// Get popular products
export function getPopularProducts(): Product[] {
  return products.slice(0, 8);
}

// Get popular services
export function getPopularServices(): Service[] {
  return services.slice(0, 4);
}

// Get popular ebooks
export function getPopularEbooks(): Ebook[] {
  return ebooks.slice(0, 4);
}

// Get popular vendors
export function getPopularVendors(): Vendor[] {
  return vendors.slice(0, 4);
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

// Get services by category
export function getServicesByCategory(category: string): Service[] {
  return services.filter(s => s.category === category);
}

// Get ebooks by category
export function getEbooksByCategory(category: string): Ebook[] {
  return ebooks.filter(e => e.category === category);
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

// Get service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find(s => s.id === id);
}

// Get ebook by ID
export function getEbookById(id: string): Ebook | undefined {
  return ebooks.find(e => e.id === id);
}

// Get vendor by ID
export function getVendorById(id: string): Vendor | undefined {
  return vendors.find(v => v.id === id);
}