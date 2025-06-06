import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MotionGraphic = () => {
  const containerRef = useRef(null);
  const products = [
    { id: 1, name: 'محصول ۱', color: 'bg-purple-300' },
    { id: 2, name: 'محصول ۲', color: 'bg-purple-400' },
    { id: 3, name: 'محصول ۳', color: 'bg-purple-500' },
    { id: 4, name: 'محصول ۴', color: 'bg-purple-600' },
    { id: 5, name: 'محصول ۵', color: 'bg-purple-700' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ایجاد انیمیشن برای هر محصول
    products.forEach((product, index) => {
      const element = container.querySelector(`#product-${product.id}`);
      if (!element) return;

      // زمان شروع تصادفی برای تنوع بیشتر
      const startTime = index * 0.3 + Math.random() * 0.5;

      // انیمیشن بالا و پایین رفتن
      gsap.to(element, {
        y: -40,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: startTime,
      });

      // انیمیشن تغییر اندازه
      gsap.to(element, {
        scale: 1.05,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: startTime + 0.2,
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-16">نمایش محصولات</h1>
      
      <div 
        ref={containerRef}
        className="flex flex-wrap justify-center gap-8 max-w-4xl"
      >
        {products.map((product) => (
          <div
            key={product.id}
            id={`product-${product.id}`}
            className={`${product.color} w-48 h-48 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl transform transition-all`}
          >
            {product.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotionGraphic;
