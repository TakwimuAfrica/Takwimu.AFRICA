import createTheme from '@hurumap-ui/charts/styles/createTheme';

const FONT_FAMILY_HEADING = '"Lora", serif';
const FONT_FAMILY_TEXT = '"Muli", sans-serif';

const COLOR_BREWER_DIVERGING = [
  '#8ed3a5',
  '#29a87c',
  '#223a07',
  '#7d8c6c',
  '#5bc17d'
];

const theme = createTheme({
  chart: {
    pie: {
      width: 350,
      height: 200,
      padding: 0,
      legendWidth: 100,
      origin: { x: 150, y: 125 },
      colorScale: COLOR_BREWER_DIVERGING
    },
    area: {
      colorScale: COLOR_BREWER_DIVERGING
    },
    group: {
      colorScale: COLOR_BREWER_DIVERGING
    },
    line: {
      offset: 70,
      width: 350,
      height: 350,
      colorScale: ['#29a87c', '#a0d9b3', '#004494', '#4abc70'],
      style: {
        data: {
          strokeWidth: 4
        },
        labels: {
          fontFamily: FONT_FAMILY_TEXT,
          fill: 'rgb(0,0,0)'
        }
      }
    },
    bar: {
      width: 350,
      height: 350,
      barWidth: 30,
      offset: 32,
      style: {
        data: {
          fill: COLOR_BREWER_DIVERGING[0]
        },
        labels: {
          fontFamily: FONT_FAMILY_TEXT,
          fill: 'rgb(0,0,0)'
        }
      }
    },
    dependentAxis: {
      fixLabelOverlap: true,
      tickCount: 3
    },
    axis: {
      labelWidth: 150,
      style: {
        tickLabels: {
          fontFamily: FONT_FAMILY_TEXT,
          fill: 'rgb(0,0,0)'
        },
        axisLabels: {
          fontFamily: FONT_FAMILY_TEXT,
          fill: 'rgb(0,0,0)'
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#29a87c' // dark-mint
    },
    secondary: {
      main: '#004494' // darkish-blue
    },
    text: { primary: '#000', secondary: '#fff' },
    background: {
      default: '#fff',
      light: '#f6f6f6' // light gray
    },
    info: {
      main: '#f6fbfa', // ice-blue
      other: '#9b9b9b'
    },
    data: {
      main: '#4a4a4a',
      light: '#F5F5F5' // #4a4a4a opacity 0.05
    }
  },
  typography: {
    fontHeading: FONT_FAMILY_HEADING,
    fontText: FONT_FAMILY_TEXT,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '3.375rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: 'black'
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '3.375rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: 'black'
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '2.375rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: 'black'
    },
    h4: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '1.875rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#231f20'
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '1.75rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal'
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '1.5rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal'
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '1.25rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '2.05',
      letterSpacing: 'normal'
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '1.125rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '2.05',
      letterSpacing: 'normal'
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.8125rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: '1.69',
      letterSpacing: 'normal'
    },
    button: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '0.875rem',
      fontWeight: 'bold',
      fontStyle: 'normal',
      fontStretch: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      textTransform: 'none'
    },
    useNextVariants: true
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiButton: {
      color: 'primary',
      variant: 'contained'
    },
    MuiPaper: {
      elevation: 2
    },
    MuiDialogContentText: {
      color: 'textPrimary'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          outline: 'none'
        },
        p: {
          fontSize: '1.25rem',
          fontWeight: 'normal',
          fontStyle: 'normal',
          fontStretch: 'normal',
          lineHeight: '2.05',
          letterSpacing: 'normal'
        },
        '#wpcontent': {
          paddingLeft: 0
        },
        '.wp-block-columns': {
          display: 'flex',
          marginBottom: '28px',
          flexWrap: 'wrap',
          '& .are-vertically-aligned-top': {
            alignItems: 'flex-start'
          },
          '& .are-vertically-aligned-center': {
            alignItems: 'center'
          },
          '& .are-vertically-aligned-bottom': {
            alignItems: 'flex-end'
          }
        },
        '.wp-block-column': {
          marginBottom: '1em',
          flexGrow: '1',
          minWidth: '0',
          flexWrap: 'wrap',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          display: 'flex',
          '& .is-vertically-aligned-top': {
            alignSelf: 'flex-start'
          },
          '& .is-vertically-aligned-center': {
            alignSelf: 'center'
          },
          '& .is-vertically-aligned-bottom': {
            alignSelf: 'flex-end'
          },
          '@media (max-width: 599px)': {
            flexBasis: '100% !important'
          },
          '@media (min-width: 600px)': {
            flexBasis: 'calc(50% - 16px)',
            flexGrow: '0'
          }
        },
        '.indicator-widget': {
          width: '100%'
        },
        '.indicator-description': {
          display: 'none' // deprecated php indicator has div with this class name which is redundant
        },
        '.flourish-embed': {
          width: '100%'
        },
        [`.wp-block-columns,
          .wp-block-hurumap-card-block,
          .wp-block-hurumap-data-hurumap-block,
          .wp-block-hurumap-data-flourish-block`]: {
          margin: '1em 0',
          '& > div': {
            margin: 0
          }
        },
        '.wp-block-columns .wp-block-column': {
          width: '100%'
        },
        '.wp-block-column > div': {
          width: '100%'
        },
        '.wp-block-column:nth-child(even)': {
          '@media (min-width: 600px)': {
            marginLeft: '32px'
          }
        },
        '.wp-block-column:not(:first-child)': {
          '@media (min-width: 782px)': {
            marginLeft: '32px'
          }
        },
        '.aligncenter': {
          display: 'block',
          'margin-left': 'auto',
          'margin-right': 'auto'
        },
        '.alignleft': {
          float: 'left',
          marginRight: '1em'
        },
        '.alignright': {
          float: 'right',
          marginLeft: '1em'
        },
        /**
         * Override load-styles.php customizations
         */
        a: {
          '&:focus': {
            boxShadow: 'none',
            color: 'black',
            outline: 'none'
          }
        },
        li: {
          marginBottom: 0
        }
      }
    },
    MuiLink: {
      root: {
        fontFamily: FONT_FAMILY_TEXT,
        fontSize: '1.125rem',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontStretch: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal'
      }
    },
    MuiButton: {
      root: {
        borderRadius: '0.75rem',
        borderSize: '00625rem',
        width: '100%',
        padding: '0',
        '@media (min-width: 960px)': {
          // md
          width: '15.609375rem' // .75 of lg
        },
        '@media (min-width: 1280px)': {
          // lg
          width: '20.8125rem'
        }
      },
      contained: {
        boxShadow: 'none'
      },
      label: {
        paddingTop: '1.125rem',
        paddingBottom: '1.0625rem'
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none'
      }
    },
    MuiCardContent: {
      root: {
        padding: '1.4375rem 0'
      }
    },
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    }
  }
});

export default theme;
