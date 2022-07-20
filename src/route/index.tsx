import { useRoutes } from 'react-router-dom'
import Search from '@/pages/Search';
import Content from '@/components/Content'

type Props = {};

const RouteView: React.FC<Props> = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <Search />
    },
    {
      path: '/search',
      element: <Search />
    }
  ])
  return element
};

export default RouteView;