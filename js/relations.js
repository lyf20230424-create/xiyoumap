// 《西游记》妖魔族谱 / 关系数据
// 揭示西游暗线：妖怪多系天上神佛的坐骑、童子与亲属下凡作乱，最后由主人收服
// 节点 kind: 师徒 | 佛 | 仙 | 妖怪 | 野生
// 连边 kind: 出身(原本隶属主人) | 亲属 | 降服(收服/打杀) | 贬谪(下界/被贬)
// locationId : 关联 js/data.js journeyData 中的地图节点 id；无对应节点则不设

const relationNodes = [
  // ---- 师徒五人（同样是谪仙/转世） ----
  { id: "唐僧", kind: "师徒", note: "金蝉子转世" },
  { id: "孙悟空", kind: "师徒", note: "齐天大圣 · 后受封斗战胜佛" },
  { id: "猪八戒", kind: "师徒", note: "天蓬元帅转世" },
  { id: "沙僧", kind: "师徒", note: "卷帘大将转世" },
  { id: "白龙马", kind: "师徒", note: "西海龙王三太子" },

  // ---- 神佛 ----
  { id: "如来佛祖", kind: "佛", note: "西天佛祖 · 雷音寺" },
  { id: "观音菩萨", kind: "佛", note: "南海普陀珞珈山" },
  { id: "弥勒佛", kind: "佛", note: "东来佛祖" },
  { id: "文殊菩萨", kind: "佛" },
  { id: "普贤菩萨", kind: "佛" },
  { id: "毗蓝婆菩萨", kind: "佛", note: "昴日星官之母" },
  { id: "灵吉菩萨", kind: "佛" },
  { id: "太上老君", kind: "仙", note: "兜率宫 · 道德天尊" },
  { id: "玉皇大帝", kind: "仙", note: "凌霄宝殿" },
  { id: "太乙救苦天尊", kind: "仙", note: "东极青华 · 九头狮之主" },
  { id: "太阴星君", kind: "仙", note: "广寒宫 · 玉兔之主" },
  { id: "寿星", kind: "仙", note: "南极仙翁" },
  { id: "托塔李天王", kind: "仙" },
  { id: "昴日星官", kind: "仙", note: "双冠大公鸡 · 蝎子精克星" },
  { id: "四木禽星", kind: "仙", note: "犀牛精克星" },
  { id: "西海龙王", kind: "仙" },

  // ---- 有背景妖怪（下凡 / 被收编） ----
  { id: "金角大王", kind: "妖怪", locationId: 13, note: "老君看金炉童子" },
  { id: "银角大王", kind: "妖怪", locationId: 13, note: "老君看银炉童子" },
  { id: "青牛精", kind: "妖怪", locationId: 18, note: "独角兕 · 金刚琢收尽诸神兵" },
  { id: "黄袍怪", kind: "妖怪", locationId: 11, note: "奎木狼下凡" },
  { id: "青狮", kind: "妖怪", locationId: 23, note: "狮驼岭大魔" },
  { id: "白象", kind: "妖怪", locationId: 23, note: "狮驼岭二魔" },
  { id: "大鹏", kind: "妖怪", locationId: 23, note: "狮驼岭三魔 · 如来的娘舅" },
  { id: "黄眉大王", kind: "妖怪", locationId: 21, note: "弥勒司磬童子 · 假雷音" },
  { id: "赛太岁", kind: "妖怪", locationId: 22, note: "观音坐骑金毛犼" },
  { id: "红孩儿", kind: "妖怪", note: "号山圣婴大王 · 牛魔王之子" },
  { id: "灵感大王", kind: "妖怪", locationId: 17, note: "观音莲花池金鱼" },
  { id: "黑熊精", kind: "妖怪", note: "黑风山 · 偷锦襕袈裟" },
  { id: "玉兔精", kind: "妖怪", locationId: 30, note: "广寒宫捣药玉兔" },
  { id: "九灵元圣", kind: "妖怪", locationId: 28, note: "竹节山九头狮 · 太乙坐骑" },
  { id: "犀牛精", kind: "妖怪", locationId: 29, note: "金平府三犀 · 偷酥合香油" },
  { id: "老鼠精", kind: "妖怪", note: "无底洞金鼻白毛鼠" },
  { id: "蝎子精", kind: "妖怪", locationId: 20, note: "毒敌山琵琶洞 · 倒马毒桩" },
  { id: "蜘蛛精", kind: "妖怪", note: "盘丝洞七姐妹" },
  { id: "百眼魔君", kind: "妖怪", note: "黄花观多目怪" },
  { id: "乌鸡国青狮", kind: "妖怪", locationId: 15, note: "文殊坐骑 · 假国王" },
  { id: "白鹿精", kind: "妖怪", locationId: 24, note: "寿星坐骑 · 比丘国国丈" },
  { id: "黄狮精", kind: "妖怪", locationId: 28, note: "玉华州盗兵 · 九灵元圣之孙" },
  { id: "黄风怪", kind: "妖怪", locationId: 7, note: "黄毛貂鼠精 · 三昧神风" },
  { id: "牛魔王", kind: "妖怪", note: "平天大圣 · 翠云山" },
  { id: "铁扇公主", kind: "妖怪", note: "罗刹女 · 持芭蕉扇" },

  // ---- 无背景野生 ----
  { id: "白骨精", kind: "野生", locationId: 10, note: "白虎岭 · 三打白骨精" },
  { id: "南山大王", kind: "野生", locationId: 26, note: "隐雾山艾叶花皮豹" }
];

const relationLinks = [
  // 贬谪：师徒五人出身
  { source: "如来佛祖", target: "唐僧",   label: "金蝉子转世", kind: "贬谪" },
  { source: "如来佛祖", target: "孙悟空", label: "镇压五行山", kind: "贬谪" },
  { source: "玉皇大帝", target: "猪八戒", label: "贬下凡间", kind: "贬谪" },
  { source: "玉皇大帝", target: "沙僧",   label: "贬下凡间", kind: "贬谪" },
  { source: "西海龙王", target: "白龙马", label: "贬为坐骑", kind: "贬谪" },

  // 出身：原本隶属主人
  { source: "太上老君", target: "青牛精",     label: "坐骑", kind: "出身" },
  { source: "太上老君", target: "金角大王",   label: "看炉童子", kind: "出身" },
  { source: "太上老君", target: "银角大王",   label: "看炉童子", kind: "出身" },
  { source: "文殊菩萨", target: "青狮",       label: "坐骑", kind: "出身" },
  { source: "普贤菩萨", target: "白象",       label: "坐骑", kind: "出身" },
  { source: "弥勒佛",   target: "黄眉大王",   label: "司磬童子", kind: "出身" },
  { source: "观音菩萨", target: "赛太岁",     label: "坐骑金毛犼", kind: "出身" },
  { source: "观音菩萨", target: "灵感大王",   label: "莲花池金鱼", kind: "出身" },
  { source: "太阴星君", target: "玉兔精",     label: "捣药玉兔", kind: "出身" },
  { source: "太乙救苦天尊", target: "九灵元圣", label: "坐骑", kind: "出身" },
  { source: "玉皇大帝", target: "黄袍怪",     label: "奎木狼下界", kind: "出身" },
  { source: "寿星",     target: "白鹿精",     label: "坐骑", kind: "出身" },
  { source: "文殊菩萨", target: "乌鸡国青狮", label: "坐骑", kind: "出身" },
  { source: "托塔李天王", target: "老鼠精",   label: "义女", kind: "出身" },

  // 亲属
  { source: "如来佛祖", target: "大鹏",     label: "娘舅", kind: "亲属" },
  { source: "牛魔王",   target: "红孩儿",   label: "父子", kind: "亲属" },
  { source: "铁扇公主", target: "红孩儿",   label: "母子", kind: "亲属" },
  { source: "牛魔王",   target: "铁扇公主", label: "夫妻", kind: "亲属" },
  { source: "九灵元圣", target: "黄狮精",   label: "干祖孙", kind: "亲属" },

  // 降服：收服 / 打杀
  { source: "观音菩萨", target: "红孩儿",   label: "收善财童子", kind: "降服" },
  { source: "观音菩萨", target: "黑熊精",   label: "收守山大神", kind: "降服" },
  { source: "灵吉菩萨", target: "黄风怪",   label: "飞龙宝杖降服", kind: "降服" },
  { source: "昴日星官", target: "蝎子精",   label: "啼鸣降服", kind: "降服" },
  { source: "毗蓝婆菩萨", target: "蜘蛛精", label: "收服", kind: "降服" },
  { source: "毗蓝婆菩萨", target: "百眼魔君", label: "收服", kind: "降服" },
  { source: "四木禽星", target: "犀牛精",   label: "下界收伏", kind: "降服" },
  { source: "孙悟空",   target: "白骨精",   label: "三打除妖", kind: "降服" },
  { source: "猪八戒",   target: "南山大王", label: "钉耙打杀", kind: "降服" },

  // 降服：悟空亲手降服的标志性妖怪（连接各神佛簇的枢纽）
  { source: "孙悟空",   target: "金角大王", label: "智取法宝", kind: "降服" },
  { source: "孙悟空",   target: "银角大王", label: "智取法宝", kind: "降服" },
  { source: "孙悟空",   target: "黄袍怪",   label: "降伏", kind: "降服" },
  { source: "孙悟空",   target: "黄狮精",   label: "降服", kind: "降服" },
  { source: "孙悟空",   target: "玉兔精",   label: "识破", kind: "降服" },
  { source: "孙悟空",   target: "赛太岁",   label: "破紫金铃", kind: "降服" },
  { source: "孙悟空",   target: "牛魔王",   label: "大战", kind: "降服" },
  { source: "孙悟空",   target: "青狮",     label: "斗法", kind: "降服" },
  { source: "孙悟空",   target: "白象",     label: "斗法", kind: "降服" },
  { source: "孙悟空",   target: "大鹏",     label: "被吞腹中", kind: "降服" },
  { source: "孙悟空",   target: "黄风怪",   label: "被迷双目", kind: "降服" },
  { source: "孙悟空",   target: "蝎子精",   label: "被刺败退", kind: "降服" },
  { source: "孙悟空",   target: "蜘蛛精",   label: "斗法", kind: "降服" },
  { source: "孙悟空",   target: "犀牛精",   label: "斗法", kind: "降服" },
  { source: "孙悟空",   target: "乌鸡国青狮", label: "揭穿", kind: "降服" },
  { source: "孙悟空",   target: "黄眉大王", label: "被擒受困", kind: "降服" },
  { source: "孙悟空",   target: "老鼠精",   label: "降服", kind: "降服" },
  { source: "孙悟空",   target: "九灵元圣", label: "被擒", kind: "降服" },
  { source: "孙悟空",   target: "黑熊精",   label: "斗法", kind: "降服" },
  { source: "孙悟空",   target: "红孩儿",   label: "被火所伤", kind: "降服" },
  { source: "孙悟空",   target: "白鹿精",   label: "降服", kind: "降服" },

  // 师徒：取经五人结成团队
  { source: "唐僧",   target: "孙悟空", label: "师徒", kind: "师徒" },
  { source: "唐僧",   target: "猪八戒", label: "师徒", kind: "师徒" },
  { source: "唐僧",   target: "沙僧",   label: "师徒", kind: "师徒" },
  { source: "唐僧",   target: "白龙马", label: "师徒", kind: "师徒" },
  { source: "孙悟空", target: "猪八戒", label: "师兄弟", kind: "师徒" },
  { source: "孙悟空", target: "沙僧",   label: "师兄弟", kind: "师徒" },
  { source: "猪八戒", target: "沙僧",   label: "师兄弟", kind: "师徒" }
];

// 导出数据（浏览器和 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { relationNodes: relationNodes, relationLinks: relationLinks };
} else {
    if (typeof window.relationNodes === 'undefined') {
        window.relationNodes = relationNodes;
        window.relationLinks = relationLinks;
    }
}
