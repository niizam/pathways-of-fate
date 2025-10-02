import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage');
  if (token) {
    const authData = JSON.parse(token);
    if (authData.state?.token) {
      config.headers.Authorization = `Bearer ${authData.state.token}`;
    }
  }
  return config;
});

export default api;

// API methods
export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const characters = {
  getAll: () => api.get('/characters'),
  getOne: (id) => api.get(`/characters/${id}`),
  levelUp: (id, targetLevel) => api.put(`/characters/${id}/level`, { targetLevel }),
  ascend: (id) => api.put(`/characters/${id}/ascend`),
};

export const gacha = {
  pull: (bannerId, count) => api.post('/gacha/pull', { banner_id: bannerId, count }),
  getHistory: () => api.get('/gacha/history'),
};

export const battle = {
  start: (stageId, team) => api.post('/battle/start', { stage_id: stageId, team }),
  action: (battleId, action) => api.post('/battle/action', { battle_id: battleId, action }),
  getResult: (battleId) => api.get(`/battle/result/${battleId}`),
};

export const inventory = {
  getAll: () => api.get('/inventory'),
  use: (itemId, targetId) => api.post('/inventory/use', { item_id: itemId, target_id: targetId }),
};

export const profile = {
  get: () => api.get('/profile'),
  getStats: () => api.get('/profile/stats'),
};
