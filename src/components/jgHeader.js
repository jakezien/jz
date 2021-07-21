import React, { useContext } from 'react'
import styled from 'styled-components'
import { rhythm } from "../utils/typography"
import Logo from '../../static/svg/logo-jakestagram.svg'
import { JgImagesContext } from './jgImagesContext'


const Header = styled.div`
  display: flex;
  margin-bottom: ${rhythm(1)};

  div:first-child {
    flex: 1 0 33%
    margin-right:3px;
    @media (min-width: 768px) {
      margin-right: 28px;
    }
  }
  div:last-child {
    flex: 1 0 66%;
    p {
      margin: 0;
    }
  }
`

const StyledLogo = styled(Logo)`
  path {
    fill: ${props => props.theme.isDark ? props.theme.textTint : props.theme.textShade};
  }  
`

const JgHeader = (props) => {

	const { allPostsLength } = useContext(JgImagesContext)  

  return (
    <Header>
      <div>
        <StyledLogo/>
      </div>
      <div>
        <p>jakezien</p>
        {/*<p><span><strong>{allPostsLength}</strong> posts</span></p>*/}
        <p>{props.tags.join(' ')}</p>
      </div>
    </Header>
  )
}

export default JgHeader;