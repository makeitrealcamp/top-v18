import React from 'react';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import Tweet from '../components/Tweet';
import useTweets from '../hooks/useTweets';
import NewTweet from '../components/NewTweet';

import { useSelector } from '../store/Store';

export default function Home() {
  const user = useSelector((state) => state.user);

  const {
    data = [],
    error = '',
    loading = false,
    actions: { create },
  } = useTweets();

  async function onSubmit({ content, location }) {
    await create({ content, location });
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          {user?.username && <NewTweet onSubmit={onSubmit} />}
          {error && <Alert variant="danger">{error}</Alert>}
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
              />
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
