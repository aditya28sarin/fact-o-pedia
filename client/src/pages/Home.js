import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import {Card,Icon,Label, Image, Button, Grid, Transition} from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import PostForm from '../Components/PostForm';
import LikeButton from '../Components/LikeButton';
import DeleteButton from '../Components/DeleteButton';

function Home() {
  const {user} = useContext(AuthContext);
  const {loading, error, data : {getPosts:posts}={}} = useQuery(FETCH_POSTS_QUERY);

  function likePost(){
    console.log('like post');
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1 className="main-heading">Fact-O-Pedia</h1>
        <h5 className="main-subheading">One Stop Destination For Ashtonishing Facts!</h5>
      </Grid.Row>
      <Grid.Row>
      {
        user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          posts.length>0 &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <Card fluid>
                <Card.Content>
                  <Image
                    floated='right'
                    size='mini'
                    src='data:image/png;base64,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'
                  />
                  <div className="name"><Card.Header >{post.username}</Card.Header></div>
                  <Card.Meta as={Link} to={`/posts/${post.id}`}>{moment(post.createdAt).fromNow(true)}</Card.Meta>
                  <div className="text"><Card.Description>
                  {post.body}
                  </Card.Description></div>
                </Card.Content>
                <Card.Content extra>
                  <LikeButton user={user} post={post} />
                  <Button as='div' labelPosition='right' as={Link} to={`/posts/${post.id}`}>
                    <Button color='blue' basic >
                      <Icon name='comment' />
                      
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                      {post.commentCount}
                    </Label>
                  </Button>
                  {user && user.username === post.username && <DeleteButton postId={post.id} />}
                </Card.Content>
            </Card>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
        getPosts {
        id
        body
        createdAt
        username
        likeCount
        commentCount
        comments{
          createdAt
        }
        likes{
          createdAt
        }
      }
    
    }
`;

export default Home;