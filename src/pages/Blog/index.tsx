import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Table, Button } from 'antd'
import { IStore } from '../../interfaces'
import { actions } from './store'
import { getColumns, pageName, IPageStore } from './constants'
import EditModal from './EditModal'
import { get } from 'lodash'
import { getTableHandlers, getPaginationOptions } from '../../utils/helpers'

function Page(props: RouteComponentProps & IPageStore & DispatchProp) {
  const [handlers, setHandlers] = React.useState<any>({})
  const [sortedInfo, setSortedInfo] = React.useState<any>({})

  React.useEffect(() => {
    props.dispatch(actions.getList())
    setHandlers(getTableHandlers(props, actions, pageName, setSortedInfo))

    return () => {
      props.dispatch(actions.reset())
    }
  }, [])

  function add() {
    props.history.push('/add')
  }

  return (
    <React.Fragment>
      <Button
        onClick={add}
        style={{ margin: 16 }}
        icon="plus"
      />
    </React.Fragment>
  )
}

const mapState2Props = (state: IStore) => ({ ...state[pageName] })

export default withRouter(
  connect<IPageStore, any, any, IStore>(mapState2Props)(Page)
)
