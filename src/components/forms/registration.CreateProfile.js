import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress
} from '@material-ui/core/';

import {
  Person,
  Email,
  Lock,
  Save,
} from '@material-ui/icons/';

import {
  is_email,
  is_password,
} from '../../util/regex';

import SignupStepper from '../SignupStepper';

import {
  PasswordField,
  TextInputField,
} from '../form-fields/';

import ContentWrapper from '../ContentWrapper';

const get_styles = makeStyles(theme => ({
  list_icon: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  submit: {
    width: '100%',
    margin: theme.spacing(1),
    borderRadius: 0,
    [theme.breakpoints.up('sm')]: {
      margin: '1%',
      width: '98%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '2%',
      width: '96%',
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));

const CreateProfile = (props) => {
  const classes = get_styles();
  const { update, handle_success } = props;
  const [updating, set_updating] = React.useState(false);
  const [values, set_values] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const get_update_func = (id) => (val) => {
    set_values({...values, [id]: val});
  };

  const submit = () => {
    console.log(values);
    update(values).then(resp => handle_success()
    ).catch(e => {
      console.error(e);
    });
    set_updating(true);
  }

  const block_submit = (
    values.first_name.length > 2 &&
    values.last_name.length > 2 &&
    is_email(values.email) &&
    is_password(values.password) &&
    !updating
  ) ? false : true;

  const loading_icon = () => {
    return (updating) ? (
      <div className={ classes.wrapper }>
        <Save />
        <CircularProgress size={36} className={classes.progress} />
      </div>
    ) : '';
  }

  return (
    <ContentWrapper icon={ <Person /> } heading="CREATE ACCOUNT">
      <SignupStepper current_step={ 0 }/>
      <List>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
              <Person />
          </ListItemIcon>
          <ListItemText>
          <TextInputField
            label="First Name"
            disabled={ updating }
            error_msg={ '' }
            value={ values.first_name }
            on_change={ get_update_func('first_name') }
          />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
          </ListItemIcon>
          <ListItemText>
            <TextInputField
              label="Last Name"
              disabled={ updating }
              error_msg={ '' }
              value={ values.last_name }
              on_change={ get_update_func('last_name') }
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
              <Email />
          </ListItemIcon>
          <ListItemText>
            <TextInputField
              label="Email"
              disabled={ updating }
              error_msg={ '' }
              value={ values.email }
              on_change={ get_update_func('email') }
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
            <Lock />
          </ListItemIcon>
          <ListItemText>
            <PasswordField
              disabled={ updating }
              error_msg={ '' }
              value={ values.password }
              on_change={ get_update_func('password') }
            />
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon className={ classes.list_icon }>
          { loading_icon() }
          </ListItemIcon>
          <ListItemText>
            <Button
              disabled={ block_submit }
              className={classes.submit}
              color="primary"
              variant="contained"
              onClick={ submit }
            >Create Account</Button>
          </ListItemText>
        </ListItem>
      </List>
    </ContentWrapper>
  );
}

CreateProfile.propTypes = {
  update: PropTypes.func.isRequired,
  handle_success: PropTypes.func.isRequired,
}

export default CreateProfile;
