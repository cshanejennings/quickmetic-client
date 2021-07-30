export const API_EVENT = {
  CONNECTING: 'textlobby.api-event.server_connecting',
  CONNECTED: 'textlobby.api-event.server_connected',
  CONNECTION_FAILED: 'textlobby.api-event.server_connection_failed',
  LOADING: 'textlobby.api-event.loading',
  LOADED: 'textlobby.api-event.loaded',
  ERROR: 'textlobby.api-event.error',
}

export const FORM_EVENTS = {
  OPEN_DIALOG: 'wlc.nav.open-dialog',
  CLOSE_DIALOG: 'wlc.nav.close-dialog',
  UPDATE_FORM_VALUE: 'wlc.nav.update-form-value',
  UPDATE_FORM_VALUES: 'wlc.nav.update-form-values',
  CLEAR_FORM_VALUES: 'wlc.nav.clear-form-values',
};

export const TRIAL_EVENTS = {
  TRIALS_LOADING: 'math.trial.trials-loading',
  TRIALS_LOADED: 'math.trial.trials-loaded',
  TRIAL_SUBMITTING: 'math.trial.trial-submitting',
  TRIAL_SUBMITTED: 'math.trial.trial-submited',
  UPDATE_TRIAL: 'math.trial.update-trial',
  CREATE_TRIAL: 'math.trial.load-trial',
  UPDATE_COUNTDOWN: 'math.trial.update-countdown',
  COMPLETE_COUNTDOWN: 'math.trial.complete-countdown',
  UPDATE_ENTRIES: 'math.trial.update-entries',
  SUBMIT_TRIAL: 'math.trial.submit-trial',
}

export const NAV_EVENTS = {
  TAB_CHANGE: 'wlc.nav.tab-change',
  TOGGLE_DIALOG: 'wlc.nav.toggle-dialog',
  UPDATE_DATE_RANGE: 'wlc.nav.update-date-range',
}

export const REPORT_EVENTS = {
  REPORT_LOAD: 'wlc.reports.report-load',
  REPORT_LOADED: 'wlc.reports.report-loaded',
};

export const ITEM_EVENTS = {
  SYNC_QUICKBOOKS_ITEMS: 'wlc.items.sync-with-quickbooks',
  SHOPIFY_ITEMS_SYNC: 'wlc.items.shopify-items-sync',
  SHOPIFY_ITEMS_SYNC_COMPLETE: 'wlc.items.shopify-items-sync-complete',
  SHOPIFY_ITEM_UPDATE: 'wlc.items.shopify-item-update',
  SHOPIFY_ITEM_UPDATED: 'wlc.items.shopify-item-updated',
  ADD_JANE_ITEMS: 'wlc.items.added',
  JANE_ITEMS_INGESTING: 'wlc.items.jane-items-ingesting',
  ITEMS_LOADING: 'wlc.items.loading',
  ITEMS_LOADED: 'wlc.items.loaded',
}

export const JANE_TRANSACTIONS = {
  LOADED: 'wlc.transactions.loaded',
  EXPORTED: 'wlc.transactions.exported',
  QB_TRANSACTION_SYNCED: 'wlc.transactions.qb-transaction-synced',
  SYNCING_WITH_QB: 'wlc.transactions.syncing',
  RESET: 'wlc.transactions.reset',
};

export const USER_EVENTS = {
  LOGGING_IN: 'textlobby.user_events.logging_in',
  LOGGED_IN: 'textlobby.user_events.logged_in',
  LOGGED_OUT: 'textlobby.user_events.logged_out',
  LOGIN_FAILURE: 'textlobby.user_events.user_login_failure',
  USER_UPDATING: 'textlobby.user_events.user_updating',
  UPDATED: 'textlobby.user_events.updated',
};

export const REGISTRATION_EVENT = {
  FAILURE: 'textlobby.registration_event.failure',
  COMPLETE: 'textlobby.registration_event.complete',
  INVITED: 'textlobby.registration_event.invited',
  EMAIL_VALIDATING: 'textlobby.registration_event.email-validating',
  EMAIL_VALIDATED: 'textlobby.registration_event.email-validated',
  SCHEDULE_ONBOARDING: 'textlobby.account-events.schedule-onboarding',
}

export const ACCOUNT_EVENTS = {
  UPDATED: 'textlobby.account-events.account_updated',
  USERS_LOADING: 'textlobby.account-events.users-loading',
  USERS_LOADED: 'textlobby.account-events.users-loaded',
};

export const INVITATION_EVENTS = {
  INVITED: 'textlobby.invitation_event.invited',
  VERIFIED: 'textlobby.invitation_event.invited',
  ACCEPTED: 'textlobby.invitation_event.invited',
}

export const OAUTH_EVENTS = {
  GOOGLE_REDIRECTING: 'textlobby.oauth_events.google-redirecting',
}

export const PASSWORD_EVENT = {
  RESET_REQUEST_SENDING: 'textlobby.password_event.reset-request-sending',
  RESET_REQUEST_SENT: 'textlobby.password_event.reset-request-sent',
  RESET_REQUEST_FAILED: 'textlobby.password_event.reset-request-sent',
  TOKEN_VALIDATING: 'textlobby.password_event.token-validating',
  TOKEN_INVALID: 'textlobby.password_event.token-invalid',
  TOKEN_VALIDATED: 'textlobby.password_event.token-validated',
  RESETTING_PASSWORD: 'textlobby.password_event.resetting-password',
  PASSWORD_RESET_FAILED: 'textlobby.password_event.password-reset-failed',
}
