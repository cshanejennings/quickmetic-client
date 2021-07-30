import PropTypes from 'prop-types';
import { local_time } from '../util/laravel-api';

export const create_user_model = (dto) => {
  const vo = {
    id: dto.id,
    account_id: dto.account_id,
    first_name: dto.first_name,
    last_name: dto.last_name,
    settings: dto.options || dto.settings,
    email: dto.email,
    email_verified_at: (dto.email_verified_at) ? local_time(dto.email_verified_at) : null,
    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
    deleted_at: (dto.deleted_at) ? local_time(dto.deleted_at) : null,
  }
  return vo;
}

export const user_store_initial_state = {
  account_id: null,
  first_name: null,
  last_name: null,
  email: null,
  settings: {
    header_digits: 1,
    height: 8,
    row_digits: 2,
    trial_time: 300,
    type: "addition",
    width: 5,
  },
}

export const UserProps = PropTypes.shape({
  id: PropTypes.number,
  account_id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string,
  options: PropTypes.shape({
    header_digits: PropTypes.number,
    height: PropTypes.number,
    row_digits: PropTypes.number,
    trial_time: PropTypes.number,
    type: PropTypes.string,
    width: PropTypes.number,
  }),
  email_verified_at: PropTypes.instanceOf(Date),
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});

export const users_store_initial_state = [];
export const UserListProps = PropTypes.arrayOf(UserProps);
