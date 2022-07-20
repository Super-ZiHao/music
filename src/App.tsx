import { BrowserRouter } from 'react-router-dom'
import Content from './components/Content'
import Header from './components/Header'
import Menu from './components/Menu'
import RouteView from './route'

function App() {
  return (
    <div className='App shell'>
      <div className='flex' style={{ height: 'calc(100% - 68px)' }}>
        <Menu />
        <div className='flex-1 flex column pl-16 pr-16'>
          <Header />
          <BrowserRouter>
            <RouteView />
          </BrowserRouter>
        </div>
      </div>
      {/* 播放器 */}
      <div className='w-full' style={{ height: 68 }}></div>
    </div>
  )
}

export default App
