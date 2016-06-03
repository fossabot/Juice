import { createAction, handleActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import { createSelector } from 'reselect';
import validate from 'validate.js';

const initialState = fromJS({
  name: null,
  rule: {},
  message: {}
});

export const SET_VALIDATION_NAME = 'SET_VALIDATION_NAME';
export const SET_VALIDATION_MESSAGE = 'SET_VALIDATION_MESSAGE';
export const SET_VALIDATION_RULE = 'SET_VALIDATION_RULE';
export const CLEAR_VALIDATION_MESSAGE = 'CLEAR_VALIDATION_MESSAGE';

export const setValidationName = createAction(SET_VALIDATION_NAME);
export const setValidationRule = createAction(SET_VALIDATION_RULE);
export const setValidationMessage = createAction(SET_VALIDATION_MESSAGE, (name, error) => {
  const payload = {};
  payload[name] = error;
  return payload;
});
export const clearValidationMessage = createAction(CLEAR_VALIDATION_MESSAGE);

export const validateForm = (fields, cb) => (dispatch, getState) => {
  const { validation } = getState();
  const messages = validate(fields, validation.get('rule').toJS());
  const result = !messages;
  if (result) {
    dispatch(clearValidationMessage(validation.get('name')));
  } else {
    dispatch(setValidationMessage(validation.get('name'), messages));
  }
  if (cb) {
    cb(result);
  }
  return result;
};

const getComponentName = ({ validation }) => validation.get('name');
const getValidation = ({ validation }) => validation;
export const getComponentMessage = createSelector(
  [getComponentName, getValidation],
  (name, validate) => validate.getIn(['message', name], new Map())
);

export const actions = {
  setValidationMessage,
  clearValidationMessage,
  validateForm
};

export default handleActions({
  [SET_VALIDATION_NAME]: (state, { payload }) => state.set('name', payload),
  [SET_VALIDATION_RULE]: (state, { payload }) => state.set('rule', fromJS(payload)),
  [SET_VALIDATION_MESSAGE]: (state, { payload }) => state.mergeIn(['message'], payload),
  [CLEAR_VALIDATION_MESSAGE]: (state, { payload }) => state.setIn(['message', payload], new Map())
}, initialState);
