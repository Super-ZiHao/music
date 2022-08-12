import Icon from '@ant-design/icons'
import { IconList2 } from '../Icons';

type Props = {

}

const SongList: React.FC<Props> = (props) => {
  const { } = props;
  return (
    <>
      <div></div>
      <Icon style={{ color: '#a1a8a2', width: 24, height: 24 }} component={IconList2} onClick={() => console.log('歌曲列表')} />
    </>
  )
}

export default SongList