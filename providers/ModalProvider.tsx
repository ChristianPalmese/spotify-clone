"use client";

import AuthModal from "../app/components/AuthModal";
import UploadModal from "../app/components/UploadModal";

const ModalProvider = () => {
  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default ModalProvider;