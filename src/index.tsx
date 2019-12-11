import * as React from 'react'
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom'
import { render } from 'react-dom'
import 'react-app-polyfill/ie11'
import { LocaleProvider, Layout } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
import './style.css'

render(
  <BrowserRouter>
    <LocaleProvider locale={ruRU}>
      <Layout>
        <Layout.Header>
          <div className="logo">Mini BLOG</div>
        </Layout.Header>
        <Layout>
          <Layout.Content
            style={{
              height: '100vh',
              backgroundColor: 'white',
              borderBottom: '1px solid #e8e8e8',
              padding: 16
            }}
          >
            <Routes />
          </Layout.Content>
        </Layout>

        <Layout.Footer
          style={{ textAlign: 'center', backgroundColor: 'white' }}
        >
          {`🐕& 🦊©${new Date().getFullYear()}`}
        </Layout.Footer>
      </Layout>
    </LocaleProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
