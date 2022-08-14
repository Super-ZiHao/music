import {lazy, Suspense} from 'react'
import { useRoutes } from 'react-router-dom'

const Search = lazy(() => import('@/pages/Search'))
const Play = lazy(() => import('@/pages/Play'))
const RankingList = lazy(() => import('@/pages/RankingList'))

type Props = {};

const RouteView: React.FC<Props> = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Play />,
      // element: <Navigate to='/ranking-list' />
    },
    {
      path: '/search',
      element: <Search />
    },
    {
      path: '/ranking-list',
      element: <RankingList />
    }
  ])
  return (
    <Suspense fallback={<div>加载路由</div>}>
      {element}
    </Suspense>
  )
};

export default RouteView;