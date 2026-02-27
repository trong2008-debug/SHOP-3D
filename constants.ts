
import { Product, SizeOption, MaterialOption } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Katana High-Poly', image: 'https://picsum.photos/seed/katana/800/600', basePrice: 70000, badge: 'HOT' },
  { id: 2, name: 'Cyberpunk Blaster', image: 'https://picsum.photos/seed/gun/800/600', basePrice: 90000, badge: 'NEW' },
  { id: 3, name: 'Ethereal Figure', image: 'https://picsum.photos/seed/figure/800/600', basePrice: 120000, badge: 'PREMIUM' },
  { id: 4, name: 'Formula 1 Chassis', image: 'https://picsum.photos/seed/f1/800/600', basePrice: 150000, badge: 'LIMIT' },
  { id: 5, name: 'BMW M4 Competition', image: 'https://picsum.photos/seed/bmw/800/600', basePrice: 70000, badge: 'DETAILED' },
  { id: 6, name: 'Raichu Evolution', image: 'https://picsum.photos/seed/raichu/800/600', basePrice: 70000, badge: 'FAVORITE' },
];

export const SIZES: SizeOption[] = [
  { label: '30 cm', multiplier: 1 },
  { label: '50 cm', multiplier: 1.5 },
  { label: '80 cm', multiplier: 2 },
];

export const MATERIALS: MaterialOption[] = [
  { label: 'PLA (Tough)', multiplier: 1 },
  { label: 'Resin (Hyper-Detail)', multiplier: 1.4 },
];

export const CONTACTS = {
  zalo: '0396043085',
  email: 'shopin3d@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=61578654816696'
};
