import PropTypes from 'prop-types';
import { local_time } from '../util/laravel-api';


export const create_plan_model = (dto) => {
  const vo = {
    id: dto.id,

    name: dto.name,
    rate: dto.rate,
    currency: dto.currency,
    frequency: dto.frequency,

    created_at: local_time(dto.created_at),
    updated_at: (dto.updated_at) ? local_time(dto.updated_at) : null,
    deleted_at: (dto.deleted_at) ? local_time(dto.deleted_at) : null,
  }
  return vo;
}

export const plan_store_initial_state = {
  id: null,

  name: null,
  rate: null,
  currency: null,
  frequency: null,

  created_at: null,
  updated_at: null,
  deleted_at: null,
};

export const PlanProps = PropTypes.shape({
  id: PropTypes.number,

  name: PropTypes.string,
  rate: PropTypes.number,
  currency: PropTypes.oneOf([ 'CAD', 'USD' ]),
  frequency: PropTypes.oneOf([ 'monthly', 'annual' ]),

  created_at: PropTypes.instanceOf(Date),
  updated_at: PropTypes.instanceOf(Date),
  deleted_at: PropTypes.instanceOf(Date),
});
