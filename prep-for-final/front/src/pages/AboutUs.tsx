import { useTranslation } from 'react-i18next';
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div id="aboutUsModule" className="flex-grow flex items-center justify-center ml-40">
                <p id="aboutUsPara">{t('aboutUsPara')} bla bla</p>
            </div>
            <div>

                <Footer />
            </div>
        </div>
    );
};

export default AboutUs;
