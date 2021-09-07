import { css } from "styled-components"
import { rhythm, scale } from "../utils/typography"

const storyCount = 9
const favesCount = 7

export const SpecificCarouselStyles = css`

[class*=carousel-tray-] {
  transition: transform .5s, width 1s;
  transition-timing-function: cubic-bezier(.645,.045,.355,1);
}


.carousel-tray-favorites, .carousel-slider-story {
  overflow: visible;

  li {
    margin: 0 .5em;
    [class*=card] {
      height: auto;
    }
  }
}

.carousel-slider-story {
  li {
    [class*=card] {
      padding-bottom: 1em;
    }
  }
}

@media screen and (min-width: 480px) and (max-width: 639px) {
  .carousel-tray-story{
    width: calc(${storyCount} * 100% / 1.5) !important
  }
  .carousel-tray-favorites {  
    width: calc(${favesCount} * 100% / 1.5) !important
  }
}

@media screen and (min-width: 640px) and (max-width: 1023px) {
  .carousel-tray-story{
    width: calc(${storyCount} * 100% / 2) !important
  }
  .carousel-tray-favorites {  
    width: calc(${favesCount} * 100% / 2) !important
  }
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  .carousel-tray-story{
    width: calc(${storyCount} * 100% / 2.25) !important
  }
  .carousel-tray-favorites {
    width: calc(${favesCount} * 100% / 3) !important
  }
}

@media screen and (min-width: 1280px) and (max-width: 1599px) {
  .carousel-tray-story{
    width: calc(${storyCount} * 100% / 3) !important
  }
  .carousel-tray-favorites {
    width: calc(${favesCount} * 100% / 4) !important
  }
}

@media screen and (min-width: 1600px) and (max-width: 1919px) {
  .carousel-tray-story{
    width: calc(${storyCount} * 100% / 4) !important
  }
  .carousel-tray-favorites {
    width: calc(${favesCount} * 100% / 5.5) !important
  }
}

@media screen and (min-width: 1920px) {
  .carousel-tray-story{
    width: 200% !important
  }
  .carousel-tray-favorites {
    width: calc(${favesCount} * 100% / 7) !important
  }
}





@media screen and (max-width: 639px) {
  .carousel-tray-do {
    width: 300% !important
  }
}


@media screen and (min-width: 640px) and (max-width: 1079px) {
  .carousel-tray-do {
    width: 150% !important;
  }
}

@media screen and (min-width: 1080px) {
  .carousel.do {
    max-width 1080px !important;
    margin: 0 auto;
    user-select: none;
    .carousel-tray-do {
      width: 100% !important;
    }
    .carousel__dot-group {
      display: none;
    }
    .carousel__back-button, .carousel__next-button {
      display: none;
    }
  }
}
`