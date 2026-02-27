
import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageSquare, Mail, Facebook, Send, Trash2, Gift, Sparkles, Heart, X, ChevronRight, Menu, Zap, ShieldCheck, Truck, Box } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { LuckySpin } from './components/LuckySpin';
import { PRODUCTS, CONTACTS } from './constants';
import { CartItem, Product } from './types';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [discount, setDiscount] = useState(0);
  const [showLucky, setShowLucky] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedHasSpun = localStorage.getItem('hasSpun');
    if (savedHasSpun) setHasSpun(JSON.parse(savedHasSpun));
    
    const savedDiscount = localStorage.getItem('discount');
    if (savedDiscount) setDiscount(JSON.parse(savedDiscount));
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('hasSpun', JSON.stringify(hasSpun));
    localStorage.setItem('discount', JSON.stringify(discount));
  }, [cart, hasSpun, discount]);

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = subtotal * (1 - discount / 100);

  const addToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const handleOrder = () => {
    if (cart.length === 0) return alert('Giỏ hàng trống!');
    let message = "📦 ĐƠN HÀNG MỚI - SHOP IN 3D\n\n";
    cart.forEach(item => { message += `• ${item.name} (${item.size}, ${item.material}) x${item.quantity}: ${item.price.toLocaleString()}đ\n`; });
    if (discount > 0) message += `\n🎁 Voucher giảm: ${discount}%`;
    message += `\n💰 TỔNG CỘNG: ${total.toLocaleString()}đ`;
    window.open(`https://zalo.me/${CONTACTS.zalo}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-bg">
      {/* Top Notification Bar */}
      <div className="bg-theme-accent text-white py-2.5 px-6 text-center text-[10px] font-black tracking-[0.2em] uppercase flex items-center justify-center gap-3 shadow-sm">
        <Truck size={14} />
        <span>Giao hàng miễn phí toàn quốc cho đơn từ 500k</span>
      </div>

      {/* Main Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-theme-border px-6 sm:px-10 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 text-theme-text opacity-70 hover:opacity-100 hover:text-theme-accent" aria-label="Menu">
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 rounded-xl bg-theme-accent flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-transform duration-300">
                <Box size={20} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-black tracking-tight text-theme-text">
                  SHOPIN<span className="text-theme-accent italic font-medium">3D</span>
                </h1>
                <span className="text-[8px] uppercase font-bold text-theme-text opacity-40 tracking-[0.3em] leading-none">Fresh Daylight Studio</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-10">
            {['Sản phẩm', 'Xưởng in', 'Câu chuyện', 'Liên hệ'].map(item => (
              <a key={item} href="#" className="relative text-[11px] font-bold text-theme-text opacity-70 hover:opacity-100 hover:text-theme-accent transition-colors uppercase tracking-[0.15em] group py-1">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-theme-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsWishlistOpen(true)} className="relative p-2.5 text-theme-text opacity-50 hover:opacity-100 hover:text-rose-500 springy">
                <Heart size={22} className={wishlist.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                {wishlist.length > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">{wishlist.length}</span>}
              </button>

              <button onClick={() => setIsCartOpen(true)} className="relative p-2.5 text-theme-text opacity-50 hover:opacity-100 hover:text-theme-accent springy">
                <ShoppingBag size={22} />
                {cart.length > 0 && <span className="absolute top-1.5 right-1.5 w-4.5 h-4.5 bg-theme-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">{cart.length}</span>}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-8 bg-white border-b border-theme-border overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-theme-bg opacity-40 pointer-events-none skew-x-12 transform translate-x-20" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-theme-accent-light border border-theme-accent/20 text-[10px] uppercase font-black tracking-[0.2em] text-theme-accent mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <Zap size={14} className="fill-theme-accent" />
            Công nghệ in 3D sinh động
          </div>
          
          <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1] text-theme-text">
            Biến Ý Tưởng Thành <br /> 
            <span className="text-theme-accent italic font-medium">Hiện Thực Rạng Rỡ</span>
          </h2>
          
          <p className="max-w-xl mx-auto text-theme-text opacity-60 text-lg font-medium leading-relaxed mb-14">
            Thiết kế sáng tạo và in ấn chuyên nghiệp, mang lại vẻ đẹp tươi mới và sắc nét trong từng sản phẩm 3D cao cấp.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4.5 bg-theme-accent text-white rounded-xl font-bold text-[11px] tracking-widest hover:bg-theme-accent-hover transition-all shadow-lg shadow-theme-accent/20 springy"
            >
              KHÁM PHÁ CỬA HÀNG
            </button>
            <button 
              onClick={() => !hasSpun && setShowLucky(true)}
              className="px-10 py-4.5 bg-white border border-theme-border text-theme-text rounded-xl font-bold text-[11px] tracking-widest hover:bg-theme-bg hover:border-theme-accent/40 transition-all flex items-center gap-3 shadow-md springy"
            >
              <Gift size={20} className="text-theme-accent" />
              ƯU ĐÃI NGÀY MỚI
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-24 w-full max-w-5xl">
            {[
              { icon: Truck, title: 'Giao hàng tốc hành', desc: 'Đóng gói xanh, giao tận tay' },
              { icon: ShieldCheck, title: 'Chất lượng chuẩn', desc: 'Sản phẩm bền bỉ, sắc sảo' },
              { icon: Sparkles, title: 'Tư vấn miễn phí', desc: 'Hỗ trợ thiết kế theo ý bạn' }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-theme-bg/40 border border-theme-border hover:bg-white hover:border-theme-accent/30 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-theme-accent shadow-md border border-theme-border group-hover:scale-110 transition-transform duration-300"><feature.icon size={26}/></div>
                <div>
                  <h4 className="font-bold text-theme-text text-base tracking-tight mb-1">{feature.title}</h4>
                  <p className="text-[12px] text-theme-text opacity-50 font-medium leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <main id="catalog" className="flex-1 max-w-7xl mx-auto px-8 py-20 w-full">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-14 gap-8">
          <div className="text-left">
            <h3 className="text-4xl font-black text-theme-text mb-2 tracking-tight">Thư Viện Sáng Tạo</h3>
            <p className="text-theme-text opacity-50 font-medium text-base">Những tác phẩm in 3D tươi mới cho không gian của bạn.</p>
          </div>
          <div className="flex gap-2.5 p-1.5 bg-white rounded-xl border border-theme-border shadow-sm">
            {['Tất cả', 'Decor', 'Gaming'].map((tag) => (
              <button key={tag} className={`px-8 py-2.5 rounded-lg text-[10px] font-black tracking-widest transition-all springy ${tag === 'Tất cả' ? 'bg-theme-accent text-white shadow-md' : 'text-theme-text opacity-40 hover:opacity-100 hover:text-theme-accent'}`}>
                {tag.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isWishlisted={wishlist.some(p => p.id === product.id)}
              onAddToCart={addToCart} 
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-theme-border pt-20 pb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 items-start">
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-theme-accent flex items-center justify-center text-white shadow-md"><Box size={22}/></div>
                <h2 className="text-xl font-black text-theme-text tracking-tighter uppercase">SHOP IN 3D</h2>
              </div>
              <p className="text-theme-text text-sm opacity-60 leading-relaxed font-medium">
                Khám phá thế giới 3D đầy màu sắc với công nghệ in ấn hiện đại và sự tận tâm từ Fresh Studio.
              </p>
              <div className="flex gap-4">
                {[Facebook, MessageSquare, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="w-11 h-11 rounded-xl bg-theme-bg border border-theme-border flex items-center justify-center text-theme-text opacity-40 hover:opacity-100 hover:text-theme-accent hover:bg-white hover:border-theme-accent transition-all springy shadow-sm">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-8 pt-2">
              <h4 className="font-black text-theme-text text-[10px] uppercase tracking-widest opacity-30">Bộ Sưu Tập</h4>
              <ul className="space-y-4">
                {['Mô hình Trang trí', 'Phụ kiện Gaming', 'Quà tặng Đặc biệt', 'Cosplay & Props'].map(item => (
                  <li key={item}><a href="#" className="text-sm font-bold text-theme-text opacity-50 hover:text-theme-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-8 pt-2">
              <h4 className="font-black text-theme-text text-[10px] uppercase tracking-widest opacity-30">Về Chúng Tôi</h4>
              <ul className="space-y-4">
                {['Quy trình Daylight', 'Chính sách bảo hành', 'Hợp tác Studio', 'Tư vấn in 3D'].map(item => (
                  <li key={item}><a href="#" className="text-sm font-bold text-theme-text opacity-50 hover:text-theme-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div className="bg-theme-bg/50 p-10 rounded-[2.5rem] border border-theme-border flex flex-col items-start gap-6 shadow-sm">
              <h4 className="font-black text-theme-text text-[11px] uppercase tracking-widest">Bản Tin Daylight</h4>
              <p className="text-theme-text text-[12px] opacity-60 font-medium">Đăng ký để nhận voucher sáng tạo và thông báo các mẫu in mới nhất.</p>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full">
                <input type="email" placeholder="Email của bạn" className="flex-1 bg-white border border-theme-border rounded-xl px-5 py-3.5 text-xs font-bold focus:outline-none focus:border-theme-accent shadow-inner"/>
                <button className="py-3.5 px-6 bg-theme-accent text-white rounded-xl font-bold text-[10px] tracking-widest hover:bg-theme-accent-hover transition-all shadow-md springy uppercase">Gửi</button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-theme-border gap-6">
            <span className="text-theme-text opacity-30 text-[10px] font-bold uppercase tracking-widest">
                © 2024 SHOPIN3D STUDIO • TƯƠI MỚI MỖI NGÀY
            </span>
            <div className="flex gap-10">
              {['Bảo mật', 'Điều khoản', 'Liên hệ'].map(item => (
                <a key={item} href="#" className="text-[10px] font-bold text-theme-text opacity-30 hover:opacity-60 transition-colors uppercase tracking-widest">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-theme-text/10 backdrop-blur-sm animate-in fade-in" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-10 border-b border-theme-border flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-theme-accent-light rounded-xl text-theme-accent border border-theme-accent/20"><ShoppingBag size={24} /></div>
                <h2 className="text-3xl font-black text-theme-text tracking-tighter">Giỏ Hàng</h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3.5 bg-theme-bg text-theme-text opacity-40 hover:opacity-100 hover:text-rose-500 rounded-xl border border-theme-border springy"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {cart.length === 0 ? (
                <div className="text-center py-40 flex flex-col items-center">
                  <div className="w-24 h-24 bg-theme-bg rounded-[2rem] flex items-center justify-center text-theme-text opacity-10 mb-10 border border-theme-border"><ShoppingBag size={48} /></div>
                  <p className="text-theme-text opacity-40 font-bold text-lg mb-10">Giỏ hàng của bạn đang trống</p>
                  <button onClick={() => setIsCartOpen(false)} className="text-theme-accent font-black text-[11px] uppercase tracking-widest border-b-2 border-theme-accent/30 hover:border-theme-accent transition-all pb-2">KHÁM PHÁ NGAY</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="group bg-theme-bg/20 p-8 rounded-3xl border border-theme-border relative hover:bg-white hover:border-theme-accent/40 transition-all shadow-sm">
                    <button onClick={() => removeFromCart(item.id)} className="absolute top-6 right-6 p-2 opacity-0 group-hover:opacity-100 text-theme-text opacity-30 hover:text-rose-500 transition-all springy"><Trash2 size={20} /></button>
                    <div className="flex flex-col gap-4">
                      <h4 className="font-black text-xl text-theme-text pr-12 leading-tight">{item.name}</h4>
                      <div className="flex flex-wrap gap-2.5 text-[10px] text-theme-text opacity-60 font-bold uppercase tracking-widest">
                        <span className="bg-white px-4 py-1.5 rounded-lg border border-theme-border">{item.size}</span>
                        <span className="bg-white px-4 py-1.5 rounded-lg border border-theme-border">{item.material}</span>
                        <span className="bg-white px-4 py-1.5 rounded-lg border border-theme-border">x{item.quantity}</span>
                      </div>
                      <div className="text-2xl font-black text-theme-text mt-2">{item.price.toLocaleString()}đ</div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-10 border-t border-theme-border bg-theme-bg/30">
              <div className="space-y-5 mb-10">
                <div className="flex justify-between text-[13px] font-bold text-theme-text opacity-40 uppercase tracking-widest"><span>Tạm Tính</span><span className="text-theme-text opacity-80">{subtotal.toLocaleString()}đ</span></div>
                {discount > 0 && <div className="flex justify-between text-[13px] font-bold text-theme-accent uppercase tracking-widest"><span>Voucher Daylight ({discount}%)</span><span>-{ (subtotal * discount / 100).toLocaleString() }đ</span></div>}
                <div className="flex justify-between text-4xl font-black pt-10 border-t border-theme-accent/20 text-theme-text tracking-tighter"><span>TỔNG CỘNG</span><span>{total.toLocaleString()}đ</span></div>
              </div>
              <button onClick={handleOrder} className="w-full py-6 bg-theme-accent text-white font-black rounded-2xl hover:bg-theme-accent-hover transition-all shadow-lg shadow-theme-accent/20 text-[13px] tracking-widest springy uppercase">Đặt hàng qua Zalo</button>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Drawer */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-theme-text/10 backdrop-blur-sm animate-in fade-in" onClick={() => setIsWishlistOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-400">
            <div className="p-10 border-b border-theme-border flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="p-3.5 bg-rose-50 rounded-xl text-rose-500 border border-rose-100"><Heart size={24} fill="currentColor" /></div>
                <h2 className="text-3xl font-black text-theme-text tracking-tighter">Yêu Thích</h2>
              </div>
              <button onClick={() => setIsWishlistOpen(false)} className="p-3.5 bg-theme-bg text-theme-text opacity-40 hover:opacity-100 hover:text-rose-500 rounded-xl border border-theme-border springy"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {wishlist.length === 0 ? (
                <div className="text-center py-40">
                  <div className="w-24 h-24 bg-theme-bg rounded-[2rem] flex items-center justify-center text-theme-text opacity-10 mx-auto mb-10 border border-theme-border"><Heart size={48} /></div>
                  <p className="text-theme-text opacity-40 font-bold text-lg">Bạn chưa yêu thích mẫu nào</p>
                </div>
              ) : (
                wishlist.map(product => (
                  <div key={product.id} className="group bg-theme-bg/20 p-8 rounded-3xl border border-theme-border flex gap-8 hover:bg-white hover:border-theme-accent/40 transition-all shadow-sm">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 bg-white border border-theme-border shadow-inner"><img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" /></div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-black text-xl text-theme-text leading-tight mb-2 pr-6">{product.name}</h4>
                        <p className="text-theme-accent font-bold text-sm tracking-tight">Giá từ {product.basePrice.toLocaleString()}đ</p>
                      </div>
                      <div className="flex items-center gap-8 mt-6">
                        <button onClick={() => { setIsWishlistOpen(false); document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="text-[10px] uppercase font-black tracking-widest text-theme-accent border-b-2 border-theme-accent/20 hover:border-theme-accent transition-all pb-1 flex items-center gap-2">CẤU HÌNH <ChevronRight size={14} /></button>
                        <button onClick={() => toggleWishlist(product)} className="text-[10px] uppercase font-black tracking-widest text-theme-text opacity-30 hover:text-rose-500 transition-colors springy">XÓA</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-10 border-t border-theme-border bg-theme-bg/20">
              <button onClick={() => setIsWishlistOpen(false)} className="w-full py-5 bg-white border border-theme-border text-theme-text rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-sm hover:bg-theme-bg transition-all springy">TIẾP TỤC XEM MẪU</button>
            </div>
          </div>
        </div>
      )}

      {/* Reward Button */}
      {!hasSpun && !showLucky && (
        <button onClick={() => setShowLucky(true)} className="fixed bottom-10 left-10 z-40 w-16 h-16 bg-white rounded-[1.75rem] flex items-center justify-center text-theme-accent shadow-2xl border border-theme-border hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden">
          <div className="absolute inset-0 bg-theme-accent-light transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <Gift size={28} strokeWidth={1.5} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-theme-accent rounded-full border-4 border-white animate-pulse" />
        </button>
      )}

      {showLucky && (
        <LuckySpin 
          onWin={(val) => { setDiscount(val); setHasSpun(true); }} 
          onClose={() => setShowLucky(false)} 
        />
      )}
    </div>
  );
};

export default App;
