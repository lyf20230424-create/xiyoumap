// 读取 v3.0 视频数据 JSON 的示例脚本
// 用途：展示程序如何调用 visual-elements.json 和 characters.json
// 运行：node assets/video/read-data.js

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname);

function loadJson(name) {
  return JSON.parse(fs.readFileSync(path.join(DIR, name), 'utf8'));
}

// 加载两个数据文件
const visualElements = loadJson('visual-elements.json');
const characters = loadJson('characters.json');

// === 示例 1：获取某难的角色清单 ===
function getDifficultyCharacters(difficultyId) {
  const ve = visualElements; // 单难样板；全量时按 difficultyId 查找
  return ve.characters;
}

// === 示例 2：获取某角色的完整提示词（含去恐怖谷变体） ===
function getCharacterPrompt(characterName) {
  const ch = characters.characters.find(c => c.name === characterName);
  if (!ch) return null;
  return {
    id: ch.id,
    name: ch.name,
    type: ch.type,
    prompt: ch.prompt,          // 可直接喂给 AI 图生图
    anchors: ch.anchors         // 一致性锚点
  };
}

// === 示例 3：按角色 type 过滤（区分人类/神魔变体） ===
function getCharactersByType(type) {
  return characters.characters.filter(c => c.type === type);
}

// === 示例 4：模板填充工具（后续新增角色用） ===
function fillTemplate(roleName, species, age, body, face, headwear, costume, props, isDeityBeast) {
  let t = characters.promptTemplate.common;
  t = t.replace('{角色名称}', roleName);
  t = t.replace('{物种/身份}', species);
  t = t.replace('{年龄段/修行年数}', age);
  t = t.replace('{身形比例}', body);
  t = t.replace('{脸型}', face.split('，')[0]);
  t = t.replace('{五官特征}', face);
  t = t.replace('{头饰}', headwear);
  t = t.replace('{主服}', costume);
  t = t.replace('{配饰}', props.join('、'));
  t = t.replace('{神魔追加：毛发/肤色写实但去恐怖谷，偏水墨动画质感，非照片写实}', isDeityBeast ? '神魔角色：毛发/肤色写实但去恐怖谷，偏水墨动画质感，非照片写实' : '');
  t = t.replace('{年代质感}', '年代质感考究');
  t = t.replace('{体型}', body);
  t = t.replace('{四肢/特征细节}', body);
  t = t.replace('{手持/背负兵器法宝}', '手持' + props.join('、'));
  return t;
}

// === 运行示例 ===
console.log('=== 示例 1：第12难角色清单 ===');
getDifficultyCharacters(12).forEach(c => {
  console.log(' ', c.role.padEnd(12), c.name);
});

console.log('\n=== 示例 2：唐僧提示词（截取） ===');
const ts = getCharacterPrompt('唐僧');
console.log('  id:', ts.id, '| type:', ts.type, '| anchors:', ts.anchors.join('/'));
console.log('  prompt 长度:', ts.prompt.length, '字符');

console.log('\n=== 示例 3：神魔角色（去恐怖谷） ===');
getCharactersByType('deity_beast').forEach(c => console.log(' ', c.name));

console.log('\n=== 示例 4：模板填充新角色（沙僧） ===');
const shaPrompt = fillTemplate('沙僧', '卷帘大将转世', '修行千年', '身长壮硕', '蓝靛脸，红发，络腮胡', '卷檐帽', '黑僧袍', ['月牙铲'], true);
console.log('  ', shaPrompt.slice(0, 80) + '...');

console.log('\n=== 数据加载成功 ===');
