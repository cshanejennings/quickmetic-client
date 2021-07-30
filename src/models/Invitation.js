import PropTypes from 'prop-types';
import { local_time } from '../util/laravel-api';

export const create_invitation_model = (dto) => {
  const vo = {
    id: dto.id,
    account_id: dto.account_id,
    email: dto.email,
    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
    deleted_at: (dto.deleted_at) ? local_time(dto.deleted_at) : null,
  }
  return vo;
}

export const invitation_store_initial_state = {
  account_id: null,
  email: null,
}

export const UserProps = PropTypes.shape({
  id: PropTypes.number,
  account_id: PropTypes.number,
  email: PropTypes.string,
  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});
