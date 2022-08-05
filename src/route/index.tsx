import { Navigate, useRoutes } from 'react-router-dom'
import Search from '@/pages/Search';
import Content from '@/components/Content'
import Play from '@/pages/Play';
import RankingList from '@/pages/RankingList';

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
  return element
};

export default RouteView;