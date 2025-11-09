import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux';
import { Button } from 'react-bootstrap';

const TablePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tables = useSelector(getAllTables);
  const table = tables.find(t => String(t.id) === String(id));

  if (!table) {
    // if not found, redirect to home
    navigate('/');
    return null;
  }

  return (
    <div className="p-3">
      <h2>Table {id}</h2>
      <p><strong>Status:</strong> {table.status}</p>
      <p><strong>People:</strong> {table.peopleAmount}/{table.maxPeopleAmount}</p>
      {table.status === 'Busy' && <p><strong>Bill:</strong> ${table.bill}</p>}
      <Button as={Link} to={`/table/${id}/edit`} variant="primary">Edit</Button>
    </div>
  );
};

export default TablePage;
