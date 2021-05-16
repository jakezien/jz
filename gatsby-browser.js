// import "./static/fonts/fonts.css"
import React from 'react';
import Helmet from 'react-helmet'
import TCensorWrapper from './src/components/tCensor'

export const wrapPageElement = ({element, props}) => (
  <>
    <Helmet>
      <script data-host="https://protegant.io" data-dnt="false" src="https://protegant.io/js/script.js" id="ZwSg9rf6GA" async defer></script>
      <script async data-goatcounter="https://jakezien.goatcounter.com/count" src="//gc.zgo.at/count.js"></script>
      <script async src="https://app.jitt.io/pixel/I5EkPtLtiykovzTw"></script>
      <script src="https://privera.io/aap.js" pe-ua="UA-58831210-1" async></script>
    </Helmet>
    <TCensorWrapper {...props}>{element}</TCensorWrapper>
  </>
)
