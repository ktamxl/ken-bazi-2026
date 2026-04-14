import { useState } from 'react'
import './App.css'

const PERSON = {
  name: '譚國偉',
  english: 'Ken Tam',
  bazi: '癸卯｜戊午｜庚子｜庚辰',
  gender: 'male',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  age: 63,
  direction: '北向',
}

const MONTHS = [
  {
    month: '正月',
    lunar: '正月十三',
    date: '2026-01-29 – 2026-02-26',
    stem: '辛丑',
    element: '金',
    mood: '沉穩鞏固',
    color: 'from-gray-600 to-gray-800',
    bgCard: 'bg-gray-50',
    border: 'border-gray-300',
    emoji: '🛡️',
    overall: '身體注意保暖關節，手脚容易冰冷。晚上熱水泡脚可提升運勢。',
    career: '工作穏打穏紮，勿冒險投資或作重大决定。已有計畫按進度推進即可。',
    health: '舊患注意，康復期的身體需要耐心。運動適量為佳。',
    wealth: '正財為主，正職收入是重點。横財機會低，避開投機。',
    love: '單身者：機會在熟悉的社交圈，勿急於一時。已有伴侶：穏定相處。',
    flow: '累積期 — 不是衝刺月，是打底月。',
    advice: '「等待」。機會在後面，先把手上事情做好。',
    warning: '預防流感，增添衣物。',
    lucky: ['白、銀、灰', '金屬飾物', '政府大樓'],
    unLucky: ['波鞋', '塑膠製品', '嘈雜場所'],
    stemDesc: '辛金助庚金，比劫相扶持。丑月濕寒，身體注意保暖。',
    yangDesc: '丑土為濕土，助戊土用神，脾胃需要注意。',
  },
  {
    month: '二月',
    lunar: '二月十二',
    date: '2026-02-27 – 2026-03-28',
    stem: '壬寅',
    element: '水',
    mood: '波動不安',
    color: 'from-blue-600 to-blue-800',
    bgCard: 'bg-blue-50',
    border: 'border-blue-200',
    emoji: '🌊',
    overall: '情感波動大，尤其二月廿七前。父親身體是重點關注。思緒較敏感。',
    career: '工作有突發情况需要靈活應對。壬水冲開思路，創作人有亮點。',
    health: '精神壓力大，需要主動減壓。肝胆需要注意。',
    wealth: '有意外支出，提前做好財務準備。',
    love: '單身者：舊人运更強。已有伴侶：多溝通化解誤解。',
    flow: '動盪期 — 事情會自己找上門，保持冷靜應對。',
    advice: '「冷静」。慌張只會引來更多問題。',
    warning: '⚠️ 父親身體突變就醫的信號月。見微知著，及早處理。',
    lucky: ['黑、藍、湖綠', '水流場所', '圖書館'],
    unLucky: ['火鍋', '烤肉', '争執場合'],
    stemDesc: '壬水為喜神透出，但沖提防戊土。思緒靈活但有干擾。',
    yangDesc: '寅月木旺，寅卯辰三會木局。大樹根系穩固，但内部有震動。',
  },
  {
    month: '三月',
    lunar: '三月十一',
    date: '2026-03-29 – 2026-04-26',
    stem: '癸卯',
    element: '水',
    mood: '情感高漲·哀傷降臨',
    color: 'from-indigo-600 to-indigo-900',
    bgCard: 'bg-indigo-50',
    border: 'border-indigo-300',
    emoji: '🌧️',
    overall: '三月是最重要的情感重整月。悲傷來襲，但同時也是清理創傷、重新出發的起點。',
    career: '工作稍停不是逃避，是必要的沉澱。勿在情緒高漲時作重大决定。',
    health: '睡眠問題出現，允許自己休息。悲傷是正常的，不需要强撑。',
    wealth: '花費在所難免，尤其葬禮相關。屬正常開支。',
    love: '單身者：勿在此時開始新戀情。已有伴侶：互相支持度過難關。',
    flow: '哀傷淨化期 — 不要趕走悲傷，讓它流動後離開。',
    advice: '「釋放」。眼淚是心靈的清洗剂，哭完才能重新開始。',
    warning: '⚠️ 父親最艱難的月份，或有突發情况。三月十一（庚午日）最需要注意。',
    lucky: ['深藍、墨綠', '宗教場所', '安静的公園'],
    unLucky: ['大排擋', '派對', '高噪音地區'],
    stemDesc: '癸水透出為喜神，但卯子相刑。情感豐富，容易觸景生情。',
    yangDesc: '卯月桃花，情感最強烈。與日支子水相刑，情緒波動是正常的。',
  },
  {
    month: '四月',
    lunar: '四月初十',
    date: '2026-04-27 – 2026-05-25',
    stem: '甲辰',
    element: '木',
    mood: '逐步回穩',
    color: 'from-green-600 to-green-800',
    bgCard: 'bg-green-50',
    border: 'border-green-300',
    emoji: '🌿',
    overall: '走出最難的時期，心情明顯好轉。甲木生火，開始有做事的動力。',
    career: '有新想法出現，思考未來方向。適合計劃，不適合立刻行動。',
    health: '身體開始恢復，精神好轉。春季户外的活動有益身心。',
    wealth: '四月財運低，暫緩大額消費或投資。但收入穩定。',
    love: '單身者：開始有心思認識新人，但不必着急。',
    flow: '康復期 — 心情好轉，但體力恢復需要時間。',
    advice: '「耐心」。康復不是直線向上的，是進兩步退一步。',
    warning: '仍要留意父親康復情况，不能掉以輕心。',
    lucky: ['青、翠綠', '植物園', '書店'],
    unLucky: ['工廠噪音', '金屬碰撞聲', '潮濕地下室'],
    stemDesc: '甲木透出，生丙火忌神。工作開始忙碌，壓力慢慢回來。',
    yangDesc: '辰月濕土，助子水局。水旺之餘，木氣開始生發。',
  },
  {
    month: '五月',
    lunar: '五月初九',
    date: '2026-05-26 – 2026-06-23',
    stem: '乙巳',
    element: '木',
    mood: '壓力再現',
    color: 'from-emerald-600 to-emerald-800',
    bgCard: 'bg-emerald-50',
    border: 'border-emerald-300',
    emoji: '🌱',
    overall: '工作壓力明顯增加，乙木生火剋庚金。上半年的第二個挑戰月。',
    career: '有來自上司或環境的壓力。保持低調和耐心，等待時機。',
    health: '心臟和血壓要留意。避免强烈運動和情緒激動。',
    wealth: '正財穩定，但花費不小。小心處理金錢糾紛。',
    love: '單身者：辦公室戀情有可能。已有伴侶：勿比較，珍惜眼前人。',
    flow: '磨練期 — 繼續低調做事，不要强出頭。',
    advice: '「忍」。形勢不利的時候，不進則退是最聰明的策略。',
    warning: '心臟、血壓警訊月。避免咖啡過量、熬夜和情緒激動。',
    lucky: ['淺綠、粉綠', '茶室', '藝術展'],
    unLucky: ['火鍋店', '争吵', '塑料包裝'],
    stemDesc: '乙木生巳火，剋庚金。壓力來的時候要「文火」，不要加大火力。',
    yangDesc: '巳月火旺，驛馬在亥申。出行要注意安全。',
  },
  {
    month: '六月',
    lunar: '六月初八',
    date: '2026-06-24 – 2026-07-22',
    stem: '丙午',
    element: '火',
    mood: '高壓月份⚠️',
    color: 'from-red-600 to-red-800',
    bgCard: 'bg-red-50',
    border: 'border-red-300',
    emoji: '🔥',
    overall: '⚠️ 全年最高壓月。丙午疊冲月支，提防突發事件。心血管要注意。',
    career: '工作高峯但也是最緊張的時期。勿在此月作重大决定或跳槽。',
    health: '🔴 心臟、血壓高危月！避免過劳、激動、油膩飲食。',
    wealth: '支出大，尤其健康相關。避免與人合夥投資。',
    love: '單身者：有機會但短暫。已有伴侶：小心中年危機心態。',
    flow: '高壓月 — 不是放棄的時候，是撑住的時候。撑過了就是你的。',
    advice: '「撑住」。文火煉金，慢一點不要緊，最重要是不熄滅。',
    warning: '🔴 最高危月。心血管爆發、工作壓力頂峯、情緒臨界。三個健康警訊同時出現。緊急就醫，千萬不要撑。',
    lucky: ['白、浅灰', '冷氣房', '安静的圖書館'],
    unLucky: ['火、炒菜', '太陽下曝曬', '激烈運動'],
    stemDesc: '丙火忌神旺透，庚金受剋。雙丙争合年干癸水，外環境干擾大。',
    yangDesc: '午月火旺，壬水喜神被蒸發。血壓容易升高，必須主動降壓。',
  },
  {
    month: '七月',
    lunar: '七月初七',
    date: '2026-07-23 – 2026-08-20',
    stem: '丁未',
    element: '火',
    mood: '高溫持續',
    color: 'from-orange-600 to-orange-800',
    bgCard: 'bg-orange-50',
    border: 'border-orange-300',
    emoji: '☀️',
    overall: '壓力稍微回落但仍然偏高。丁火合年干癸水，情感内心波動。',
    career: '工作強度仍然高，但不如六月。最艱難的時候即將過去。',
    health: '血壓、血脂注意。继续清淡飲食，多休息。',
    wealth: '理財有機會出現轉機，但需要冷靜評估。',
    love: '單身者：暗戀或有驚喜。已有伴侶：多關心對方感受。',
    flow: '缓冲月 — 最難的已過，但身體和精神仍在恢復中。',
    advice: '「降温」。主動降温，身體和情緒都需要。',
    warning: '丁火旺，心臟注意。未月濕土，腸胃容易出事。',
    lucky: ['粉橙、淡黃', '室内運動', '咖啡店'],
    unLucky: ['火锅、烧烤', '曝曬', '人多擠迫地方'],
    stemDesc: '丁火合化為火，癸水被絆住。内心有很多複雜情緒，需要出口。',
    yangDesc: '未月濕土，燥土不生金反而脆金。脾胃需要特別注意。',
  },
  {
    month: '八月',
    lunar: '七月初七',
    date: '2026-08-21 – 2026-09-18',
    stem: '戊申',
    element: '土',
    mood: '用神到位·好運回升',
    color: 'from-amber-600 to-amber-800',
    bgCard: 'bg-amber-50',
    border: 'border-amber-400',
    emoji: '🌾',
    overall: '⭐ 重大轉折月！戊土用神透出，運勢明顯好轉。所有不利開始消退。',
    career: '事業出現轉機，有貴人出現幫助。適合重新出發。',
    health: '身體明顯好轉，精神和體力都在恢復。',
    wealth: '財運上升，正財和意外財都有。理財有利。',
    love: '單身者：遇到新人的機會高。已有伴侶：感情升溫。',
    flow: '好運回升 — 之前的所有努力開始有回報。',
    advice: '「把握」。機會來了，你準備好了嗎？',
    warning: '好運來了但不要過度自信。保持低調是作風。',
    lucky: ['金黃、土黃、褐', '山泥戶外', '中國傳統建築'],
    unLucky: ['外國月亮', '過於抽象的擺設', '化學香料'],
    stemDesc: '⭐ 戊土用神透出，申金助庚金。最旺的月份之一！',
    yangDesc: '申月金旺，壬水長生在申。食傷旺，思維清晰，創造力爆發。',
  },
  {
    month: '九月',
    lunar: '八月初九',
    date: '2026-09-19 – 2026-10-17',
    stem: '己酉',
    element: '土',
    mood: '滋潤稳固',
    color: 'from-yellow-600 to-yellow-800',
    bgCard: 'bg-yellow-50',
    border: 'border-yellow-400',
    emoji: '🌾',
    overall: '穩定的正能量月。己土滋潤庚金，身心狀態持續好轉。',
    career: '穩定推進，工作有成果。貴人運持續。',
    health: '繼續康復，保持運動和休息的平衡。',
    wealth: '正財穩定，家庭財務和偕。',
    love: '單身者：慢慢來的節奏。已有伴侶：温馨的相处时光。',
    flow: '鞏固期 — 將好運氣轉化為實際成果。',
    advice: '「累積」。好運之時，應繼續低調前進。',
    warning: '没有特别警告，但好運之時勿大意。',
    lucky: ['淡黃、淺褐', '陶瓷藝術', '山間小徑'],
    unLucky: ['外賣包裝', '化學膠袋', '嘈雜工廠區'],
    stemDesc: '己土滋潤，己酉合化金。庚金得土滋潤，狀態穩定。',
    yangDesc: '酉月金旺，帝旺之地。庚金得勢，最旺之一。',
  },
  {
    month: '十月',
    lunar: '九月初九',
    date: '2026-10-18 – 2026-11-15',
    stem: '庚戌',
    element: '金',
    mood: '比劫助身·好運',
    color: 'from-stone-600 to-stone-800',
    bgCard: 'bg-stone-100',
    border: 'border-stone-400',
    emoji: '⚔️',
    overall: '好運繼續强化！庚金比劫助身，體力和精力都强。',
    career: '工作有突破，團隊合作順利。可能獲得掌聲或認可。',
    health: '體能狀態最佳月度之一。但注意適度運動，勿過度。',
    wealth: '正財佳，可能有獎金或额外收入。',
    love: '單身者：社交場合运動强。已有伴侶：共同出遊好時機。',
    flow: '豐收月 — 回報的季節，享受努力的成果。',
    advice: '「前行」。大步前進的時候，但小心路滑。',
    warning: '比劫多競爭，注意小人。避免口角或争執。',
    lucky: ['金、銀、鐵灰', '金屬雕塑', '健身室'],
    unLucky: ['玉石擺設', '泥土氣息', '古懂拍賣場'],
    stemDesc: '庚金比劫助庚金，力量增强。戌月火庫，戊土用神到位。',
    yangDesc: '戌月燥土，藏火庫。内心有温度，但表面低調。',
  },
  {
    month: '十一月',
    lunar: '十月初九',
    date: '2026-11-16 – 2026-12-14',
    stem: '辛亥',
    element: '水',
    mood: '智慧流通',
    color: 'from-cyan-600 to-cyan-800',
    bgCard: 'bg-cyan-50',
    border: 'border-cyan-400',
    emoji: '❄️',
    overall: '思維清晰的月份。壬水喜神在運勢中流轉，表達力和理解力增强。',
    career: '適合計劃、創作、寫作、学習。高深度的思考帶來好成果。',
    health: '精神狀態佳，頭腦清晰。继续保持。',
    wealth: '智慧生財，利於學習新技能或深造。',
    love: '單身者：文字或網上認識新朋友。已有伴侶：深度溝通時機。',
    flow: '智慧月 — 適合沉下心來學習和規劃。',
    advice: '「學習」。任何新知識都會在未來某個時刻派上用場。',
    warning: '水旺之人注意關節炎或水腫。避免久坐。',
    lucky: ['黑、銀白、湖藍', '雪地、海邊', '安静的書店'],
    unLucky: ['火燄、高温', '擁擠的地鐵', '塑料包裝環境'],
    stemDesc: '辛金助庚金，壬水長生在亥。思維清晰，學習運强。',
    yangDesc: '亥月水旺，壬水長生之地。食傷大旺，文思泉涌。',
  },
  {
    month: '十二月',
    lunar: '十一月初九',
    date: '2026-12-15 – 2027-01-12',
    stem: '壬子',
    element: '水',
    mood: '食傷大旺·完美收官',
    color: 'from-sky-600 to-sky-900',
    bgCard: 'bg-sky-50',
    border: 'border-sky-400',
    emoji: '🌊',
    overall: '⭐ 年度最旺月份之一！壬水喜神透出，子辰拱水局全開。家人的事情圆满結束。',
    career: '事業巔峰，聲望高漲。適合總結一年，規劃未來。',
    health: '體力和精神都在最佳狀態。但水旺注意腎臟和泌尿系統。',
    wealth: '收入佳，獎金豐厚。一年的努力得到最好回報。',
    love: '單身者：年底聚會运動强。已有伴侶：共同回顧一年，感情昇華。',
    flow: '完美收官 — 這一年所有的經歷都是有意義的。',
    advice: '「感恩」。記住那些在困難時帮助過你的人，未來换你帮助别人。',
    warning: '水旺，注意保暖，尤其下身關節。',
    lucky: ['深藍、海綠', '江河湖海', '冬天的暖陽'],
    unLucky: ['過度活躍的派對', '工廠環境', '塑料製品'],
    stemDesc: '⭐ 壬水喜神透出，子辰拱水局全開！本命年最佳月份。',
    yangDesc: '子月冬至，一陽復生。庚金得水洗條，智慧如星。',
  },
]

function MonthCard({ m }: { m: typeof MONTHS[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-2xl border ${m.border} ${m.bgCard} overflow-hidden shadow-sm hover:shadow-md transition-all duration-300`}>
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl shadow-md`}>
            {m.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-gray-800">{m.month}</h3>
              <span className="text-xs font-medium text-gray-500 bg-white/70 px-2 py-0.5 rounded-full border border-gray-200">
                {m.lunar}
              </span>
            </div>
            <p className="text-sm text-gray-500">{m.date}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-semibold text-gray-700 bg-white/80 px-2 py-0.5 rounded border border-gray-200">
                {m.stem} {m.element}氣
              </span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-sm font-medium text-gray-600 italic">「{m.mood}」</span>
            </div>
          </div>
        </div>
        <div className={`text-2xl transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          ▼
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4">
          {/* Overview */}
          <div className="bg-white/80 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{m.overall}</p>
          </div>

          {/* 4-Column Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '事業', icon: '💼', text: m.career },
              { label: '健康', icon: '💊', text: m.health },
              { label: '財富', icon: '💰', text: m.wealth },
              { label: '感情', icon: '💕', text: m.love },
            ].map((item) => (
              <div key={item.label} className="bg-white/70 rounded-xl p-3 border border-gray-200">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{item.label}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Flow + Advice */}
          <div className="bg-white/70 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-sm">🌊</span>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">月運特徵</span>
            </div>
            <p className="text-xs italic text-gray-600 mb-3">{m.flow}</p>
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">✨</span>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wide">師傅叮嚀</span>
              </div>
              <p className="text-sm font-medium text-green-800 italic">「{m.advice}」</p>
            </div>
          </div>

          {/* Warning */}
          {m.warning.includes('⚠️') || m.warning.includes('🔴') ? (
            <div className={`rounded-xl p-3 border ${
              m.warning.includes('🔴') ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'
            }`}>
              <p className={`text-sm font-semibold ${
                m.warning.includes('🔴') ? 'text-red-700' : 'text-amber-700'
              }`}>
                �️ {m.warning}
              </p>
            </div>
          ) : null}

          {/* Lucky / Unlucky */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-3 border border-green-200">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm">🌟</span>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wide">幸運</span>
              </div>
              <ul className="space-y-1">
                {m.lucky.map((l) => (
                  <li key={l} className="text-xs text-green-700 flex items-center gap-1">
                    <span className="text-green-400">✓</span> {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-3 border border-red-200">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-sm">✗</span>
                <span className="text-xs font-bold text-red-700 uppercase tracking-wide">避開</span>
              </div>
              <ul className="space-y-1">
                {m.unLucky.map((l) => (
                  <li key={l} className="text-xs text-red-700 flex items-center gap-1">
                    <span className="text-red-400">✗</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bazi Detail */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">🔮</span>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">命理細節</span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">流月天干</p>
                <p className="text-sm text-gray-700">{m.stemDesc}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-0.5">地支特性</p>
                <p className="text-sm text-gray-700">{m.yangDesc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function colorClass(color: string, shade: string, type: 'bg' | 'border' = 'bg') {
  const map: Record<string, Record<string, string>> = {
    amber: { bg: 'bg-amber-900/30', border: 'border-amber-500/30' },
    green: { bg: 'bg-emerald-900/30', border: 'border-emerald-500/30' },
    rose:  { bg: 'bg-rose-900/30',   border: 'border-rose-500/30' },
  }
  return `${map[color]?.[type] ?? ''}`
}

function App() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-purple-900/80" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <div className="relative max-w-3xl mx-auto px-6 py-14 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-amber-400 text-sm">📜 鄺偉雄師傅体系</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60 text-sm">譚氏家族定製</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {PERSON.name} · 2026 流年運勢
          </h1>
          <p className="text-white/60 text-lg mb-6">{PERSON.english}</p>
          <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-5 py-3">
            <div className="text-left">
              <p className="text-white/40 text-xs uppercase tracking-wider">八字四柱</p>
              <p className="text-amber-300 font-mono text-lg font-semibold">{PERSON.bazi}</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-left">
              <p className="text-white/40 text-xs uppercase tracking-wider">日主</p>
              <p className="text-white font-semibold">庚金</p>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-left">
              <p className="text-white/40 text-xs uppercase tracking-wider">現行大運</p>
              <p className="text-emerald-300 font-semibold">壬子運</p>
            </div>
          </div>
        </div>
      </div>

      {/* Year Summary */}
      <div className="max-w-3xl mx-auto px-6 -mt-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📖</span>
            <h2 className="text-white font-bold text-lg">全年總論</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: '🌊', label: '上半年', desc: '情感重整·压力调整', color: 'amber' },
              { icon: '☀️', label: '下半年', desc: '用神到位·好運回升', color: 'green' },
              { icon: '🔑', label: '全年關鍵', desc: '心血管保健·父親健康', color: 'rose' },
            ].map((item) => (
              <div key={item.label} className={`${colorClass(item.color, '900', 'bg')} ${colorClass(item.color, '500', 'border')} rounded-xl p-3 text-center`}>
                <div className="text-2xl mb-1">{item.icon}</div>
                <p className="text-white/90 text-sm font-semibold">{item.label}</p>
                <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-900/30 border border-amber-500/30 rounded-xl p-4">
            <p className="text-amber-200 text-sm italic leading-relaxed">
              文火煉金，矮仔上樓梯，一步一步咁上。2026是「整理年」——整理家族的過去，铺平未來的路。先苦後甜，是今年的軌跡。
            </p>
          </div>
        </div>

        {/* Monthly Cards */}
        <div className="space-y-4 pb-16">
          {MONTHS.map((m, i) => (
            <MonthCard key={i} m={m} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pb-12">
          <p className="text-white/30 text-sm">
            譚國偉 · 2026 流年運勢 · 私人檔案 · 請勿轉發
          </p>
          <p className="text-white/20 text-xs mt-1">
            命理分析僅供參考，命運掌握在自己手中
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
