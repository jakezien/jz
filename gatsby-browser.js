// import "./static/fonts/fonts.css"
import React from 'react';
import Helmet from 'react-helmet'
import AppendHead from "react-append-head"
import TCensorWrapper from './src/components/tCensor'

export const wrapPageElement = ({element, props}) => (
  <>
    <Helmet>
      <script async defer data-domain="jakezien.github.io/jz" src="https://plausible.io/js/plausible.js"></script>
    </Helmet>
    <TCensorWrapper {...props}>{element}</TCensorWrapper>
  </>
)
