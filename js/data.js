// 《西游记》取经路线数据
// 基于原著内容，按取经顺序排列
// 布局：长安最低(底) → 灵山最高(顶)，整体从低到高登山

const journeyData = [
  {
    id: 1,
    name: "长安",
    type: "起点",
    chapter: "第11-12回",
    demons: [],
    events: ["唐僧受命前往西天取经，收服孙悟空为徒"],
    position: { x: 100, y: 1023 },
    description: "唐朝首都，取经起点",
    summary: "唐太宗开盂兰盆会，观音点化玄奘西行取经。唐僧出发后在两界山收孙悟空为徒，踏上西天之路。"
  },
  {
    id: 2,
    name: "五行山",
    type: "险境",
    chapter: "第14回",
    demons: ["孙悟空（被镇压）"],
    events: ["救出孙悟空，赐名行者"],
    position: { x: 150, y: 998 },
    description: "孙悟空被如来佛祖镇压五百年",
    summary: "如来将大闹天宫的孙悟空压在五行山下五百年。唐僧揭去金字压帖，救出悟空收为徒弟，赐号行者。"
  },
  {
    id: 3,
    name: "两界山",
    type: "险境",
    chapter: "第14回",
    demons: ["六贼"],
    events: ["打死六贼，悟空心灰离去"],
    position: { x: 200, y: 963 },
    description: "唐僧第一次考验悟空",
    summary: "悟空打杀拦路抢劫的六贼，唐僧责怪其行凶，悟空一气之下回花果山，经龙王劝说后归来。"
  },
  {
    id: 4,
    name: "鹰愁涧",
    type: "险境",
    chapter: "第15回",
    demons: ["白龙马（原西海龙王三太子）"],
    events: ["收服白龙马，化为坐骑"],
    position: { x: 250, y: 923 },
    description: "白龙马吃唐僧白马，后被收服",
    summary: "玉龙三太子因纵火烧殿被贬鹰愁涧，吞食唐僧白马。观音将其点化为白龙马，成为唐僧坐骑。"
  },
  {
    id: 5,
    name: "高老庄",
    type: "村庄",
    chapter: "第18-19回",
    demons: ["猪八戒（原天蓬元帅）"],
    events: ["收服猪八戒，赐名悟能"],
    position: { x: 300, y: 882 },
    description: "猪八戒强娶高翠兰，被悟空收服",
    summary: "天蓬元帅调戏嫦娥被贬下凡，投胎成猪妖占高老庄强娶高翠兰。悟空与其斗法，收服后赐名悟能，加入取经队伍。"
  },
  {
    id: 6,
    name: "浮屠山",
    type: "修行处",
    chapter: "第19回",
    demons: ["乌巢禅师"],
    events: ["传授《心经》"],
    position: { x: 350, y: 848 },
    description: "乌巢禅师传授唐僧《心经》",
    summary: "乌巢禅师坐于香桧树上的浮屠山中，传授唐僧《多心经》一卷，并预言取经路上的艰险。"
  },
  {
    id: 7,
    name: "黄风岭",
    type: "险境",
    chapter: "第20-21回",
    demons: ["黄风怪", "虎先锋"],
    events: ["悟空被吹三昧神风，灵吉菩萨相助"],
    position: { x: 400, y: 823 },
    description: "黄风怪有三昧神风，灵吉菩萨用飞龙宝杖降服",
    summary: "虎先锋擒唐僧，黄风怪吹三昧神风迷悟空双眼。灵吉菩萨持飞龙宝杖与定风丹收服黄毛貂鼠精。"
  },
  {
    id: 8,
    name: "流沙河",
    type: "险境",
    chapter: "第22回",
    demons: ["沙僧（原卷帘大将）"],
    events: ["收服沙僧，赐名悟净"],
    position: { x: 450, y: 805 },
    description: "沙僧在此为妖，吃人无数",
    summary: "卷帘大将失手打碎琉璃盏被贬流沙河，在此吃人为生。八戒与其大战，观音派木叉渡河，收服赐名悟净。师徒四人齐聚。"
  },
  {
    id: 9,
    name: "五庄观",
    type: "修行处",
    chapter: "第24-26回",
    demons: ["镇元子", "清风", "明月"],
    events: ["偷吃人参果，推倒人参果树"],
    position: { x: 500, y: 789 },
    description: "偷吃人参果，请观音菩萨救活果树",
    summary: "万寿山五庄观镇元大仙的人参果三千年一熟。悟空偷果遭清风明月辱骂，一怒推倒果树，后请观音以甘露救活，与镇元子结为兄弟。"
  },
  {
    id: 10,
    name: "白虎岭",
    type: "险境",
    chapter: "第27回",
    demons: ["白骨精"],
    events: ["三打白骨精，唐僧赶走悟空"],
    position: { x: 550, y: 769 },
    description: "白骨精三次变化，悟空三次识破",
    summary: "白骨精三变村姑、老妇、老翁诱骗唐僧。悟空火眼金睛三次识破将其打死，唐僧不辨真假怒写贬书，将悟空逐回花果山。"
  },
  {
    id: 11,
    name: "黑松林",
    type: "险境",
    chapter: "第28回",
    demons: ["黄袍怪"],
    events: ["宝象国救唐僧，沙僧变"],
    position: { x: 600, y: 741 },
    description: "唐僧被黄袍怪抓走",
    summary: "黄袍怪在碗子山黑松林擒走唐僧。八戒沙僧不敌，唐僧被变为猛虎，八戒急赴花果山请回悟空降妖。"
  },
  {
    id: 12,
    name: "宝象国",
    type: "国家",
    chapter: "第29-31回",
    demons: ["黄袍怪"],
    events: ["救回唐僧，悟空平冤"],
    position: { x: 650, y: 705 },
    description: "唐僧被当成老虎，悟空平反冤案",
    summary: "黄袍怪本是奎木狼下界，掳走宝象国百花羞公主。悟空识破其身份，请玉帝收回奎木狼，救回唐僧平反冤案。"
  },
  {
    id: 13,
    name: "平顶山",
    type: "险境",
    chapter: "第32-35回",
    demons: ["金角大王", "银角大王"],
    events: ["智取紫金红葫芦、羊脂玉净瓶"],
    position: { x: 700, y: 663 },
    description: "悟空智取宝贝，降服妖王",
    summary: "太上老君看炉童子下界为金角银角大王，持紫金红葫芦、羊脂玉净瓶等五件宝贝。悟空用真假葫芦之计智取法宝，收服二妖。"
  },
  {
    id: 14,
    name: "莲花洞",
    type: "险境",
    chapter: "第32-35回",
    demons: ["金角大王", "银角大王"],
    events: ["悟空降服金银角大王"],
    position: { x: 750, y: 625 },
    description: "金银角大王有五件宝贝",
    summary: "与平顶山同为难关。金银角大王有葫芦、净瓶、幌金绳、芭蕉扇、七星剑五件宝贝，悟空以变化智斗，终将二妖收入葫芦。"
  },
  {
    id: 15,
    name: "乌鸡国",
    type: "国家",
    chapter: "第36-39回",
    demons: ["青毛狮子精"],
    events: ["救活国王，悟空变太子"],
    position: { x: 800, y: 592 },
    description: "国王被青毛狮子精害死",
    summary: "文殊菩萨坐骑青毛狮子下界推死乌鸡国王，变作假王在位。悟空助真王魂魄诉冤，下地府借还魂丹救活国王，揭穿假王。"
  },
  {
    id: 16,
    name: "车迟国",
    type: "国家",
    chapter: "第44-46回",
    demons: ["虎力大仙", "鹿力大仙", "羊力大仙"],
    events: ["斗法降服三仙"],
    position: { x: 850, y: 570 },
    description: "与三国师斗法，显神通",
    summary: "车迟国尊道灭僧。虎力鹿力羊力三仙求雨称能，悟空与三仙斗法：祈雨、坐禅、隔板猜物、砍头剖腹，尽破三仙妖术。"
  },
  {
    id: 17,
    name: "通天河",
    type: "险境",
    chapter: "第47-49回",
    demons: ["灵感大王"],
    events: ["灵感大王抓童子，悟空请观音"],
    position: { x: 900, y: 553 },
    description: "灵感大王吃童子，观音收鱼鳖",
    summary: "通天河灵感大王每年索食童男童女。悟空八戒化身童身入水斗妖，观音以竹篮收走莲花池金鱼，老鼋驮师徒过河。"
  },
  {
    id: 18,
    name: "金兜山",
    type: "险境",
    chapter: "第50-52回",
    demons: ["兕大王", "金刚琢"],
    events: ["悟空请来如来、诸天神佛"],
    position: { x: 950, y: 536 },
    description: "金刚琢收尽兵器，如来佛祖收服",
    summary: "独角兕大王持金刚琢收尽诸神兵器法宝，悟空请遍天兵、水德火德、如来罗汉皆不敌。太上老君以芭蕉扇降服青牛精。"
  },
  {
    id: 19,
    name: "女儿国",
    type: "国家",
    chapter: "第53-54回",
    demons: ["蝎子精"],
    events: ["女国王招亲，悟空避子母河"],
    position: { x: 1000, y: 515 },
    description: "女儿国欲留唐僧，悟空破局",
    summary: "师徒误饮子母河水怀胎，悟空取落胎泉化解。女儿国王欲招唐僧为夫，唐僧以假意应亲脱身，蝎子精又摄走唐僧。"
  },
  {
    id: 20,
    name: "毒敌山",
    type: "险境",
    chapter: "第55回",
    demons: ["蝎子精"],
    events: ["昴日星官相助，蝎子精现原形"],
    position: { x: 1050, y: 483 },
    description: "蝎子精厉害，昴日星官收服",
    summary: "琵琶洞蝎子精以倒马毒桩刺伤悟空八戒。悟空请来昴日星官，现出双冠大公鸡原形，两声啼鸣便将其收服。"
  },
  {
    id: 21,
    name: "小雷音寺",
    type: "险境",
    chapter: "第65-66回",
    demons: ["黄眉大王", "人造小雷音"],
    events: ["悟空被困，弥勒佛收妖"],
    position: { x: 1100, y: 445 },
    description: "黄眉大王设假雷音寺，弥勒佛收服",
    summary: "黄眉童子假扮如来设小雷音寺，以金铙扣住悟空、人种袋收尽诸神。弥勒佛设瓜田之局，收服黄眉妖。"
  },
  {
    id: 22,
    name: "朱紫国",
    type: "国家",
    chapter: "第68-71回",
    demons: ["赛太岁", "金毛犼"],
    events: ["悟空请观音，救回金圣宫"],
    position: { x: 1150, y: 405 },
    description: "赛太岁抢走金圣宫，观音收伏",
    summary: "观音坐骑金毛犼下界为赛太岁，掳走金圣宫娘娘。悟空悬丝诊脉、巧破紫金铃，观音收伏金毛犼。"
  },
  {
    id: 23,
    name: "狮驼岭",
    type: "险境",
    chapter: "第74-77回",
    demons: ["青狮", "白象", "大鹏"],
    events: ["悟空被吞，文殊普贤收妖"],
    position: { x: 1200, y: 367 },
    description: "狮驼岭妖魔凶猛，悟空被吞",
    summary: "取经路上最大劫难。青狮、白象、大鹏三魔占据狮驼国，悟空被大鹏吞入腹中折腾。如来率众佛亲临，收服三魔。"
  },
  {
    id: 24,
    name: "比丘国",
    type: "国家",
    chapter: "第78-79回",
    demons: ["寿星鹿", "白鹿精"],
    events: ["悟空救小儿，寿星收鹿"],
    position: { x: 1250, y: 338 },
    description: "比丘国要用小儿心肝，悟空破局",
    summary: "鹿精变国丈献白面狐狸为美后，欲用一千一百一十一个小儿心肝为药引。悟空施法救子，寿星收回白鹿。"
  },
  {
    id: 25,
    name: "灭法国",
    type: "国家",
    chapter: "第84回",
    demons: [],
    events: ["悟空变和尚，剃光万僧头"],
    position: { x: 1300, y: 316 },
    description: "国王发誓杀万僧，悟空破局",
    summary: "灭法国王发誓杀满一万和尚。悟空使神通夜剃国王君臣满城头，国王畏惧皈依，改名钦法国，取经队伍顺利通过。"
  },
  {
    id: 26,
    name: "隐雾山",
    type: "险境",
    chapter: "第85-86回",
    demons: ["南山大王", "艾叶花皮豹"],
    events: ["悟空降豹妖，救回唐僧"],
    position: { x: 1350, y: 301 },
    description: "豹妖抓唐僧，悟空救出",
    summary: "南山大王艾叶花皮豹精以分瓣梅花计掳走唐僧，悟空识破后变化入洞，救回唐僧并降服豹妖。"
  },
  {
    id: 27,
    name: "凤仙郡",
    type: "国家",
    chapter: "第87回",
    demons: [],
    events: ["郡王求雨，悟空上天"],
    position: { x: 1400, y: 284 },
    description: "凤仙郡干旱，悟空上天求雨",
    summary: "凤仙郡连年大旱，郡守不敬上天致玉帝设三事（米山、面山、金锁）惩罚。悟空劝善积德，感动玉帝降甘霖。"
  },
  {
    id: 28,
    name: "玉华州",
    type: "国家",
    chapter: "第88-90回",
    demons: ["黄狮精", "九灵元圣"],
    events: ["悟空借兵器，降服黄狮精"],
    position: { x: 1450, y: 259 },
    description: "三王子拜师，悟空降服黄狮精",
    summary: "玉华州三王子拜师学艺，师兄弟兵器被黄狮精盗走办钉钯宴。悟空等追讨兵器，又遇九灵元圣（九头狮），天尊收服。"
  },
  {
    id: 29,
    name: "金平府",
    type: "国家",
    chapter: "第91-92回",
    demons: ["辟寒大王", "辟暑大王", "辟尘大王"],
    events: ["悟空降服三角犀牛精"],
    position: { x: 1500, y: 226 },
    description: "犀牛精偷香油，悟空降服",
    summary: "金平府元宵灯会，三头犀牛精变作佛爷偷食酥合香油并摄走唐僧。悟空上天请四木禽星下界，擒获三犀。"
  },
  {
    id: 30,
    name: "天竺国",
    type: "国家",
    chapter: "第93-95回",
    demons: ["玉兔精"],
    events: ["真假公主，悟空揭穿"],
    position: { x: 1550, y: 186 },
    description: "玉兔精变公主，悟空揭穿",
    summary: "广寒宫玉兔下界变作公主抛绣球招亲。悟空识破真假公主，太阴星君下界收走玉兔，真公主归位。"
  },
  {
    id: 31,
    name: "灵山",
    type: "终点",
    chapter: "第98-100回",
    demons: [],
    events: ["取得真经，师徒成佛"],
    position: { x: 1600, y: 146 },
    description: "西天雷音寺，取得真经",
    summary: "师徒历八十一难抵灵山雷音寺，凌云渡脱去凡胎，取得真经五千零四十八卷。八大金刚护送返东土，师徒五众受封成佛。"
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

// 导出数据（浏览器和Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        journeyData: journeyData,
        demonTypes: demonTypes
    };
} else {
    // 避免重复声明 - 检查是否已存在
    if (typeof window.journeyData === 'undefined') {
        window.journeyData = journeyData;
        window.demonTypes = demonTypes;
    }
}