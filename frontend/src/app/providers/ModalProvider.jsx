import { createContext, useContext, useMemo, useState } from "react";
import { Modal } from "@/shared/components/ui/Modal";

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const value = useMemo(
    () => ({
      openModal: setModal,
      closeModal: () => setModal(null),
    }),
    []
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      <Modal isOpen={Boolean(modal)} onClose={() => setModal(null)} title={modal?.title}>
        {modal?.content}
      </Modal>
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used inside ModalProvider");
  return context;
}

