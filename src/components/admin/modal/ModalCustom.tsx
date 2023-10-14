"use client";

import { Modal, ModalContent } from "@nextui-org/react";

export default function ModalCustom({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
