import { IconType } from "react-icons";

export interface StoreObject {
    allNFT: [];
    collectionNFT: [];
    usersInfo: {};
    auth: {
        isAuth: boolean;
        name: string;
        email: string;
    };
    lang: string;
    pageIndex: number;
    signFlag: boolean;
}

export interface SidebarListObject {
    title: string;
    to: string;
    icon: IconType;
}

export interface AuthObject {
    name?: string;
    email: string;
    password: string;
    repassword?: string;
}
