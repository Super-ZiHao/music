import { StoreInterface } from "@/store"
import { getAllRankingList, RankingListInterface } from "@/store/rankingListSlice"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

type Props = {

}

const RankingList: React.FC<Props> = () => {
  const dispath = useDispatch()
  const rankingList = useSelector<StoreInterface, RankingListInterface>((store) => store.rankingList)
  // 获取榜单
  useEffect(() => {
    if (rankingList.rankingList.length > 0) return
    dispath(getAllRankingList() as any)
  }, [])
  return (
    <div className="grid ranking-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
      <div className="left">
        <div className="fs-24 fw-bold color-white-transparent">网易云特色榜</div>
        <ul className="grid ranking-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <li className="item">
            <div>飙升榜</div>
            <span>飙升榜</span>
          </li>
          <li className="item">
            <div>新格榜</div>
            <span>新格榜</span>
          </li>
          <li className="item">
            <div>原创榜</div>
            <span>原创榜</span>
          </li>
          <li className="item">
            <div>热歌榜</div>
            <span>热歌榜</span>
          </li>
        </ul>
      </div>
      <div className="right">
        <div>正在努力查找歌曲</div>
      </div>
    </div>
  )
}

export default RankingList