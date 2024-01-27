
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <div id="aboutUsModule">
            <p id="aboutUsPara">{t('aboutUsPara')}</p>
        </div>
    );
};

export default AboutUs;
