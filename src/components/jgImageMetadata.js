import React, { useContext } from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"
import { JgImageContext } from './jgImageContext'

const StyledSpan = styled.span`
  display: block;
  font-family: Pantograph;
  font-weight: 300;
  font-stretch: condensed;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top:${rhythm(.25)};
  margin-bottom:${rhythm(1)};

  .grid & {
    display: none
  }
`

const JgImageMetadata = (props) => {

  const { imageNode } = useContext(JgImageContext)

  let make = imageNode?.fields.exif.image.Make
  let model = imageNode?.fields.exif.image.Model
  let utcDate = imageNode?.fields.exif.exif.DateTimeOriginal
  let displayDate = utcDate ? moment.utc(utcDate).format('MMM D, YYYY h:mm A') : ''
  
  return (
    <StyledSpan>
      {make} {model}&nbsp;&nbsp;|&nbsp;&nbsp;{displayDate}
    </StyledSpan>
  )
}

export default JgImageMetadata;