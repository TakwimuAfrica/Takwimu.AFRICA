import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  IconButton
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import RichTypography from '../RichTypography';

const styles = theme => ({
  panel: {
    marginTop: '0.3125rem',
    marginBottom: '0.0625rem',
    '&::before': {
      content: '',
      backgroundColor: 'transparent'
    }
  },
  panelExpanded: {
    margin: '0.3125rem 0 0 0 !important'
  },
  header: {
    height: '5.25rem',
    backgroundColor: theme.palette.background.light
  },
  expandedHeader: {
    backgroundColor: theme.palette.primary.main
  },
  headerTitle: {
    color: theme.palette.primary.main,
    margin: '0.5rem',
    fontWeight: 600
  },
  expandedHeaderTitle: {
    color: 'white'
  },
  iconButton: {
    color: '#000',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  icon: {
    fontSize: '2.4375rem'
  },
  iconExpanded: { fontSize: '2.4375rem', color: 'white' },
  panelDetails: { backgroundColor: theme.palette.info.main }
});

class Faq extends React.Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(state => ({
      expanded: !state.expanded
    }));
    event.preventDefault();
  }

  render() {
    const { classes, expandTitle, children } = this.props;
    const { expanded } = this.state;

    return (
      <ExpansionPanel
        square
        elevation={0}
        classes={{ root: classes.panel, expanded: classes.panelExpanded }}
      >
        <ExpansionPanelSummary
          className={classNames([
            classes.header,
            { [classes.expandedHeader]: expanded }
          ])}
          onClick={this.handleChange}
          disableRipple
          expandIcon={
            <IconButton className={classes.iconButton}>
              {expanded ? (
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={classes.iconExpanded}
                >
                  &#8722;
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={classes.icon}
                >
                  &#43;
                </Typography>
              )}
            </IconButton>
          }
        >
          <RichTypography
            className={classNames([
              classes.headerTitle,
              { [classes.expandedHeaderTitle]: expanded }
            ])}
            onClick={this.handleChange}
          >
            {expandTitle}
          </RichTypography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panelDetails}>
          {children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

Faq.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  expandTitle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
Faq.defaultProps = {
  expandTitle: ''
};

export default withStyles(styles)(Faq);
