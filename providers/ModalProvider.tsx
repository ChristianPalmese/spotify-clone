"use client";

import Modal from "@/app/components/Modal";

const ModalProvider = () => {
  return <Modal title="Test Modal"
  description="Test Desctiption"
  isOpen
  onChange={() => {}}
  >
  Test Children
  </Modal>

};

export default ModalProvider;