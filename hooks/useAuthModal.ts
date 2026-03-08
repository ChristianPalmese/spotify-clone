import { create } from "zustand";
//Una memoria globale per sapere se il modal è aperto o chiuso
interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: true,

  onOpen: () => set({ isOpen: true }),

  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;