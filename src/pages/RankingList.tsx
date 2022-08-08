import { StoreInterface } from "@/store"
import { getAllRankingList, RankingListInterface } from "@/store/rankingListSlice"
import { getSongSheetDetailApi } from "@/utils/request/api"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {

}

const RankingList: React.FC<Props> = () => {
  const dispath = useDispatch()
  const rankingList = useSelector<StoreInterface, RankingListInterface>((store) => store.rankingList)
  const [active, setActive] = useState<number>(-1);
  // 获取榜单详情歌曲
  const getSongSheetDetail = async (id: number) => {
    const res = await getSongSheetDetailApi(id)
  }
  
  // 获取榜单
  useLayoutEffect(() => {
    if (rankingList.rankingList.length > 0) return
    dispath(getAllRankingList() as any)
  }, [])
  return (
    <div className="grid ranking-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="left">
        {/* 特色 */}
        <div className="fs-24 fw-bold color-white-transparent">网易云特色榜</div>
        <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {rankingList.rankingList.filter((item, index) => index < 4).map((item, index) => (
            <li
              key={item.id}
              className={`card hover radius-12 ${active === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.coverImgUrl})` }}
              onClick={() => {
                setActive(index)
                // getSongSheetDetail(item.id)
              }}
            >
            </li>
          ))}
        </ul>
        {/* 其他 */}
        {/* <div className="fs-24 fw-bold color-white-transparent">其他</div> */}
        {/* <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {rankingList.rankingList.filter((item, index) => index >= 4).map(item => (
            <li
              className="item"
              style={{ backgroundImage: `url(${item.coverImgUrl})` }}
              // onClick={() => getSongSheetDetail(item.id)} key={item.id}
            >
            </li>
          ))}
        </ul> */}
      </div>
      <div className="right">
        <div className="title p-8 color-white-transparent">
          {
            active !== -1 && (
              <div className="mb-8">
                <div className="flex">
                  <div
                    className="card radius-6 flex-shrink"
                    style={{
                      width: '96px',
                      height: '96px',
                      backgroundImage: `url(${rankingList.rankingList[active].coverImgUrl})`,
                      backgroundSize: '100% 100%',
                    }}
                  />
                  <div className="flex column justify-between ml-24">
                    <div className="fs-18 fw-bold">{rankingList.rankingList[active].name}</div>
                    <div>By ~ {sessionStorage.getItem('MusicSource')}</div>
                    <div>{rankingList.rankingList[active].desc}</div>
                  </div>
                </div>
              </div>
            )
          }
          <div className="fs-16">正在努力查找歌曲</div>
        </div>
        <ul>
          <li>1123123123</li>
        </ul>
      </div>
    </div>
  )
}

export default RankingList