import { useTranslation } from 'react-i18next';
import ukFlag from '../images/uk.png';
import mkFlag from '../images/mk.png';

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
        <footer className="md:h-20 md:text-4xl sm:h-16 sm:text-lg w-screen flex flex-grow justify-center items-center">
            &copy;2023, ADELE-CORP, ALL RIGHTS RESERVED
            <div className="inline-block ml-5 flex items-center">
                {/* Display flags directly on larger screens */}
                <div className="hidden md:flex">
                    <button onClick={() => changeLanguage('en')}>
                        <img src={ukFlag} alt="UK Flag" className="flag-icon mr-2 h-5 w-10" />
                    </button>
                    <button onClick={() => changeLanguage('mk')}>
                        <img src={mkFlag} alt="Macedonian Flag" className="flag-icon mr-2 h-5 w-10 ml-5" />
                    </button>
                </div>

                {/* Dropdown for smaller screens */}
                <div className="md:hidden relative ml-5">
                    <button
                        className="flex items-center"
                        onClick={() => {
                            // Toggle dropdown visibility
                            const dropdown = document.getElementById('languageDropdown');
                            if (dropdown) {
                                dropdown.classList.toggle('hidden');
                            }
                        }}
                    >
                        <span className="mr-2 text-sm">Lang</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 0 1 1 1v10a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zM5 9a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM17 9a1 1 0 0 1-1 1h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1z"
                            />
                        </svg>
                    </button>
                    <div
                        id="languageDropdown"
                        className="hidden absolute top-8 right-0 bg-white shadow mt-2 py-2 px-4 rounded"
                    >
                        <button onClick={() => changeLanguage('en')}>
                            <img src={ukFlag} alt="UK Flag" className="flag-icon mr-2 h-5 w-10" />

                        </button>
                        <button onClick={() => changeLanguage('mk')}>
                            <img src={mkFlag} alt="Macedonian Flag" className="flag-icon mr-2 h-5 w-10" />

                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
