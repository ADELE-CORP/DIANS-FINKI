
import firstMainPhoto from '../images/firstMainPhoto.jpg'
import secondMainPhoto from '../images/secondMainPhoto.png'
import logo from '../images/logo.png'
import firstStar from '../images/firstStar.png'



import { useTranslation } from 'react-i18next';

function MainContent() {
    const { t } = useTranslation();

    return (
        <div id="mainContent" style={{ height: '1900px' }}>
            <div id="contentLeft">
                <img src={firstMainPhoto } alt={t('firstMainPhotoAlt')} width="600" />
                <img src={secondMainPhoto} alt={t('secondMainPhotoAlt')} width="730" id="secondMainPhoto" />
            </div>

            <div id="contentRight">
                <div id="columnFirst">
                    <img src={firstStar} alt={t('starAlt')} className="star" />
                    <img src={logo} alt={t('logoAlt')} id="logo" />
                    <p id="aboutUs"></p>
                </div>

                <div className="otherColumns">
                    <img src={firstStar} alt={t('starAlt')} className="star" />
                    <h1 className="textHeader">{t('aboutUsTitle')}</h1>
                    <h3 id="aboutUsPara">{t('aboutUsPara')}</h3>
                </div>

                <div className="otherColumns">
                    <img src={firstStar} alt={t('starAlt')} className="star" />
                    <h1 className="textHeader">{t('contactUsTitle')}</h1>
                    <h3 id="contactUsPara">{t('contactUsPara')}</h3>
                    <div id="mailSent">
                        <form action="mailto:leonsaraqini@gmail.com" method="GET" encType="text/plain">
                            <input className="inputContactUs" type="text" placeholder={t('emailPlaceholder')} disabled />
                            <input className="inputContactUs" type="text" placeholder={t('subjectPlaceholder')} name="subject" required />
                            <textarea className="inputContactUs" cols={59} rows={7} placeholder={t('messagePlaceholder')} name="body" required></textarea>
                            <div id="sumbitMail">
                                <button id="submit">{t('submitButton')}</button>
                            </div>
                        </form>
                    </div>
                </div>
                <img src={firstStar} alt={t('starAlt')} className="star" />
            </div>
        </div>
    );
}

export default MainContent;
