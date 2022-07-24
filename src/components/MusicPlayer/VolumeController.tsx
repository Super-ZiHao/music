import { AudioListenerUpdate } from '@/types/enum'
import useAudio from '@/utils/hooks/useAudio'
import Icon from '@ant-design/icons'
import { Slider } from 'antd'
import { IconMute, IconVolume } from '../Icons'

type Props = {}

const VolumeController: React.FC<Props> = () => {
  const { changeAudioMuted, muted, volume, changeAudioVolume, audio } = useAudio(AudioListenerUpdate.VOLUME)
  return (
    <div className='musicPlayer-volumeController mr-24 cp flex column items-center relative'>
      <div className='volumeController absolute color-white radius-8 flex justify-center pt-10 pb-10'>
        <Slider vertical defaultValue={audio?.volume * 100 || 100} value={volume} onChange={changeAudioVolume} />
      </div>
      <Icon
        className='icon'
        style={{ width: 32, height: 32, color: 'var(--color-white)' }}
        component={muted ? IconMute : IconVolume}
        onClick={changeAudioMuted}
      />
    </div>
  )
}

export default VolumeController
