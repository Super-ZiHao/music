import Header from './components/Header'
import Menu from './components/Menu'

function App() {
  return (
    <div className='App  shell'>
      <div className='flex' style={{ height: 'calc(100% - 68px)' }}>
        <Menu />
        <div className='flex-1'>
          <Header />
        </div>
      </div>
      {/* 播放器 */}
      <div className='w-full' style={{ height: 68 }}></div>
    </div>
  )
}

export default App
