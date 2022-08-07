import { StoreInterface } from "@/store"
import { getAllRankingList, RankingListInterface } from "@/store/rankingListSlice"
import { getSongSheetDetailApi } from "@/utils/request/api"
import { useEffect, useState } from "react"
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
  useEffect(() => {
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
              className={`item ${active === index ? 'active' : ''}`}
              style={{ backgroundImage: `url(${item.coverImgUrl})` }}
              onClick={() => {
                setActive(index)
                // getSongSheetDetail(item.id)
              }}
            >
              <div>{ item.name }</div>
            </li>
          ))}
        </ul>
        {/* 其他 */}
        {/* <div className="fs-24 fw-bold color-white-transparent">其他</div>
        <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {rankingList.rankingList.filter((item, index) => index >= 4).map(item => (
            <li className="item" onClick={() => getSongSheetDetail(item.id)} key={item.id}>
              <div>{ item.name }</div>
              <span>{ item.name }</span>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="right">
        <div>正在努力查找歌曲</div>
      </div>
    </div>
  )
}

export default RankingList