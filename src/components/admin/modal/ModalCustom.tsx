"use client";

import { Modal, ModalContent } from "@nextui-org/react";

export default function ModalCustom({
  isOpen,
  children,
  onClose,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="3xl" scrollBehavior="inside">
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
}
