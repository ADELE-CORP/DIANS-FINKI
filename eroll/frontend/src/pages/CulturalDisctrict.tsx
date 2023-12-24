

import leftEndPhoto from '../images/leftEndPhoto.jpg';
import rightEndPhoto from '../images/rightEndPhoto.jpg';
import firstStar from '../images/firstStar.png';
import fullMap from '../images/fullMap.jpg';
import { useNavigate } from 'react-router-dom';







function CulturalDistricts() {

    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/mapgen');
    };


    return (
        <div id="culturalDisctricModule">
            <p id="culturalDisctrics" style={{ marginTop: '130px' }}></p>
            <h1 className="textHeader">CULTURAL DISTRICTS</h1>
            <div id="mapSection" style={{ overflowX: 'clip' }}>
                <img src={leftEndPhoto} id="leftEndPhoto" alt="Left End" />
                <img src={rightEndPhoto} id="rightEndPhoto" alt="Right End" />

                <div id="map">
                    {/*<img src={firstStar} alt="star" className="star" id="culturalDisctricsStarTop" />*/}
                    {/*<img src={fullMap} id="fullMap" alt="Full Map" />*/}

                    <div id="fullMapPage">
                        <button id="submit" onClick={handleExploreClick}>EXPLORE</button>
                    </div>
                </div>

                {/*<img src={firstStar} alt="star" className="star" id="culturalDisctricsStarbottom" />*/}
            </div>
        </div>
    );
}

export default CulturalDistricts;
