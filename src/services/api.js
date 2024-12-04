import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const regulationApi = {
  getAll: () => api.get('/regulations'),
  getById: (id) => api.get(`/regulations/${id}`),
  create: (data) => api.post('/regulations', data),
  update: (id, data) => api.put(`/regulations/${id}`, data),
  delete: (id) => api.delete(`/regulations/${id}`)
};

export const complianceApi = {
  getStatus: () => api.get('/compliance/status'),
  updateStatus: (id, status) => api.put(`/compliance/${id}/status`, { status }),
  getChecklist: (regulationId) => api.get(`/compliance/${regulationId}/checklist`),
  submitChecklist: (regulationId, data) => api.post(`/compliance/${regulationId}/checklist`, data)
};

export const documentApi = {
  getAll: () => api.get('/documents'),
  upload: (file, metadata) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('metadata', JSON.stringify(metadata));
    return api.post('/documents/upload', formData);
  },
  getVersion: (id, version) => api.get(`/documents/${id}/versions/${version}`)
};

export const reportApi = {
  generate: (params) => api.post('/reports/generate', params),
  getAll: () => api.get('/reports'),
  download: (id) => api.get(`/reports/${id}/download`, { responseType: 'blob' })
};

export default api;