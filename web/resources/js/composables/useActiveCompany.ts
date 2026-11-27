import { ref } from 'vue';

const STORAGE_KEY = 'controlemei.activeCompanyName';
const companyName = ref(typeof window !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) ?? '') : '');

/** Empresa ativa compartilhada entre Header e páginas (reativa na mesma aba). */
export function useActiveCompany() {
    function setActiveCompany(name: string) {
        companyName.value = name;
        localStorage.setItem(STORAGE_KEY, name);
    }

    return { companyName, setActiveCompany };
}
