import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeight, setModalHeight] = useState('100%');
    const [modalTitle, setModalTitle] = useState(null);
    const [modalBody, setModalBody] = useState(null);
    const [tableRef, setTableRef] = useState(null);
    const [listTableRef, setListTableRef] = useState(null);


    const showModal = (title, content) => {
        setModalTitle(title);
        setModalBody(content);
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const setDynamicModalTitle = (title) => setModalTitle(title);

    const setDynamicModalHeight = (height) => setModalHeight(height);

    return (
        <ModalContext.Provider value={{ modalHeight, modalTitle, modalBody, isModalOpen, showModal, closeModal, tableRef, setTableRef, listTableRef, setListTableRef, setDynamicModalTitle, setDynamicModalHeight }}>
            {children}
        </ModalContext.Provider>
    )
}