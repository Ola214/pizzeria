import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { saveTable } from '../../../redux/tablesRedux';

const TableDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3131/api/tables/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setTable(data);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (table && (table.status === 'Free' || table.status === 'Cleaning')) {
      setTable(prev => ({ ...prev, peopleAmount: 0 }));
    }
  }, [table && table.status]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    navigate('/');
    return null;
  }
  if (!table) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsed = name === 'status' ? value : Number(value);
    setTable(prev => ({ ...prev, [name]: parsed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validations
    if (table.peopleAmount < 0) table.peopleAmount = 0;
    if (table.maxPeopleAmount < 0) table.maxPeopleAmount = 0;
    if (table.maxPeopleAmount > 10) table.maxPeopleAmount = 10;
    if (table.peopleAmount > table.maxPeopleAmount) table.peopleAmount = table.maxPeopleAmount;

    // if status busy and bill missing -> default 0
    if (table.status === 'Busy' && (table.bill === undefined || table.bill === null)) {
      table.bill = 0;
    }

    // save to server via thunk
    await dispatch(saveTable(table));

    // redirect to home
    navigate('/');
  };

  return (
    <div className="p-3" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Table {id}</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group as={Row} className="mb-3" controlId="formStatus">
          <Form.Label column sm="2">Status:</Form.Label>
          <Col sm="6">
            <Form.Select name="status" value={table.status} onChange={handleChange}>
              <option value="Free">Free</option>
              <option value="Reserved">Reserved</option>
              <option value="Busy">Busy</option>
              <option value="Cleaning">Cleaning</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPeople">
          <Form.Label column sm="2">People:</Form.Label>
          <Col sm="3">
            <Form.Control
              type="number"
              name="peopleAmount"
              value={table.peopleAmount}
              onChange={handleChange}
              min="0"
              max={table.maxPeopleAmount}
            />
          </Col>
          <Col sm="1" className="text-center">/</Col>
          <Col sm="3">
            <Form.Control
              type="number"
              name="maxPeopleAmount"
              value={table.maxPeopleAmount}
              onChange={handleChange}
              min="0"
              max="10"
            />
          </Col>
        </Form.Group>

        {table.status === 'Busy' && (
          <Form.Group as={Row} className="mb-3" controlId="formBill">
            <Form.Label column sm="2">Bill:</Form.Label>
            <Col sm="3">
              <Form.Control
                type="number"
                name="bill"
                value={table.bill}
                onChange={handleChange}
                min="0"
              />
            </Col>
          </Form.Group>
        )}

        <Button type="submit" variant="primary">Update</Button>
      </Form>
    </div>
  );
};

export default TableDetailsPage;
