import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import Tweet from '../components/Tweet';
// import useTweets from '../hooks/useTweets';
import { getTweets } from '../api/tweets';

export default function Home() {
  // const { data = [], error = '', loading = false } = useTweets();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const response = await getTweets();
      setData(response);
    } catch (error) {
      setError(error.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    load();
  }, []);

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          {loading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
          {data.map(function (tweet) {
            return <Tweet key={tweet.id} title={tweet.title} />;
          })}
        </Col>
      </Row>
    </Container>
  );
}
