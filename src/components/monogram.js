import React from "react"
import { rhythm, scale } from "../utils/typography"
import MonogramSVG from '../../static/svg/monogram.svg'

const Monogram = (props) => {
  return (
    <div style={{width:rhythm(2)}}>
      <MonogramSVG/>
    </div>
    )
}

export default Monogram