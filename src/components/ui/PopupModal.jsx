import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import { useModal } from '../../contexts/ModalContext';
import { useEffect, useRef } from 'react';

export default function PopupModal() {
    const { isModalOpen, modalHeight, modalTitle, modalBody, closeModal } = useModal();
    const popupRef = useRef(null);

    useEffect(() => {
        // console.log('uuuuuuuu', modalTitle)
        // console.log('iiiiiiiiiiiiiiii', popupRef.current._element.querySelector('.dx-toolbar-before'))

        setTimeout(() => {
            if (isModalOpen && modalTitle && popupRef.current?._instance?._$title) {
                // console.log('iiiiiiiiiiiiiiii', popupRef.current._instance._$title)
                // popupRef.current.instance.option('title', modalTitle);

                popupRef.current._instance._$title[0].children[0].children[0].innerHTML =
                    `<div class="dx-item dx-toolbar-item dx-toolbar-label" style="max-width: 705px;">
                        <div class="dx-item-content dx-toolbar-item-content">
                            <div>${modalTitle}</div>
                        </div>
                    </div>`;
            }
        }, 50)
    }, [isModalOpen, modalTitle])

    return (
        <div id="popupContainer" className="h-full w-full absolute">
            <Popup
                ref={popupRef}
                visible={isModalOpen}
                onHiding={closeModal}
                dragEnabled={true}
                hideOnOutsideClick={false}
                showCloseButton={true}
                showTitle={true}
                // title={modalTitle}
                container="#popupContainer"
                maxHeight={modalHeight}
                width={800}
                height="calc(100% - 32px)"
                shadingColor="#000000aa"
                dragAndResizeArea={false}
                resizeEnabled={false}
                dragOutsideBoundary={true}
            >
                <ToolbarItem toolbar="bottom" location="center" />
                <Position at="center" my="center" collision="fit" />

                {modalBody}
            </Popup>
        </div>
    )
}