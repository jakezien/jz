import Typography from "typography"

const typography = new Typography({

  baseFontSize: "20px",
  baseLineHeight: 1.35,
  scaleRatio: 4.5,
 
  headerFontFamily: ["Pantograph", 'ui-monospace', 'Menlo', 'Monaco', "Cascadia Mono", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", "Source Code Pro","Fira Mono", "Droid Sans Mono", "Courier New", 'monospace'],
  headerWeight: 500,
 
  bodyFontFamily: ["covik-sans", 'system-ui', 'apple-system', '-apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', "Helvetica Neue", 'sans-serif'],
  bodyWeight: 300,

  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({

    'h1': {
      fontStretch: 'extra-condensed',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      lineHeight: '0.9',
      ...adjustFontSizeTo(rhythm(3), 2.5)
    },

    'h2': {
      opacity: 0.9,
      marginTop: rhythm(.75),
      marginBottom: rhythm(.5),
      fontStretch: 'extra-condensed',
      ...adjustFontSizeTo(rhythm(1.85), 1.66),
      maxWidth:"90%",
    },

    'h2:first-child' : {
      marginTop:0
    },
    
    'h3': {
      opacity: 0.8,
      marginTop: rhythm(.25),
      marginBottom: rhythm(.25),
      fontStretch: 'condensed',
      fontWeight: 500,
      ...adjustFontSizeTo(rhythm(1.4), 1.5),
    },

    'h4': {
      opacity: 0.9,
      marginBottom: rhythm(.5),
      fontStretch: 'condensed',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },

    'h5': {
      opacity: 0.75,
      fontFamily: 'covik-sans',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      maxWidth: '90%',
      ...adjustFontSizeTo(rhythm(.9), 1),
    },

    'p.bigText': {
      opacity: 0.75,
      fontWeight: 400,
      letterSpacing: '-0.02em',
      maxWidth: '90%',
      fontSize: '1.215rem',
      lineHeight: '1.35rem'
    },

    'strong': {
      opacity: 0.9
    },

    'figcaption': {
      opacity: 0.8,
      marginTop: rhythm(.25),
      marginBottom: rhythm(1),
      textAlign: 'center'
    },

    'p, a, span, li, figcaption': {
      letterSpacing: '-0.01em'
    },

    'a, a *': {
      color: 'inherit'
    },


    '@media only screen and (min-width:26rem)': {
      'h1': {
        ...adjustFontSizeTo(rhythm(3.33), 3),
      },

      'h2': {
        marginTop: rhythm(1),
        ...adjustFontSizeTo(rhythm(2.66))
      },
      
      'h3': {
        marginTop: rhythm(1),
        ...adjustFontSizeTo(rhythm(1.5), 1.5)
      },

      'h4': {

      },

      'h5': {
        ...adjustFontSizeTo(rhythm(1), 1.25),
        maxWidth: '80%'
      },

      'p.bigText': {
        fontSize: '1.35rem',
        lineHeight: '1.6875rem',
        maxWidth: '85%'
      },

      'p, a, span, li, figcaption': {
        letterSpacing: '-0.01em'
      },
    },
  })

})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography;
export const rhythm = typography.rhythm
export const scale = typography.scaleRatio