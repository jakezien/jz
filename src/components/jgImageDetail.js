import React, { useContext, forwardRef } from 'react'
import styled from 'styled-components'
import JgImageComments from './jgImageComments'
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"

const JgImageDetail = ({imageNode}) => {

  return (
		<div className="JG-IMAGE_DETAIL">
			<h1 style={{background:'yellow'}}>{imageNode?.name}</h1>
      <GatsbyImage image={getImage(imageNode)} alt=""/>
			<JgImageComments imageNode={imageNode}/>
		</div>    
  )
}

export default JgImageDetail;