import { useRoutes } from 'react-router-dom'
import Search from '@/pages/Search';
import Content from '@/components/Content'
import MusicPlay from '@/pages/Play';

type Props = {};

const RouteView: React.FC<Props> = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <MusicPlay />
    },
    {
      path: '/search',
      element: <Search />
    }
  ])
  return element
};

export default RouteView;