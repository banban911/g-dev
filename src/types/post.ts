import {Dispatch, SetStateAction} from "react";

export interface ModalFormPropTypes {
    isModalOpen: boolean,
    handleFail?: () => void,
    setOpenModal: Dispatch<SetStateAction<any>>
}

export interface PostInputTypes {
    title: string,
    body: string,
    tags: [string]
}