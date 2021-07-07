import React from "react"
import moment from 'moment'
import styled from "styled-components"
import { rhythm } from "../utils/typography"

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

const StyledDiv = styled.div`

`

const JgImageMetadata = ({image}) => {
  let make = image?.fields.exif.image.Make
  let model = image?.fields.exif.image.Model
  let utcDate = image?.fields.exif.exif.DateTimeOriginal
  let displayDate = utcDate ? moment.utc(utcDate).format('MMM D, YYYY h:mm A') : ''
  
  return (
    <StyledSpan>
      {make} {model}&nbsp;&nbsp;|&nbsp;&nbsp;{displayDate}
    </StyledSpan>
  )
}

export default JgImageMetadata;