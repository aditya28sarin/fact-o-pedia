import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../Components/PostCard';
import {Card,Icon,Label, Image, Button} from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';
import PostForm from '../Components/PostForm';


function Home() {
  const {user} = useContext(AuthContext);
  const {loading, error, data} = useQuery(FETCH_POSTS_QUERY);

  function likePost(){
    console.log('like post');
  }

  function commentOnPost(){
    console.log('comment post');
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
          data.getPosts.length>0 &&
          data.getPosts.map((post) => (
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
                  <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='red' basic >
                      <Icon name='like' />
                      Like
                    </Button>
                    <Label as='a' basic color='red' pointing='left'>
                      {post.likeCount}
                    </Label>
                  </Button>
                  <Button as='div' labelPosition='right' onClick={commentOnPost}>
                    <Button color='blue' basic >
                      <Icon name='comments' />
                      Comments
                    </Button>
                    <Label as='a' basic color='blue' pointing='left'>
                      {post.commentCount}
                    </Label>
                  </Button>
                </Card.Content>
            </Card>
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POSTS_QUERY = gql`
   {
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