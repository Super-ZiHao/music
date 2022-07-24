import { AudioListenerUpdate } from '@/types/enum'
import useAudio from '@/utils/hooks/useAudio'
import Icon from '@ant-design/icons'
import { IconMute, IconVolume } from '../Icons'

type Props = {}

const VolumeController: React.FC<Props> = () => {
  const { changeAudioMuted, muted } = useAudio(AudioListenerUpdate.VOLUME)
  return (
    <div className='musicPlayer-volumeController mr-24 cp flex column items-center relative' onClick={changeAudioMuted}>
      <div className='volumeController absolute color-white radius-8 flex justify-center pt-6 pb-6'>
        <div className='h-full bg-white radius-2' style={{ width: 4 }}></div>
      </div>
      <Icon className='icon' component={muted ? IconMute : IconVolume} style={{ width: 32, height: 32, color: 'var(--color-white)' }} />
    </div>
  )
}

export default VolumeController
