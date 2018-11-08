import React, { Component } from 'react'
import * as api from 'api'
import Spinner from 'components/Spinner'

class Post extends Component {
  state = {
    authorIsLoading: true,
    author: {},
    commentsIsLoading: true,
    comments: [],
  }

  async componentDidMount() {
    const { post } = this.props
    const [author, comments] = await Promise.all([
      api.getUser(post.userId),
      api.getComments(post.id),
    ])
    this.setState({
      authorIsLoading: false,
      author,
      commentsIsLoading: false,
      comments,
    })
  }

  render() {
    const { authorIsLoading, author, commentsIsLoading, comments } = this.state
    const { post, ...props } = this.props

    return (
      <div className="post" {...props}>
        <div className="post-header">
          <h2 className="post-title">{post.title}</h2>
          <div className="author-info">
            {authorIsLoading ? (
              <Spinner size="40px" />
            ) : (
              <>
                <img
                  src={author.avatarHd}
                  alt="Author avatar"
                  className="author-avatar"
                />
                <h3 className="author-name">{author.name}</h3>
              </>
            )}
          </div>
        </div>
        <p className="post-body">{post.body}</p>
        <div className="post-details">
          {commentsIsLoading ? (
            <Spinner size="32px" />
          ) : (
            <p className="post-detail">{comments.length} Comments</p>
          )}
        </div>
      </div>
    )
  }
}

export default Post
