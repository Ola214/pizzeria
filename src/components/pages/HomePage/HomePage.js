import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableList from '../TableList/TableList';
import { fetchTables, getTablesState } from '../../../redux/tablesRedux';

const HomePage = () => {
  const dispatch = useDispatch();
  const { tables, loading, error } = useSelector(getTablesState);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <section>
      <TableList tables={tables} loading={loading} error={error} />
    </section>
  );
};

export default HomePage;
