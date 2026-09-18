import { IconType } from "react-icons";
import {
    FaWhatsapp,
    FaYoutube,
    FaInstagram,
    FaTiktok,
    FaFacebookF,
    FaXTwitter,
} from "react-icons/fa6";

import contactStyles from "@/app/contacto/page.module.css";


export interface SocialNetwork {
    name: string;
    href: string;
    icon: IconType;
    color: string;
}


export const socialNetworks: SocialNetwork[] = [
    {
        name: "WhatsApp",
        href: "https://www.whatsapp.com/",
        icon: FaWhatsapp,
        color: contactStyles.whatsapp,
    },
    {
        name: "YouTube",
        href: "https://www.youtube.com/",
        icon: FaYoutube,
        color: contactStyles.youtube,
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/",
        icon: FaInstagram,
        color: contactStyles.instagram,
    },
    {
        name: "TikTok",
        href: "https://www.tiktok.com/",
        icon: FaTiktok,
        color: contactStyles.tiktok,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/",
        icon: FaFacebookF,
        color: contactStyles.facebook,
    },
    {
        name: "X",
        href: "https://x.com/",
        icon: FaXTwitter,
        color: contactStyles.twitter,
    },
];