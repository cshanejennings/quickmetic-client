import React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import {
  // Paper,
  Typography,
  Grid,
  // Divider,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core/';

import {
  CheckCircleOutline
} from '@material-ui/icons/';

const tiers = [
  {
    title: "Micro",
    subtitle: 'Small, but ready',
    price: "24",
    description: [
      "Dedicated texting line",
      "24 hr history",
      "100 msgs / month",
    ],
    buttonText: "Get Started",
    buttonVariant: "outlined"
  },
  {
    title: "Standard",
    subtitle: 'For medium-sized businesses',
    subheader: "Most popular",
    price: "49",
    description: [
      "Dedicated texting line",
      "1 year history",
      "unlimited incoming msgs",
      "400 outgoing msgs",
      "1 user",
    ],
    buttonText: "Get started",
    buttonVariant: "contained"
  },
  {
    title: "Unlimited",
    subtitle: 'For medium to large businesses',
    price: "99",
    description: [
      "Dedicated texting line",
      "permanent history",
      "unlimited incoming msgs",
      "unlimited outgoing msgs",
      "3 Users included",
      "auto responder",
      "custom templates",
    ],
    buttonText: "Get Started",
    buttonVariant: "outlined"
  }
];

const get_styles = makeStyles(theme => ({
  layout: {
    width: "100%",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  pricing_model: {
    height: 600,
    position: 'relative'
  },
  heroContent: {
    margin: "0 auto",
  },
  gridContainer: {
    marginTop: theme.spacing(6)
  },
  cardHeader: {
    backgroundColor: '#333',
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
  },
  cardContent: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),

  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  tierBtn: {
    bottom: 20,
  },
  card_actions: {
    position: 'absolute',
    width: '100%',
    bottom: 0
  },
  caption: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 5,
    fontSize: '1em'
  },
  subheader: {
    width: '100%',
    display: 'block',
    position: 'absolute',
    fontSize: 16,
    textAlign: 'center',
    top: 75,
    padding: 0,
    marginLeft: -48,
  },
  corner_ribbon: {
    width: 160,
    background: '#a0cc22',
    position: 'absolute',
    textAlign: 'center',
    lineHeight: 1.5,
    letterSpacing: 1,
    color: '#f0f0f0',
    top: 20,
    right: -50,
    transform: 'rotate(45deg)',
    boxShadow: '0 0 3px rgba(0,0,0,.3)',
    fontSize: '12px',
  }
}));

const HomePage = (props) => {
  const classes = get_styles();

  return (
    <div className={classes.layout}>
      <div className={classes.heroContent}>
        <Typography align="center" variant="h2" gutterBottom>Pricing</Typography>
        <Typography align="center" variant="h6">
          We are currently in beta and not available to the public.
        </Typography>
        <Typography align="center" variant="h6">
          The options below illustrate our planned pricing model.
        </Typography>
        <Grid container justify="center" alignItems="flex-end" spacing={4}
          className={ classes.gridContainer }
        >
          {tiers.map((tier, key) => (
            <Grid key={ key } item>
              <Grid container justify="center">
                <Grid item>
                  <Card className={ classes.pricing_model }>
                    <CardHeader
                      titleTypographyProps={{ align: "center" }}
                      title={tier.title}
                      subheader={ tier.subtitle }
                      subheaderTypographyProps={ {className: classes.caption }}
                      className={classes.cardHeader}
                      action={ (tier.subheader) ? <div className={classes.corner_ribbon}>POPULAR</div> : ''}
                     />
                    <CardContent className={classes.cardContent}>
                      <div className={classes.cardPricing}>

                        <Typography variant="h3" >
                          ${tier.price}
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                          /mo
                        </Typography>
                      </div>
                      <List>
                      {tier.description.map((desc, key) => (
                        <ListItem key={ key + 'description' }>
                        <ListItemIcon><CheckCircleOutline /></ListItemIcon>
                        <ListItemText primary={desc} />
                        </ListItem>
                      ))}
                      </List>
                    </CardContent>
                    <CardActions className={ classes.card_actions }>
                      <Button disabled={ true } className={classes.tierBtn} fullWidth variant={tier.buttonVariant} color="primary" >
                        {tier.buttonText}{" "}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = state => { return {
  api_ready: state.app.api_ready,
  connections: state.app.connections,
  account: state.account,
  subscription: state.account.subscription,
  profile: state.user.profile,
} };

const mapDispatchToProps = (dispatch) => { return {
} };

export default connect( mapStateToProps, mapDispatchToProps )(HomePage);
