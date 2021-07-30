import PropTypes from 'prop-types';
import { local_time } from '../util/laravel-api';


export const create_account_model = (dto) => {
  const vo = {
    id: dto.id,
    notification_email: dto.notification_email,
    phone_number: dto.phone_number,
    company_name: dto.company_name,
    email_incoming: (dto.email_incoming) ? true : false,
    email_outgoing: (dto.email_outgoing) ? true : false,
    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
    deleted_at: (dto.deleted_at) ? local_time(dto.deleted_at) : null,
  }
  return vo;
}

export const account_store_initial_state = {
  id: null,
  notification_email: null,
  phone_number: null,
  company_name: null,
  email_incoming: false,
  email_outgoing: false,
};


export const AccountProps = PropTypes.shape({
  id: PropTypes.number,
  notification_email: PropTypes.string,
  phone_number: PropTypes.string,
  company_name: PropTypes.string,
  email_incoming: PropTypes.bool.isRequired,
  email_outgoing: PropTypes.bool.isRequired,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});
