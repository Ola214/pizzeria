// selectors
export const getTablesState = state => state.tables || { tables: [], loading: false, error: null };
export const getAllTables = state => getTablesState(state).tables;
export const getTablesLoading = state => getTablesState(state).loading;
export const getTablesError = state => getTablesState(state).error;
import { API_URL } from '../config';

// action name helper
const createActionName = name => `app/tables/${name}`;

// actions
const SET_TABLES = createActionName('SET_TABLES');
const SET_LOADING = createActionName('SET_LOADING');
const SET_ERROR = createActionName('SET_ERROR');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');

export const setTables = payload => ({ type: SET_TABLES, payload });
export const setLoading = payload => ({ type: SET_LOADING, payload });
export const setError = payload => ({ type: SET_ERROR, payload });
export const updateTableAction = payload => ({ type: UPDATE_TABLE, payload });

// thunks
export const fetchTables = () => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${API_URL}/tables`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      dispatch(setTables(data));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const saveTable = (table) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const res = await fetch(`${API_URL}/tables/${table.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(table)
      });
      if (!res.ok) throw new Error('Save failed');
      const updated = await res.json();
      dispatch(updateTableAction(updated));
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

// reducer
const initial = {
  tables: [],
  loading: false,
  error: null
};

const tablesReducer = (state = initial, action) => {
  switch(action.type){
    case SET_TABLES:
      return { ...state, tables: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case UPDATE_TABLE:
      return { ...state, tables: state.tables.map(t => t.id === action.payload.id ? action.payload : t) };
    default:
      return state;
  }
};

export default tablesReducer;
