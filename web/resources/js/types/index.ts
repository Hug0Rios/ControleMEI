import type { LucideIcon } from 'lucide-vue-next';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon;
    isActive?: boolean;
}

export interface SharedData {
    [key: string]: unknown;
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash?: { success?: string | null };
    errors: Record<string, string>;
    ziggy: {
        location: string;
        url: string;
        port: null | number;
        defaults: Record<string, unknown>;
        routes: Record<string, string>;
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export type BreadcrumbItemType = BreadcrumbItem;

export interface Company {
    id: number;
    user_id: number;
    cnpj: string;
    legal_name: string;
    trade_name: string | null;
    registration_status: string;
    main_cnae: string;
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    opened_at: string;
    created_at: string;
    updated_at: string;
}
