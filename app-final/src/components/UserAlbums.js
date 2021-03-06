import React from 'react'
import { unstable_createResource as createResource } from 'react-cache'
import { getUserAlbums } from 'api'

const albumsResource = createResource(id => getUserAlbums(id))

const UserAlbums = ({ id }) => (
  <div className="user-detail">
    <h3 className="user-detail-label">Albums</h3>
    <p className="user-detail-value">{albumsResource.read(id).length}</p>
  </div>
)

export default UserAlbums
