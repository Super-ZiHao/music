import { MusicType } from '@/types/type';
import { getTotalDuration } from '@/utils/function/time';
import Icon from '@ant-design/icons'
import { Popover } from 'antd';
import { IconList2 } from '../Icons';

type ListProps = {
  data: MusicType[]
}
const ListComponent: React.FC<ListProps> = ({ data }) => {
  return (
    <ul>
      {data.map(item => <li className='flex items-cenrer no-wrap color-white-transparent gap-14'>
        <div className='ellipsis' style={{ width: 160 }}>{item.musicName}</div>
        <div className='ellipsis' style={{ width: 80 }}>{item.singerName}</div>
        <div className='ellipsis flex justify-end' style={{ width: 100 }}>{getTotalDuration(item.duration)}</div>
      </li>)}
    </ul>
  )
}

type Props = {
  data: MusicType[]
}

const SongList: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <Popover content={<ListComponent data={data} />} placement="topRight" trigger='click' style={{ maxHeight: 400 }}>
      <Icon style={{ color: '#a1a8a2', width: 24, height: 24 }} component={IconList2} />
    </Popover>
  )
}

export default SongList