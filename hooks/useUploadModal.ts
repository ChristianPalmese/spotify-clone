import { create } from "zustand";
//Una memoria globale per sapere se il modal è aperto o chiuso
interface UploadModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: true,

  onOpen: () => set({ isOpen: true }),

  onClose: () => set({ isOpen: false }),
}));

export default useUploadModal;