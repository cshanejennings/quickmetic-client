import PropTypes from 'prop-types';
import { local_time } from '../util/laravel-api';


export const create_subscription_model = (dto) => {
  const vo = {
    id: dto.id,

    account_id: dto.account_id,
    plan_id: dto.plan_id,
    renewal_date: (dto.renewal_date) ? local_time(dto.renewal_date) : null,

    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
    deleted_at: (dto.deleted_at) ? local_time(dto.deleted_at) : null,
  }
  return vo;
}

export const subscription_store_initial_state = {
  id: null,

  account_id: null,
  plan_id: null,
  renewal_date: null,

  created_at: null,
  updated_at: null,
  deleted_at: null,
};

export const SubscriptionProps = PropTypes.shape({
  id: PropTypes.number,

  account_id: PropTypes.number,
  plan_id: PropTypes.number,
  renewal_date: PropTypes.instanceOf(Date),

  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});
