// src/stores/appStore.ts
import { create } from 'zustand';
import { getErrorMessage } from '../utils/helper';
import { AppStore } from '../utils/types';

export const useAppStore = create<AppStore>((set) => ({
  notifications: [],
  isLoading: false,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Date.now().toString(),
          duration: notification.duration ?? 6000,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  setLoading: (value) => set({ isLoading: value }),
}));

export const useNotify = () => {
  const { addNotification } = useAppStore();
  return {
    success: (message: string, duration?: number) =>
      addNotification({ message, type: 'success', duration }),
    error: (message: unknown, duration?: number) =>
      addNotification({ message: getErrorMessage(message), type: 'error', duration }),
    info: (message: string, duration?: number) =>
      addNotification({ message, type: 'info', duration }),
    warning: (message: string, duration?: number) =>
      addNotification({ message, type: 'warning', duration }),
  };
};