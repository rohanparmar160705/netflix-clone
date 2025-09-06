import React from "react";
import { XLg } from 'react-bootstrap-icons';
import "./YTFrameContainer.css";

function YTFrameContainer({handleShowYTModal, movieOrTvForBanner}) {
  return (
    <div className="yt__iframe__container" tabIndex="-1" role="dialog" aria-label="youtube iframe container just got opened" onClick={() => handleShowYTModal(false)}>
      <div className="yt__iframe__div">
        <div className="yt__iframe__div__inner">
          <div className="yt__iframe__wrap">
            <button className="yt__iframe__close__button" onClick={() => handleShowYTModal(false)}>
            <XLg color="white" size={22}/>
              </button>
          <iframe
            width="460"
            height="230"
            title="youtube iframe"
            src= {movieOrTvForBanner.ytTrailerIframe}
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            tabIndex="-1"
          ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YTFrameContainer;
