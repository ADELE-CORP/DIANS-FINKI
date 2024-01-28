import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div id="aboutUsModule" className="flex-grow flex items-center justify-center ml-40 p-10">
                <div className="max-w-2xl text-center">
                    <h1 className="text-3xl font-bold mb-4">{t('aboutUsTitle')}</h1>
                    <p className="text-gray-600 mb-8">
                        {t('aboutUsPara')}
                        {t('aboutUsPara2')}
                        {/*We are a group of passionate individuals from the Faculty of Computer Science and Engineering,*/}
                        {/*dedicated to creating a project that caters to both tourists and locals interested in exploring*/}
                        {/*the rich historical heritage of Macedonia.*/}
                    </p>
                    <h2 className="text-xl font-bold mb-2">{t('aboutUsAuthorsTitle')}</h2>
                    <ul className="list-disc ml-8 mb-6 space-y-2 flex flex-col">
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Ardit Sakipi
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Drin Kadriu
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Engjell Vlashi
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Leon Saraqini
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Eroll Sakipi
                        </li>
                    </ul>
                    <h2 className="text-xl font-bold mb-2">{t('aboutUsMentorsTitle')}</h2>
                    <ul className="list-disc ml-8 space-y-2 flex flex-col">
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                            проф. д-р Љупчо Антовски
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                            проф. д-р Петре Ламески
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AboutUs;
