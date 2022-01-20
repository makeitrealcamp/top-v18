import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import Tweet from "../components/Tweet";
// import useTweets from '../hooks/useTweets';
import { createTweet, getTweets } from "../api/tweets";
import NewTweet from "../components/NewTweet";

import { useSelector } from "../store/Store";

export default function Home() {
  // const { data = [], error = '', loading = false } = useTweets();
  const user = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    try {
      setLoading(true);
      setError("");
      const response = await getTweets();
      setData(response.data);
    } catch (err) {
      setError(err.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async ({ content, location, file }) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("content", content);
      formData.append("location", location);
      formData.append("file", file);

      await createTweet(formData);
      load();
    } catch (err) {
      setError(error.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col lg={6}>
          {error && <Alert variant="danger">{error}</Alert>}
          {user?.username && <NewTweet onSubmit={onSubmit} />}
          {loading && <Spinner animation="border" />}
          {data.map((tweet) => {
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
