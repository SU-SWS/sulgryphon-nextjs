import {Dialog} from '@headlessui/react'
import {useState} from "react";

interface ModalProps {
  title?: string
  description?: string
  isOpen: boolean
  onClose(): void
}

export const Modal = ({title, description, isOpen, onClose, ...props}: ModalProps) => {

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="su-fixed su-inset-0 su-bg-black/30" aria-hidden="true"/>

      <div className="su-fixed su-inset-[20px] su-flex su-items-center su-justify-center su-p-[50px]">
        <Dialog.Panel>
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {description && <Dialog.Description>{description}</Dialog.Description>}
          <div>
            {props.children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}