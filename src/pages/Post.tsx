import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Input, Card, Icon, Comment, List, Tooltip } from 'antd'
import { getPost, IPost, removePost, editPost, IComment } from '../utils/dataProvider'

function Page(props: RouteComponentProps) {
  const [post, setPost] = React.useState<IPost>({
    title: '',
    desc: '',
    fullDesc: ''
  })
  const [author, setAuthor] = React.useState<string>('')
  const [content, setContent] = React.useState<string>('')

  React.useEffect(() => {
    setPost(getPost(props.match.params['id']))
  }, [])

  function remove() {
    removePost(post.id as number)
    props.history.push('/blog')
  }

  function edit() {
    props.history.push(`/edit/${post.id}`)
  }

  function addComment() {
    editPost({
      ...post,
      comments: [...(post.comments || []), { author, content }]
    })
    setPost(getPost(props.match.params['id']))
    setAuthor('')
    setContent('')
  }

  function removeComment(comment: IComment) {
    const idx = post.comments!.indexOf(comment);
    post.comments!.splice(idx, 1)
    editPost(post)
    setPost(getPost(props.match.params['id']))
  }

  return (
    <React.Fragment>
      <Button onClick={() => props.history.goBack()} icon="arrow-left" />
      <Card
        style={{ marginTop: 16 }}
        title={post.title}
        actions={[
          <Icon type="edit" key="edit" onClick={edit} />,
          <Icon type="delete" key="ellipsis" onClick={remove} />
        ]}
      >
        <Card.Meta title={post.desc} description={post.fullDesc} />
      </Card>

      <List
        dataSource={post.comments}
        header={'Комментарии'}
        itemLayout="horizontal"
        renderItem={(props: any) => (
          <Comment
            {...props}
            actions={[
              <Tooltip title="Удалить">
                <Icon type="delete" onClick={()=>removeComment(props)}/>
              </Tooltip>
            ]}
          />
        )}
      />

      <Comment
        content={
          <div>
            <Input
              value={author}
              onChange={e => setAuthor(e.target.value)}
              placeholder="Автор"
            />
            <Input.TextArea
              placeholder="Комментарий"
              rows={4}
              onChange={e => setContent(e.target.value)}
              value={content}
              style={{ marginTop: 16 }}
            />
            <Button
              onClick={addComment}
              type="primary"
              style={{ marginTop: 16 }}
            >
              Добавить комментарий
            </Button>
          </div>
        }
      />
    </React.Fragment>
  )
}

export default withRouter(Page)
