
import React, { useState, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { SIZES, MATERIALS } from '../constants';
import { ShoppingCart, Check, Heart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (item: CartItem) => void;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isWishlisted, 
  onAddToCart, 
  onToggleWishlist 
}) => {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [materialIdx, setMaterialIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const currentPrice = useMemo(() => {
    return Math.round(
      product.basePrice * 
      SIZES[sizeIdx].multiplier * 
      MATERIALS[materialIdx].multiplier * 
      quantity
    );
  }, [product.basePrice, sizeIdx, materialIdx, quantity]);

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      size: SIZES[sizeIdx].label,
      sizeMultiplier: SIZES[sizeIdx].multiplier,
      material: MATERIALS[materialIdx].label,
      materialMultiplier: MATERIALS[materialIdx].multiplier,
      quantity,
      price: currentPrice
    });
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden card-shadow flex flex-col h-full" id={`product-${product.id}`}>
      {/* Favorite Button */}
      <button 
        onClick={() => onToggleWishlist(product)}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-theme-border transition-all duration-200 springy ${
          isWishlisted ? 'text-rose-500' : 'text-theme-text opacity-20 hover:opacity-100 hover:text-rose-500'
        }`}
        aria-label="Yêu thích"
      >
        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
      </button>
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] bg-theme-bg overflow-hidden cursor-pointer">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-theme-accent text-white text-[9px] font-black tracking-widest rounded-lg uppercase shadow-md shadow-theme-accent/20">
            {product.badge}
          </div>
        )}
      </div>

      <div className="p-7 flex-1 flex flex-col">
        <h3 className="text-2xl font-black mb-5 text-theme-text tracking-tight leading-snug group-hover:text-theme-accent transition-colors duration-300">
          {product.name}
        </h3>
        
        <div className="space-y-5 mb-8">
          {/* Size Selector */}
          <div>
            <label className="block text-[10px] font-bold text-theme-text opacity-40 uppercase tracking-widest mb-2.5 ml-0.5">Kích thước</label>
            <div className="flex gap-1.5 p-1.5 bg-theme-bg border border-theme-border rounded-2xl shadow-inner">
              {SIZES.map((s, idx) => (
                <button
                  key={s.label}
                  onClick={() => setSizeIdx(idx)}
                  className={`flex-1 py-2 text-[11px] font-bold rounded-xl transition-all duration-200 ${
                    sizeIdx === idx 
                      ? 'bg-white text-theme-accent shadow-md border border-theme-accent/20' 
                      : 'text-theme-text opacity-40 hover:opacity-100 hover:bg-theme-accent-light'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Material Selector */}
          <div>
            <label className="block text-[10px] font-bold text-theme-text opacity-40 uppercase tracking-widest mb-2.5 ml-0.5">Vật liệu in</label>
            <div className="flex gap-3">
              {MATERIALS.map((m, idx) => (
                <button
                  key={m.label}
                  onClick={() => setMaterialIdx(idx)}
                  className={`flex-1 py-3 px-3 text-[11px] font-bold rounded-2xl border-2 transition-all duration-200 ${
                    materialIdx === idx 
                      ? 'bg-theme-accent-light border-theme-accent text-theme-accent shadow-sm' 
                      : 'bg-white border-theme-border text-theme-text opacity-40 hover:opacity-100 hover:border-theme-accent/40'
                  }`}
                >
                  {m.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer section */}
        <div className="mt-auto pt-6 border-t border-theme-border flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] text-theme-text opacity-40 font-bold uppercase tracking-widest mb-0.5">Giá Hoàn thiện</span>
              <span className="text-3xl font-black text-theme-text tracking-tighter">
                {currentPrice.toLocaleString()}đ
              </span>
            </div>
            <div className="flex items-center bg-theme-bg rounded-xl p-1 gap-1 border border-theme-border shadow-inner">
                <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-theme-text opacity-60 hover:opacity-100 hover:text-theme-accent transition-all springy shadow-sm border border-theme-border"
                >-</button>
                <span className="w-8 text-center text-sm font-black text-theme-text">{quantity}</span>
                <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-theme-text opacity-60 hover:opacity-100 hover:text-theme-accent transition-all springy shadow-sm border border-theme-border"
                >+</button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full py-4.5 rounded-2xl flex items-center justify-center gap-3 font-black text-[11px] tracking-widest transition-all duration-300 springy shadow-lg ${
              isAdding 
                ? 'bg-emerald-600 text-white shadow-none' 
                : 'bg-theme-accent text-white hover:bg-theme-accent-hover shadow-theme-accent/20'
            }`}
          >
            {isAdding ? (
              <div className="flex items-center gap-2 check-pop">
                <Check size={18} strokeWidth={3} />
                ĐÃ THÊM
              </div>
            ) : (
              <>
                <ShoppingCart size={18} strokeWidth={2.5} />
                ĐẶT MUA NGAY
                <ArrowRight size={16} strokeWidth={2.5} className="ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
