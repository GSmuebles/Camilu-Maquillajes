import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL = 'https://egzbgwhcglryqkipzpkg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_KDSRvUrXhReQNQGCfxPWGA_jRL11REa';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export function getPublicImageUrl(bucket, path) {
  if (!path) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export function resolveProductImage(item) {
  if (!item) return 'https://placehold.co/600x600/fdf2f4/8a2846?text=Camilu+Maquillajes';
  if (item.image_thumb_path) return getPublicImageUrl('product-images', item.image_thumb_path);
  if (item.image_path) return getPublicImageUrl('product-images', item.image_path);
  if (item.storage_path) return getPublicImageUrl('product-images', item.storage_path);
  if (item.thumb_path) return getPublicImageUrl('product-images', item.thumb_path);
  if (item.image_external_url) return item.image_external_url;
  if (item.external_url) return item.external_url;
  return 'https://placehold.co/600x600/fdf2f4/8a2846?text=Camilu+Maquillajes';
}

export function resolveSiteImage(item, mobile = false) {
  if (!item) return null;
  if (mobile && item.image_mobile_path) return getPublicImageUrl('site-images', item.image_mobile_path);
  if (item.image_path) return getPublicImageUrl('site-images', item.image_path);
  if (item.logo_path) return getPublicImageUrl('site-images', item.logo_path);
  if (item.image_external_url) return item.image_external_url;
  return null;
}

export function formatARS(amount) {
  const num = Number(amount || 0);
  return '$' + num.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
