import { StoreInterface } from "@/store"
import { getAllRankingList, getSongSheetDetail, RankingListInterface } from "@/store/rankingListSlice"
import { Empty, Skeleton, Spin } from "antd"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {

}

const RankingList: React.FC<Props> = () => {
  const dispath = useDispatch()
  const rankingList = useSelector<StoreInterface, RankingListInterface>((store) => store.rankingList)
  const [active, setActive] = useState<number>(-1);
  const [selectedSongSheetDetail, setSelectedSongSheetDetail] = useState<number>(-1);
  // 获取榜单
  useLayoutEffect(() => {
    if (rankingList.rankingList.length > 0) return 
    dispath(getAllRankingList() as any)
  }, [])
  // loading
  if (rankingList.rankingList.length === 0) {
    return <div className="grid ranking-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
    <div className="left">
      <Skeleton.Button className="ml-6" style={{ width: 148, height: 37.7 }} active />
      <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <Skeleton.Button style={{ width: '100%', paddingTop: '100%', borderRadius: 12 }} active />
        <Skeleton.Button style={{ width: '100%', paddingTop: '100%', borderRadius: 12 }} active />
        <Skeleton.Button style={{ width: '100%', paddingTop: '100%', borderRadius: 12 }} active />
        <Skeleton.Button style={{ width: '100%', paddingTop: '100%', borderRadius: 12 }} active />
      </ul>
    </div>
    <div className="right" style={{
      // @ts-ignore
      '--skeleton-width': '100%'
    }}>
      <Skeleton.Input style={{ width: '100%', height: 40 }} active />
    </div>
  </div>
  }
  return (
    <div className="grid ranking-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="left">
        {/* 特色 */}
        <div className="fs-24 fw-bold color-white-transparent ml-12">网易云特色榜</div>
        <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {rankingList.rankingList.filter((item, index) => index < 4).map((item, index) => (
            <li
              key={item.id}
              className={`card hover radius-12 ${active === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.coverImgUrl})` }}
              onClick={() => {
                setActive(index)
                setSelectedSongSheetDetail(item.id)
                if (rankingList.rankingListData[item.id]) return
                dispath(getSongSheetDetail(item.id) as any)
              }}
            />
          ))}
        </ul>
      </div>
      <div className="right">
        <div className="title p-8 color-white-transparent sticky" style={{ top: 0 }}>
          {
            active !== -1 ? (
              <div className="mb-12">
                <div className="flex">
                  <div
                    className="card radius-6 flex-shrink"
                    style={{
                      width: '96px',
                      height: '96px',
                      backgroundImage: `url(${rankingList.rankingList[active].coverImgUrl})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <div className="ml-16">
                    <div className="fs-18 fw-bold">{rankingList.rankingList[active].name}</div>
                    <div>By ~ {sessionStorage.getItem('MusicSource')}</div>
                    <div>{rankingList.rankingList[active].desc}</div>
                  </div>
                </div>
              </div>
            ) : <div className="flex justify-center">点击左侧歌单集，查看所需要的歌单一😁</div>
          }
        </div>
        {!rankingList.rankingListData[selectedSongSheetDetail] && (
          <div className="flex items-center justify-center w-full" style={{ marginTop: 140 }}>
            {
              active === -1 ? (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无歌单内容" style={{ color: 'var(--color-white)' }} />
              ) : (
                <Spin spinning size='large' tip='阿豪正在努力为您找寻歌曲😁' style={{ color: 'var(--color-white)' }} />
              )
            }
          </div>
        )}
        <ul className="mt-12 pl-6 pr-8">
          {
            rankingList.rankingListData[selectedSongSheetDetail]?.map((item, index) => (
              <div
                key={index}
                className="ranking-right-item flex items-center color-white-transparent-2 cp"
                style={{
                  borderTop: index > 0 ? '1px solid rgba(255, 255, 255, .3)' : '',
                  marginTop: index > 0 ? 6 : ''
                }}
                onDoubleClick={() => {
                  console.log(item)
                }}
              >
                <div className="fs-24 fw-bold ml-12">{index + 1}</div>
                <div
                  className="ml-8 mr-8 radius-4"
                  style={{
                    width: 44,
                    height: 44,
                    backgroundImage: `url(${item.coverUrl})`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center'
                  }} />
                <div>
                  <div>{item.musicName}</div>
                  <div>{item.singerName}</div>
                </div>
              </div>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default RankingList