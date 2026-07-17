export const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '' : 'https://tours-backend-usxd.onrender.com');

export const getImageUrl = (path: string | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('uploads/') || path.startsWith('uploads\\')) return `${API_URL}/${path.replace('\\', '/')}`;
  if (path.startsWith('/uploads/')) return `${API_URL}${path}`;
  return path;
};