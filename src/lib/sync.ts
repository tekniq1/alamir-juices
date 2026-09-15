import { useEffect } from 'react';
import { supabase } from './supabase';
import { useApp } from '@/store/app';
import type { Product, CategoryData } from '@/store/app';

export function useSupabaseSync() {
  useEffect(() => {
    async function syncData() {
      try {
        // 1. جلب التصنيفات
        const { data: categories, error: catError } = await supabase.from('categories').select('*');
        if (catError) throw catError;
        if (categories && categories.length > 0) {
          useApp.setState({
            categories: categories.map(c => ({
              id: c.id,
              nameAr: c.name_ar,
              nameEn: c.name_en,
              emoji: c.emoji || '🍹',
            })) as CategoryData[]
          });
        }

        // 2. جلب المنتجات
        const { data: products, error: prodError } = await supabase.from('products').select('*');
        if (prodError) throw prodError;
        if (products && products.length > 0) {
          useApp.setState({
            products: products.map(p => ({
              id: p.id,
              categoryId: p.category_id,
              name: { ar: p.name_ar, en: p.name_en },
              description: { ar: p.description_ar, en: p.description_en },
              basePrice: Number(p.base_price),
              kgPrice: p.kg_price ? Number(p.kg_price) : undefined,
              sizePrice: p.size_price || undefined,
              calories: p.calories,
              carbs: p.carbs,
              image: p.image || '',
              color: p.color || 'mango',
              rating: p.rating,
              inStock: p.in_stock,
              tags: p.tags || []
            })) as Product[]
          });
        }

        // 3. جلب العروض (Offers)
        const { data: offers } = await supabase.from('offers').select('*');
        if (offers && offers.length > 0) {
          useApp.setState({
            offers: offers.map(o => ({
              id: o.id,
              title: o.title,
              discount: o.discount,
              status: o.status,
              emoji: o.emoji || '🔥'
            }))
          });
        }

        // 4. جلب الإعدادات (Settings)
        const { data: settings } = await supabase.from('site_settings').select('*').limit(1).single();
        if (settings) {
          useApp.setState({
            siteSettings: {
              whatsapp: settings.whatsapp || '',
              phone: settings.phone || '',
              mapsLink: settings.maps_link || '',
              workingHoursAr: settings.working_hours_ar || '',
              workingHoursEn: settings.working_hours_en || ''
            }
          });
        }

        // 5. جلب النصوص (Content)
        const { data: content } = await supabase.from('site_content').select('*').limit(1).single();
        if (content) {
          useApp.setState({
            siteContent: {
              heroTitleAr: content.hero_title_ar || '',
              heroTitleEn: content.hero_title_en || '',
              heroDescAr: content.hero_desc_ar || '',
              heroDescEn: content.hero_desc_en || '',
              aboutTitleAr: content.about_title_ar || '',
              aboutTitleEn: content.about_title_en || '',
              aboutStoryAr: content.about_story_ar || '',
              aboutStoryEn: content.about_story_en || ''
            }
          });
        }

        console.log("تمت مزامنة جميع البيانات من Supabase بنجاح!");
      } catch (err) {
        console.warn("⚠️ لم يتم جلب بعض البيانات من Supabase.", err);
      }
    }

    syncData();
  }, []);
}
