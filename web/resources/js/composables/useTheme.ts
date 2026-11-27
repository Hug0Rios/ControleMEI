import { ref } from 'vue';
import { updateTheme } from './useAppearance';

const isDark = ref<boolean | null>(null);

export function useTheme() {
    if (isDark.value === null) {
        isDark.value = document.documentElement.classList.contains('dark');
    }

    function setDark(value: boolean) {
        isDark.value = value;
        localStorage.setItem('appearance', value ? 'dark' : 'light');
        updateTheme(value ? 'dark' : 'light');
    }

    return { isDark, setDark };
}
