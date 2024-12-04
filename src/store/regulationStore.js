import create from 'zustand';

const useRegulationStore = create((set) => ({
  regulations: [],
  selectedRegulation: null,
  filters: {
    category: null,
    status: null,
    searchQuery: ''
  },
  setRegulations: (regulations) => set({ regulations }),
  setSelectedRegulation: (regulation) => set({ selectedRegulation: regulation }),
  updateFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  addRegulation: (regulation) => set((state) => ({
    regulations: [...state.regulations, regulation]
  })),
  updateRegulation: (updatedRegulation) => set((state) => ({
    regulations: state.regulations.map(reg => 
      reg.id === updatedRegulation.id ? updatedRegulation : reg
    )
  }))
}));

export default useRegulationStore;