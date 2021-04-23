import { createActionType } from './_create';

export const API_REQUEST = createActionType('API_REQUEST', 'Api Request');
export const apiRequest = meta => ({
  type: API_REQUEST.START,
  meta,
});
