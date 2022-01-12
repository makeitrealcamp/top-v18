import React, { useEffect, useState } from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import Tweet from '../components/Tweet';
// import useTweets from '../hooks/useTweets';
import { createTweet, getTweets } from '../api/tweets';
import NewTweet from '../components/NewTweet';

import { useSelector } from '../store/Store';

export default function Home() {
  // const { data = [], error = '', loading = false } = useTweets();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      setError('');
      const { data } = await getTweets();
      setData(data);
    } catch (error) {
      setError(error.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit({ content, location, file }) {
    try {
      setLoading(true);
      setError('');
      
      const form_data = new FormData();
      form_data.append('content', content);
      form_data.append('location', location);
      form_data.append('file', file);

      await createTweet(form_data);
      load();
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
          {error && <Alert variant="danger">{error}</Alert>}
          {user?.username && <NewTweet onSubmit={onSubmit} />}
          {loading && <Spinner animation="border" />}
          {data.map(function (tweet) {
            return (
              <Tweet
                key={tweet.id}
                content={tweet.content}
                location={tweet.location}
                user={tweet.user}
                createdAt={tweet.createdAt}
                likes={tweet.likes}
                photo={tweet.photo}
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
