import React, {useState, useEffect, useContext} from "react"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { getImageWithFilename } from "../utils/functions";
import {ImagesContext} from '../components/imagesContext.js'

const JzImage = (props) => {
	const imageNodes = useContext(ImagesContext)
	const { filename, alt } = props

	return (
		<div className="jz-image" data-filename={filename}>
			<GatsbyImage {...props} 
				image={getImageWithFilename(imageNodes, filename)}
				alt={alt || ''}
				/>
		</div>
	)
}

export default JzImage