import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { countrify } from '../../core';

import logoWhite from '../../../assets/images/logo-white-all.png';
import downloadIcon from '../../../assets/images/analysis/download.svg';

const useStyles = makeStyles({
  root: {
    fontSize: '0.813rem',
    color: '#848484'
  },
  actionIcon: {
    marginRight: '21px'
  }
});

const createPdfStyles = StyleSheet =>
  StyleSheet.create({
    page: {
      padding: 20,
      paddingBottom: 50
    },
    section: {
      padding: 20
    },
    footer: {
      position: 'absolute',
      height: 50,
      bottom: 0,
      right: 40,
      left: 40
    },
    header: {
      position: 'relative',
      height: 100,
      marginLeft: -20,
      marginRight: -20,
      marginBottom: 20
    },
    divider: {
      height: 4,
      marginTop: 46,
      backgroundColor: '#29a87c',
      width: '100%'
    },
    downloadedAt: {
      position: 'absolute',
      fontSize: 14,
      left: 0
    },
    linkTakwimuFooter: {
      position: 'absolute',
      fontSize: 14,
      right: 0,
      color: 'black',
      textDecoration: 'none'
    },
    linkTakwimu: {
      position: 'absolute',
      top: 26,
      fontSize: 14,
      right: 20,
      color: 'black',
      textDecoration: 'none'
    },
    linkLicense: {
      position: 'absolute',
      top: 54,
      fontSize: 14,
      right: 20,
      color: 'black',
      textDecoration: 'none'
    },
    logo: {
      width: 80,
      marginTop: 42,
      marginLeft: 10
    },
    logoBackground: {
      position: 'absolute',
      left: 40,
      backgroundColor: '#29a87c',
      width: 100,
      height: 100,
      borderRadius: 50,
      borderBottomColor: '#ffffff',
      borderBottomStyle: 'solid',
      borderBottomWidth: 2
    },
    title: {
      fontSize: 54
      // fontFamily: 'Lora'
    },
    text: {
      fontSize: 14,
      lineHeight: 2.05,
      // fontFamily: 'Muli',
      paddingBottom: 28
    },
    boldText: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 2.05,
      // fontFamily: 'Muli',
      paddingBottom: 28
    }
  });

const createPdf = (Document, Image, Link, Page, Text, View) => {
  function AnalysisPDF({ pdfClasses, topic, data, takwimu }) {
    const classes = pdfClasses;
    return (
      <Document>
        <Page size="A4" style={classes.page}>
          <View style={classes.header} fixed>
            <Link href="https://takwimu.africa" style={classes.linkTakwimu}>
              www.takwimu.africa
            </Link>
            <View style={classes.divider} />
            <Link
              style={classes.linkLicense}
              href="//creativecommons.org/licenses/by/4.0/"
            >
              2018 Takwimu CC by 4.0
            </Link>
            <View style={classes.logoBackground}>
              <Image style={classes.logo} src={logoWhite} />
            </View>
          </View>
          <View style={classes.section}>
            <Text style={classes.title}>
              {countrify(
                data.content.post_title,
                takwimu.country,
                takwimu.countries,
                ' : '
              )}
            </Text>
          </View>
          {topic === 'topic' ? (
            <View style={classes.section}>
              {data.content.content.split('</p>').map(t => (
                <Text key={t} style={classes.text}>
                  {t.replace(/<(?:.|\n)*?>/gi, '')}
                </Text>
              ))}
            </View>
          ) : (
            <View style={classes.section}>
              {data.item.map(c => (
                <>
                  <Text style={classes.boldText}>
                    {c.carousel_name}, {c.carousel_title}
                  </Text>
                  {c.carousel_description.split('</p>').map(t => (
                    <Text style={classes.text}>
                      {t.replace(/<(?:.|\n)*?>/gi, '')}
                    </Text>
                  ))}
                </>
              ))}
            </View>
          )}

          <View style={classes.footer} fixed>
            <Text style={classes.downloadedAt}>
              Downloaded{' '}
              {new Date().toLocaleDateString('UTC', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
              })}
            </Text>
            <Link
              href="https://takwimu.africa"
              style={classes.linkTakwimuFooter}
            >
              www.takwimu.africa
            </Link>
          </View>
        </Page>
      </Document>
    );
  }

  AnalysisPDF.propTypes = {
    pdfClasses: PropTypes.shape({}).isRequired,
    data: PropTypes.shape({
      content: PropTypes.shape({
        post_title: PropTypes.string,
        post_name: PropTypes.string,
        content: PropTypes.string
      }),
      item: PropTypes.arrayOf(
        PropTypes.shape({
          carousel_description: PropTypes.string,
          carousel_name: PropTypes.string,
          carousel_title: PropTypes.string
        })
      )
    }).isRequired,
    topic: PropTypes.oneOf(['topic', 'carousel_topic']).isRequired,
    takwimu: PropTypes.shape({
      country: PropTypes.shape({}),
      countries: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired
  };
  return AnalysisPDF;
};

// https://stackoverflow.com/a/32108184
const isEmpty = obj =>
  obj === undefined ||
  obj === null ||
  (Object.keys(obj).length === 0 && obj.constructor === Object);

function DownloadPDF({ title, topic, data, takwimu, top }) {
  const classes = useStyles();
  const [reactPdf, setReactPdf] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  useEffect(() => {
    import('../../../modules/react-pdf').then(m => {
      setReactPdf(m.default);
    });
  }, []);

  useEffect(() => {
    if (
      reactPdf &&
      !isEmpty(data) &&
      (topic === 'topic' || !isEmpty(data.item))
    ) {
      const {
        ReactPDF,
        Document,
        Image,
        Link,
        Page,
        StyleSheet,
        Text,
        View
      } = reactPdf;
      const pdfClasses = createPdfStyles(StyleSheet);
      const AnalysisPDF = createPdf(Document, Image, Link, Page, Text, View);
      ReactPDF.pdf(
        <AnalysisPDF
          pdfClasses={pdfClasses}
          topic={topic}
          data={data}
          takwimu={takwimu}
        />
      )
        .toBlob()
        .then(setPdfBlob);
    }
  }, [reactPdf, data, topic, takwimu]);

  return (
    <ButtonBase
      ga-on="click"
      ga-event-category="Analysis"
      ga-event-action="Download"
      ga-event-label={`${takwimu.country.name}: ${title}`}
      ga-event-value={top ? 1 : 0}
      className={classes.root}
      disabled={pdfBlob === null}
      onClick={() => {
        if (pdfBlob) {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(pdfBlob);
          link.download = `${title}.pdf`;
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pdfBlob);
        }
      }}
    >
      <img alt="download" src={downloadIcon} className={classes.actionIcon} />
      Download this analysis (PDF
      {pdfBlob && ` ${(pdfBlob.size / 1000).toFixed(1)}kb`})
    </ButtonBase>
  );
}

DownloadPDF.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    content: PropTypes.shape({
      content: PropTypes.string,
      post_title: PropTypes.string
    }),
    item: PropTypes.arrayOf(
      PropTypes.shape({
        carousel_description: PropTypes.string,
        carousel_name: PropTypes.string,
        carousel_title: PropTypes.string
      })
    )
  }).isRequired,
  takwimu: PropTypes.shape({
    country: PropTypes.shape({
      name: PropTypes.string
    }),
    countries: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired,
  top: PropTypes.bool.isRequired,
  topic: PropTypes.oneOf(['topic', 'carousel_topic']).isRequired
};

export default DownloadPDF;
