
import { useTranslation } from 'react-i18next';

function Footer() {
    const { i18n } = useTranslation();

    const changeLanguage = async (language: string) => {
        try {
            await i18n.changeLanguage(language);
            localStorage.setItem('language', language);
            // Do any additional logic after language change if needed
        } catch (error) {
            console.error('Error changing language:', error);
        }
    };

    return (
        <footer>
            &copy;2023, ADELE-CORP, ALL RIGHTS RESERVED |
            <button onClick={() => changeLanguage('en')}>EN</button> |
            <button onClick={() => changeLanguage('mk')}>MK</button>
        </footer>
    );
}

export default Footer;
