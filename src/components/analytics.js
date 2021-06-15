import React from "react"
import Helmet from 'react-helmet'

const Analytics = () => {
  return (
    <Helmet>
      <script async data-goatcounter="https://jakezien.goatcounter.com/count" src="//gc.zgo.at/count.js"></script>
      <script async src={`/aap.js`}></script>
    </Helmet>
  )
}

export default Analytics;