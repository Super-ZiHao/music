import { AudioListenerUpdate } from '@/types/enum'
import { getTotalDuration2 } from '@/utils/function/time'
import useAudio from '@/utils/hooks/useAudio'

type Props = {}

const Time: React.FC<Props> = () => {
  const { currentDuration, duration } = useAudio(AudioListenerUpdate.TIME)
  return (
    <div style={{ color: 'var(--color-white)' }}>
      <div>{getTotalDuration2(currentDuration)}</div>
      <div>{getTotalDuration2(duration)}</div>
    </div>
  )
}

export default Time
