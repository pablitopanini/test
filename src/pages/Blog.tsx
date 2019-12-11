import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Pagination, Card, Row, Col, Icon } from 'antd'
import { getPosts, IPost, getPostsCount } from '../utils/dataProvider'

function Page(props: RouteComponentProps) {
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
    setPosts(getPosts())
  }, [])

  function add() {
    props.history.push('/add')
  }

  function handlePaginationChange(current: number, pageSize: number) {
    setPosts(getPosts(current, pageSize))
  }

  const open = (post: IPost) => () => {
    props.history.push(`/post/${post.id}`)
  }

  return (
    <React.Fragment>
      <Row type="flex" justify="space-between">
        <Col span={4}>
          <Button onClick={add} icon="plus" />
        </Col>
        <Col>
          <Pagination
            showSizeChanger
            onShowSizeChange={handlePaginationChange}
            onChange={handlePaginationChange}
            total={getPostsCount()}
            showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
          />
        </Col>
      </Row>

      {posts.map((post: IPost) => (
        <Card
          key={post.id}
          style={{ marginTop: 16 }}
          title={post.title}
          extra={<Icon type="ellipsis" key="ellipsis" onClick={open(post)} />}
        >
          <Card.Meta description={`${post.desc} (${post.comments ? post.comments.length : 0} комментари(я, ев))`} />
        </Card>
      ))}
    </React.Fragment>
  )
}

export default withRouter(Page)
