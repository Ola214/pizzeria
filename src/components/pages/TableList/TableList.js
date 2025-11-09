import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TableList = ({ tables, loading, error }) => {
  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" /> Loading...
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (!tables || tables.length === 0) {
    return <p>No tables available.</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Lista stolików</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>People</th>
            <th>Max</th>
            <th>Bill</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.status}</td>
              <td>{t.peopleAmount}</td>
              <td>{t.maxPeopleAmount}</td>
              <td>{t.status === 'Busy' ? `${t.bill}` : '-'}</td>
              <td>
                <Button as={Link} to={`/table/${t.id}`} variant="primary" size="sm">
                  Show more
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

TableList.propTypes = {
  tables: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

TableList.defaultProps = {
  loading: false,
  error: null,
};

export default TableList;
