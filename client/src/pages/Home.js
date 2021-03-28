import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../Components/PostCard';
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
        <h1>Recent Posts</h1>
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
                    src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                  />
                  <Card.Header>{post.username}</Card.Header>
                  <Card.Meta as={Link} to={`/posts/${post.id}`}>{moment(post.createdAt).fromNow(true)}</Card.Meta>
                  <Card.Description>
                  {post.body}
                  </Card.Description>
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