import React, { useEffect, useContext } from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"
import styled from "styled-components"
import { ThemeProvider, ThemeContext, withTheme } from "styled-components"
import { useStyledDarkMode, ThemeSetting } from "gatsby-styled-components-dark-mode"
import ScrollableCarouselProvider from "../components/ScrollableCarouselProvider"
import { Slider, Slide, DotGroup } from 'pure-react-carousel';
import VisibilitySensor from 'react-visibility-sensor';

import 'pure-react-carousel/dist/react-carousel.es.css';
import 'react-image-lightbox/style.css';
import GlobalStyle from '../styles/globalStyle'


import { MDXProvider } from "@mdx-js/react"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import WidthBleeder from "../components/widthBleeder";
import FlexContainer from "../components/flexContainer";
import Section from "../components/section";
import Inset from "../components/inset";
import TagList from "../components/tagList";
import JzImage from "../components/JzImage";
import { imageByName, testFunc } from "../utils/functions";

import Header from '../components/header'
import Footer from '../components/footer'
import Analytics from '../components/analytics'

const Layout = withTheme((props) => {

  const { location, title, children, theme } = props
  const { changeThemeSetting, themeSetting } = useStyledDarkMode();

  const shortcodes = { VisibilitySensor, JzImage, TagList, Section, Link, Inset, GatsbyImage, StaticImage, imageByName, getImage, FlexContainer, WidthBleeder, ScrollableCarouselProvider, Slider, Slide, DotGroup  }

  function setThemeToSystemTheme(e) {
    // let newTheme = e ? ThemeSetting.DARK : ThemeSetting.LIGHT;
    changeThemeSetting(ThemeSetting.SYSTEM);
    // console.log('setting theme to ', newTheme)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', setThemeToSystemTheme);
    
    // Specify how to clean up after this effect:
    return function cleanup() {
      mediaQuery.removeEventListener('change', setThemeToSystemTheme)
    };
  });

  return (
    <div>
      <Analytics/>
      <MDXProvider components={shortcodes}>
        <GlobalStyle theme={props.theme} />
        <Header location={location}/>
        <main>
          {children}
        </main>
        <Footer/>
      </MDXProvider>
    </div>
  )
})

export default Layout