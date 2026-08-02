// 《西游记》八十一难名单
// 依据原著第 99 回「九九数完魔灭尽，三三行满道归根」，观音菩萨逐难念诵
// 字段说明：
//   id         : 难数（1-81）
//   name       : 难名（如「金蝉遭贬」）
//   desc       : 一句话剧情说明
//   locationId : 对应 js/data.js journeyData 中的节点 id；无对应地图节点则为 null

const difficulties = [
  { id: 1,  name: "金蝉遭贬",   desc: "金蝉子轻慢佛法，被贬转世东土", locationId: null },
  { id: 2,  name: "出胎几杀",   desc: "唐僧转世出生，险些遭杀害", locationId: null },
  { id: 3,  name: "满月抛江",   desc: "满月被抛入江中，为金山寺长老救起", locationId: null },
  { id: 4,  name: "寻亲报冤",   desc: "寻访生母，报十八年血海冤仇", locationId: null },
  { id: 5,  name: "出城逢虎",   desc: "出长安西行，法门寺外遇猛虎拦路", locationId: 1 },
  { id: 6,  name: "落坑折从",   desc: "误陷坑穴，随从被寅将军等妖所食", locationId: null },
  { id: 7,  name: "双叉岭上",   desc: "双叉岭遇虎狼，太白金星化老叟相救", locationId: null },
  { id: 8,  name: "两界山头",   desc: "两界山揭去金字压帖，救出压山五百年的悟空", locationId: [3, 2] },
  { id: 9,  name: "陡涧换马",   desc: "鹰愁涧白龙吞马，观音点化为脚力", locationId: 4 },
  { id: 10, name: "夜被火烧",   desc: "观音禅院金池长老贪图袈裟，纵火夜烧禅院", locationId: null },
  { id: 11, name: "失却袈裟",   desc: "锦襕袈裟被黑熊精趁火窃走，悟空讨回", locationId: null },
  { id: 12, name: "收降八戒",   desc: "高老庄收伏天蓬元帅转世的猪八戒", locationId: 5 },
  { id: 13, name: "黄风怪阻",   desc: "黄风岭黄风怪吹三昧神风，迷悟空双眼", locationId: 7 },
  { id: 14, name: "请求灵吉",   desc: "请灵吉菩萨以飞龙宝杖降伏黄毛貂鼠精", locationId: 7 },
  { id: 15, name: "流沙难渡",   desc: "流沙河八百丈浑浊难渡，沙僧出没吃人", locationId: 8 },
  { id: 16, name: "收得沙僧",   desc: "收伏卷帘大将转世的沙悟净，师徒齐聚", locationId: 8 },
  { id: 17, name: "四圣显化",   desc: "黎山老母等四圣试禅心，八戒贪恋遭吊", locationId: null },
  { id: 18, name: "五庄观中",   desc: "五庄观偷吃镇元大仙的人参果", locationId: 9 },
  { id: 19, name: "难活人参",   desc: "推倒人参果树，遍访仙方医树", locationId: 9 },
  { id: 20, name: "贬退心猿",   desc: "白虎岭三打白骨精，唐僧怒写贬书逐悟空", locationId: 10 },
  { id: 21, name: "黑松林失散", desc: "碗子山黑松林，唐僧被黄袍怪摄走", locationId: 11 },
  { id: 22, name: "宝象国捎书", desc: "宝象国百花羞公主托捎家书", locationId: 12 },
  { id: 23, name: "金銮殿变虎", desc: "黄袍怪施法，唐僧被变为猛虎锁于殿中", locationId: 12 },
  { id: 24, name: "平顶山逢魔", desc: "平顶山遇金角、银角大王阻路", locationId: 13 },
  { id: 25, name: "莲花洞高悬", desc: "莲花洞金角银角以五件宝贝捉拿师徒", locationId: 14 },
  { id: 26, name: "乌鸡国救主", desc: "乌鸡国王托梦诉冤，悟空救回真主", locationId: 15 },
  { id: 27, name: "被魔化身",   desc: "文殊坐骑青狮化作假国王，篡位谋命", locationId: 15 },
  { id: 28, name: "号山逢怪",   desc: "号山枯松涧，红孩儿摄走唐僧", locationId: null },
  { id: 29, name: "风摄圣僧",   desc: "红孩儿三昧真火，烟熏风卷摄去圣僧", locationId: null },
  { id: 30, name: "心猿遭害",   desc: "悟空被三昧真火烧伤，请龙王救熄", locationId: null },
  { id: 31, name: "请圣降妖",   desc: "请观音以天罡刀降伏红孩儿，收为善财童子", locationId: null },
  { id: 32, name: "黑河沉没",   desc: "黑水河鼍龙摄走唐僧，船翻落水", locationId: null },
  { id: 33, name: "搬运车迟",   desc: "车迟国三大仙以妖术抑僧，迫僧搬运苦役", locationId: 16 },
  { id: 34, name: "大赌输赢",   desc: "祈雨、坐禅、隔板猜物、砍头剖腹，斗法全胜", locationId: 16 },
  { id: 35, name: "祛道兴僧",   desc: "揭穿虎鹿羊三仙妖术，复兴佛法", locationId: 16 },
  { id: 36, name: "路逢大水",   desc: "通天河八百里大水横阻去路", locationId: 17 },
  { id: 37, name: "身落天河",   desc: "师徒落入通天河，几乎丧命", locationId: 17 },
  { id: 38, name: "鱼篮现身",   desc: "观音以竹篮收走莲花池灵感大王金鱼", locationId: 17 },
  { id: 39, name: "金兜山遇怪", desc: "金兜山独角兕大王掳走唐僧", locationId: 18 },
  { id: 40, name: "普天神难伏", desc: "金刚琢收尽天兵法宝，诸神皆不能伏", locationId: 18 },
  { id: 41, name: "问佛根源",   desc: "如来点破根源，太上老君收走青牛精", locationId: 18 },
  { id: 42, name: "吃水遭毒",   desc: "女儿国误饮子母河水，师徒怀胎", locationId: 19 },
  { id: 43, name: "女国婚姻",   desc: "女儿国王欲招唐僧为夫，强行留人", locationId: 19 },
  { id: 44, name: "琵琶洞受苦", desc: "毒敌山琵琶洞蝎子精摄走唐僧", locationId: 20 },
  { id: 45, name: "再贬心猿",   desc: "真假美猴王，唐僧再度逐走悟空", locationId: null },
  { id: 46, name: "难辨猕猴",   desc: "六耳猕猴冒充悟空，佛祖辨明真假", locationId: null },
  { id: 47, name: "路阻火焰山", desc: "八百里火焰山，烈焰腾腾阻路", locationId: null },
  { id: 48, name: "求取芭蕉扇", desc: "三借芭蕉扇，铁扇公主百般刁难", locationId: null },
  { id: 49, name: "收缚魔王",   desc: "收伏牛魔王，借扇扇灭火焰", locationId: null },
  { id: 50, name: "赛城扫塔",   desc: "祭赛国金光寺扫塔，查明失宝一案", locationId: null },
  { id: 51, name: "取宝救僧",   desc: "斗败九头虫，夺回舍利佛宝洗冤救僧", locationId: null },
  { id: 52, name: "棘林吟咏",   desc: "荆棘岭木仙庵，树精邀唐僧对诗", locationId: null },
  { id: 53, name: "小雷音遇难", desc: "小雷音寺黄眉怪设假雷音，金铙扣悟空", locationId: 21 },
  { id: 54, name: "诸天神遭困", desc: "人种袋收尽诸天神将，弥勒佛设局收妖", locationId: 21 },
  { id: 55, name: "稀柿衕秽阻", desc: "七绝山稀柿衕臭秽难行，八戒拱开秽路", locationId: null },
  { id: 56, name: "朱紫国行医", desc: "朱紫国悬丝诊脉，为国王医治沉疴", locationId: 22 },
  { id: 57, name: "拯救疲癃",   desc: "揭穿赛太岁，救回金圣宫娘娘", locationId: 22 },
  { id: 58, name: "降妖取后",   desc: "观音收走金毛犼，金圣宫安然归位", locationId: 22 },
  { id: 59, name: "七情迷没",   desc: "盘丝洞七蜘蛛精吐丝，缠缚师徒", locationId: null },
  { id: 60, name: "多目遭伤",   desc: "黄花观百眼魔君金光刺目，伤人无数", locationId: null },
  { id: 61, name: "路阻狮驼",   desc: "狮驼岭青狮、白象、大鹏三魔阻路", locationId: 23 },
  { id: 62, name: "怪分三色",   desc: "三魔变化逞凶，悟空被大鹏吞入腹中", locationId: 23 },
  { id: 63, name: "城里忽然",   desc: "狮驼国妖风骤起，妖云蔽日，凶险万分", locationId: 23 },
  { id: 64, name: "请佛收魔",   desc: "如来亲临狮驼国，降伏三魔归位", locationId: 23 },
  { id: 65, name: "比丘救子",   desc: "比丘国鹿精献术，欲取小儿心肝为药引", locationId: 24 },
  { id: 66, name: "辨认真邪",   desc: "无底洞老鼠精化作难女，悟空辨其真邪", locationId: null },
  { id: 67, name: "松林救怪",   desc: "镇海禅林寺松林，救下被掳的女子", locationId: null },
  { id: 68, name: "僧房卧病",   desc: "禅林寺僧房，妖精夜食寺中僧人", locationId: null },
  { id: 69, name: "无底洞遭困", desc: "陷空山无底洞，唐僧被老鼠精摄去", locationId: null },
  { id: 70, name: "灭法国难行", desc: "灭法国王欲杀满万僧，师徒夜剃全城头", locationId: 25 },
  { id: 71, name: "隐雾山遇魔", desc: "隐雾山南山大王分瓣梅花计掳走唐僧", locationId: 26 },
  { id: 72, name: "凤仙郡求雨", desc: "凤仙郡连年大旱，悟空劝善上天求雨", locationId: 27 },
  { id: 73, name: "失落兵器",   desc: "玉华州黄狮精盗走师徒三人的兵器", locationId: 28 },
  { id: 74, name: "会庆钉钯",   desc: "黄狮精设钉钯会庆功，惹出九头狮", locationId: 28 },
  { id: 75, name: "竹节山遭难", desc: "竹节山九灵元圣施法，擒拿师徒四人", locationId: 28 },
  { id: 76, name: "玄英洞受苦", desc: "金平府三犀牛假佛偷油，摄走唐僧", locationId: 29 },
  { id: 77, name: "赶捉犀牛",   desc: "四木禽星下界，捉拿辟寒辟暑辟尘三犀", locationId: 29 },
  { id: 78, name: "天竺招婚",   desc: "天竺国玉兔精抛绣球，欲招唐僧为驸马", locationId: 30 },
  { id: 79, name: "铜台府监禁", desc: "铜台府被诬为盗，师徒身陷监牢", locationId: null },
  { id: 80, name: "凌云渡脱胎", desc: "凌云渡脱却凡胎，登上灵山雷音寺", locationId: 31 },
  { id: 81, name: "通天河湿经", desc: "老鼋怒沉经书，晒经石上晾晒经卷", locationId: 17 }
];

// 导出数据（浏览器和 Node.js 环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { difficulties: difficulties };
} else {
    if (typeof window.difficulties === 'undefined') {
        window.difficulties = difficulties;
    }
}
