import React, { Component } from 'react'
import * as api from '../../api'
import Spinner from '../Spinner'
import './UserPosts.css'

class UserPosts extends Component {
  state = {
    isLoading: true,
    posts: []
  }

  async componentDidMount() {
    const posts = await api.getUserPosts(this.props.id)
    this.setState({
      isLoading: false,
      posts
    })
  }

  render() {
    const { isLoading, posts } = this.state

    return (
      <div className="user-posts">
        {isLoading ? (
          <Spinner centered={false} />
        ) : (
          <>
            <h3 className="posts-label">Posts</h3>
            <p className="posts-value">{posts.length}</p>
          </>
        )}
      </div>
    )
  }
}

export default UserPosts
