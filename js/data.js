// 《西游记》取经路线数据
// 基于原著内容，按取经顺序排列

const journeyData = [
  {
    id: 1,
    name: "长安",
    type: "起点",
    demons: [],
    events: ["唐僧受命前往西天取经，收服孙悟空为徒"],
    position: { x: 100, y: 500 },
    description: "唐朝首都，取经起点"
  },
  {
    id: 2,
    name: "五行山",
    type: "险境",
    demons: ["孙悟空（被镇压）"],
    events: ["救出孙悟空，赐名行者"],
    position: { x: 150, y: 450 },
    description: "孙悟空被如来佛祖镇压五百年"
  },
  {
    id: 3,
    name: "两界山",
    type: "险境",
    demons: ["六贼"],
    events: ["打死六贼，悟空心灰离去"],
    position: { x: 200, y: 400 },
    description: "唐僧第一次考验悟空"
  },
  {
    id: 4,
    name: "鹰愁涧",
    type: "险境",
    demons: ["白龙马（原西海龙王三太子）"],
    events: ["收服白龙马，化为坐骑"],
    position: { x: 250, y: 350 },
    description: "白龙马吃唐僧白马，后被收服"
  },
  {
    id: 5,
    name: "高老庄",
    type: "村庄",
    demons: ["猪八戒（原天蓬元帅）"],
    events: ["收服猪八戒，赐名悟能"],
    position: { x: 300, y: 300 },
    description: "猪八戒强娶高翠兰，被悟空收服"
  },
  {
    id: 6,
    name: "浮屠山",
    type: "修行处",
    demons: ["乌巢禅师"],
    events: ["传授《心经》"],
    position: { x: 350, y: 250 },
    description: "乌巢禅师传授唐僧《心经》"
  },
  {
    id: 7,
    name: "黄风岭",
    type: "险境",
    demons: ["黄风怪", "虎先锋"],
    events: ["悟空被吹三昧神风，灵吉菩萨相助"],
    position: { x: 400, y: 200 },
    description: "黄风怪有三昧神风，灵吉菩萨用飞龙宝杖降服"
  },
  {
    id: 8,
    name: "流沙河",
    type: "险境",
    demons: ["沙僧（原卷帘大将）"],
    events: ["收服沙僧，赐名悟净"],
    position: { x: 450, y: 150 },
    description: "沙僧在此为妖，吃人无数"
  },
  {
    id: 9,
    name: "五庄观",
    type: "修行处",
    demons: ["镇元子", "清风", "明月"],
    events: ["偷吃人参果，推倒人参果树"],
    position: { x: 500, y: 100 },
    description: "偷吃人参果，请观音菩萨救活果树"
  },
  {
    id: 10,
    name: "白虎岭",
    type: "险境",
    demons: ["白骨精"],
    events: ["三打白骨精，唐僧赶走悟空"],
    position: { x: 550, y: 50 },
    description: "白骨精三次变化，悟空三次识破"
  },
  {
    id: 11,
    name: "黑松林",
    type: "险境",
    demons: ["黄袍怪"],
    events: ["宝象国救唐僧，沙僧变"],
    position: { x: 600, y: 100 },
    description: "唐僧被黄袍怪抓走"
  },
  {
    id: 12,
    name: "宝象国",
    type: "国家",
    demons: ["黄袍怪"],
    events: ["救回唐僧，悟空平冤"],
    position: { x: 650, y: 150 },
    description: "唐僧被当成老虎，悟空平反冤案"
  },
  {
    id: 13,
    name: "平顶山",
    type: "险境",
    demons: ["金角大王", "银角大王"],
    events: ["智取紫金红葫芦、羊脂玉净瓶"],
    position: { x: 700, y: 200 },
    description: "悟空智取宝贝，降服妖王"
  },
  {
    id: 14,
    name: "莲花洞",
    type: "险境",
    demons: ["金角大王", "银角大王"],
    events: ["悟空降服金银角大王"],
    position: { x: 750, y: 250 },
    description: "金银角大王有五件宝贝"
  },
  {
    id: 15,
    name: "乌鸡国",
    type: "国家",
    demons: ["青毛狮子精"],
    events: ["救活国王，悟空变太子"],
    position: { x: 800, y: 300 },
    description: "国王被青毛狮子精害死"
  },
  {
    id: 16,
    name: "车迟国",
    type: "国家",
    demons: ["虎力大仙", "鹿力大仙", "羊力大仙"],
    events: ["斗法降服三仙"],
    position: { x: 850, y: 350 },
    description: "与三国师斗法，显神通"
  },
  {
    id: 17,
    name: "通天河",
    type: "险境",
    demons: ["灵感大王"],
    events: ["灵感大王抓童子，悟空请观音"],
    position: { x: 900, y: 400 },
    description: "灵感大王吃童子，观音收鱼鳖"
  },
  {
    id: 18,
    name: "金兜山",
    type: "险境",
    demons: ["兕大王", "金刚琢"],
    events: ["悟空请来如来、诸天神佛"],
    position: { x: 950, y: 450 },
    description: "金刚琢收尽兵器，如来佛祖收服"
  },
  {
    id: 19,
    name: "女儿国",
    type: "国家",
    demons: ["蝎子精"],
    events: ["女国王招亲，悟空避子母河"],
    position: { x: 1000, y: 500 },
    description: "女儿国欲留唐僧，悟空破局"
  },
  {
    id: 20,
    name: "毒敌山",
    type: "险境",
    demons: ["蝎子精"],
    events: ["昴日星官相助，蝎子精现原形"],
    position: { x: 1050, y: 550 },
    description: "蝎子精精厉害，昴日星官收服"
  },
  {
    id: 21,
    name: "小雷音寺",
    type: "险境",
    demons: ["黄眉大王", "人造小雷音"],
    events: ["悟空被困，弥勒佛收妖"],
    position: { x: 1100, y: 600 },
    description: "黄眉大王设假雷音寺，弥勒佛收服"
  },
  {
    id: 22,
    name: "朱紫国",
    type: "国家",
    demons: ["赛太岁", "金毛犼"],
    events: ["悟空请观音，救回金圣宫"],
    position: { x: 1150, y: 650 },
    description: "赛太岁抢走金圣宫，观音收伏"
  },
  {
    id: 23,
    name: "狮驼岭",
    type: "险境",
    demons: ["青狮", "白象", "大鹏"],
    events: ["悟空被吞，文殊普贤收妖"],
    position: { x: 1200, y: 700 },
    description: "狮驼岭妖魔凶猛，悟空被吞"
  },
  {
    id: 24,
    name: "比丘国",
    type: "国家",
    demons: ["寿星鹿", "白鹿精"],
    events: ["悟空救小儿，寿星收鹿"],
    position: { x: 1250, y: 750 },
    description: "比丘国要用小儿心肝，悟空破局"
  },
  {
    id: 25,
    name: "灭法国",
    type: "国家",
    demons: ["灭法国王"],
    events: ["悟空变和尚，剃光万僧头"],
    position: { x: 1300, y: 800 },
    description: "国王发誓杀万僧，悟空破局"
  },
  {
    id: 26,
    name: "隐雾山",
    type: "险境",
    demons: ["南山大王", "艾叶花皮豹"],
    events: ["悟空降豹妖，救回唐僧"],
    position: { x: 1350, y: 850 },
    description: "豹妖抓唐僧，悟空救出"
  },
  {
    id: 27,
    name: "凤仙郡",
    type: "国家",
    demons: ["玉鼠精", "土地神"],
    events: ["郡王求雨，悟空上天"],
    position: { x: 1400, y: 900 },
    description: "凤仙郡干旱，悟空上天求雨"
  },
  {
    id: 28,
    name: "玉华州",
    type: "国家",
    demons: ["黄狮精", "九灵元圣"],
    events: ["悟空借兵器，降服黄狮精"],
    position: { x: 1450, y: 950 },
    description: "三王子拜师，悟空降服黄狮精"
  },
  {
    id: 29,
    name: "金平府",
    type: "国家",
    demons: ["辟寒大王", "辟暑大王", "辟尘大王"],
    events: ["悟空降服三角犀牛精"],
    position: { x: 1500, y: 1000 },
    description: "犀牛精偷香油，悟空降服"
  },
  {
    id: 30,
    name: "天竺国",
    type: "国家",
    demons: ["玉兔精"],
    events: ["真假公主，悟空揭穿"],
    position: { x: 1550, y: 1050 },
    description: "玉兔精变公主，悟空揭穿"
  },
  {
    id: 31,
    name: "灵山",
    type: "终点",
    demons: [],
    events: ["取得真经，师徒成佛"],
    position: { x: 1600, y: 1100 },
    description: "西天雷音寺，取得真经"
  }
];

// 妖怪类型分类
const demonTypes = {
  "精怪": ["白骨精", "黄风怪", "灵感大王", "蝎子精", "赛太岁", "金毛犼", "玉兔精"],
  "神仙/妖仙": ["孙悟空", "猪八戒", "沙僧", "镇元子", "乌巢禅师", "青毛狮子精", "九灵元圣"],
  "动物": ["白龙马", "六贼", "虎先锋", "青狮", "白象", "大鹏", "辟寒大王", "辟暑大王", "辟尘大王"],
  "魔王": ["金角大王", "银角大王", "黄袍怪", "兕大王", "黄眉大王", "南山大王", "艾叶花皮豹"],
  "其他": []
};

// 为妖怪添加类型标记
function addDemonTypes() {
  journeyData.forEach(location => {
    location.demonsWithTypes = location.demons.map(demon => {
      let type = "其他";
      for (const [category, demons] of Object.entries(demonTypes)) {
        if (demons.some(d => demon.includes(d))) {
          type = category;
          break;
        }
      }
      return { name: demon, type: type };
    });
  });
}

addDemonTypes();