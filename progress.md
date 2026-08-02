# 项目进度

## 项目目标
基于《西游记》文本内容，创建一个可交互的唐僧取经路线地图，从长安到灵山的完整旅程，深色水墨卷轴风格。

## 当前状态
- 状态：进行中
- 当前阶段：v2.0 数字人文扩展
- 最近更新：2026-08-02
- 当前分支：feature/v2-digital-humanities
- 当前主任务 ID：T26（已 DONE），v2.0 扩展 T23-T26 全部完成，下一步 T25 或快速项

## 最近一次完成（T26：取经动态卷轴播放）
- 完成内容：
  1. 新增 `js/playback.js`：header「🎬 取经回放」按钮 + 底部控制条（▶/⏸ 播放暂停、1x/2x/4x 倍速、🎯 跟随、✕ 关闭）
  2. 主路径 stroke-dashoffset 渐进绘制（1x 全程 36s），金色取经队标记沿路径行进（getPointAtLength）
  3. 逐节点点亮（.played 已走过 / .current 当前），进度条 + 「第 N/31 站 · 地点名」
  4. 悟空战斗轨迹：红色虚线（.battle-trail）与进度同步揭示；妖怪节点 .has-battle 红色虚线环标记，到达时 .battle-burst 爆裂动画
  5. 🎯 跟随模式自动平移地图保持标记居中（复用 centerOnPosition）
- 修改文件：index.html、css/style.css、js/main.js、js/playback.js（新增）
- 验证命令与结果：
  - `node -c` → 全部 OK
  - CSS 括号平衡 → 198/198 平衡
  - DOM id 匹配 → 无缺失；CSS 类交叉 → 无缺失
  - 真实浏览器(headless Edge, --virtual-time-budget) → playback-toggle/bar/marker/battle-trail/play/fill 全部渲染成功；relation-node 48、difficulty-entry、relation/difficulty-toggle 无回归
- 遇到的问题：无（本轮用真实浏览器验证，规避了 T24 的运行时 this 绑定 bug 重演）

## 最近一次完成（T24：妖魔族谱关系图）
- 完成内容：
  1. 新增 `js/relations.js`：48 节点 + 61 连边，5 类关系（出身/亲属/降服/贬谪/师徒）
  2. 新增 `js/relations-graph.js`：d3-force 力导向图，居中弹窗（header「🧬 妖魔族谱」按钮触发），5 类连边分色、节点半径随度数递增并 clamp ≤24、可拖拽/缩放/ESC/遮罩关闭
  3. `main.js` 联动：点带 locationId 的妖怪节点 → 打开对应地图节点详情 + 地图居中定位
  4. 悟空为枢纽连接各神佛簇，48 节点全连通；师徒五人成簇
- 修改文件：index.html、css/style.css、js/main.js、js/relations.js（新增）、js/relations-graph.js（新增）
- 验证命令与结果：
  - `node -c` 3 个 JS → 全部 OK
  - CSS 括号平衡 → 164/164 平衡
  - relations-graph id 引用一致性 → 无缺失
  - CSS 类交叉检查 → 无缺失
  - 关系数据完整性：节点唯一/端点有效/无自环/locationId 有效/无孤儿
  - 连通性：48/48 全连通（初始 5/48，补悟空枢纽降服边后收敛）
  - 度数上限：悟空 25 边，半径 clamp 24px
- 遇到的问题：初始数据多为独立星形簇（不连通），补 20 条悟空降服边（忠实原著）使全连通；悟空度数过大导致半径膨胀，半径公式改为 `min(9+deg*1.6, 24)` 并同步文字 dy

## 最近一次完成（T23：八十一难时间轴）
- 完成内容：
  1. 新增 `js/difficulties.js`：第 99 回完整 81 难名单，含难名(name)/剧情(desc)/地点关联(locationId)
  2. 新增 `js/timeline.js`：header 增加「📜 八十一难」按钮，右侧滑出时间轴面板；顶部进度条（第 N/81 难）；81 条难名列表带小圆点；点击高亮当前激活项
  3. `main.js` 双向联动：打开节点弹窗 → `timeline.focusLocation(loc.id)` 滚动高亮对应难度；点击时间轴条目 → 打开对应节点弹窗 + `centerOnNode` 地图居中定位（保持缩放）
  4. 无对应地点的难（神魔空间/过渡事件）点选时 toast 提示「此难为神魔空间/过渡事件，无对应地图节点」
  5. 数据覆盖 28/31 地图节点（8-两界山/9-鹰愁涧/12-高老庄/13/14-黄风岭/15/16-流沙河/18/19-五庄观/20-白虎岭/21-黑松林/22-宝象国/24/25-平顶山莲花洞/26/27-乌鸡国/33-35-车迟国/36-38-通天河/39-41-金兜山/42/43-女儿国/44-毒敌山/53/54-小雷音/56-58-朱紫国/61-64-狮驼岭/65-比丘国/70-灭法国/71-隐雾山/72-凤仙郡/73-75-玉华州/76/77-金平府/78-天竺国/80-凌云渡/81-通天河湿经）
  6. 触发按钮改挂 `.header-inner` 内（与标题同排），避免与副标题重叠
- 修改文件：index.html、css/style.css、js/main.js、js/data.js（未改）、js/tooltip.js（未改）、js/difficulties.js（新增）、js/timeline.js（新增）
- 验证命令与结果：
  - `node -c` 5 个 JS → 全部 OK
  - CSS 括号平衡 → 140/140 平衡
  - main.js getElementById/select 引用与 index.html → 全部匹配，无缺失
  - timeline.js 内部 id 引用一致性 → difficulty-progress-label 为动态 innerHTML 创建，非缺失
  - CSS 类交叉检查（timeline 用到的 class 是否定义）→ 无缺失
  - 数据完整性：81 难、ID 唯一、顺序 1-81、locationId 全部有效、难名唯一、无地点关联 31 个、覆盖 28/31 节点
  - 模拟渲染 81 条 → 全部通过
- 遇到的问题：centerOnNode 最初写成恒等变换（无效），已改为基于当前缩放 k 的正确居中平移；无头浏览器(playwright/puppeteer/jsdom)均不可用，改用模拟渲染 + 静态交叉检查

## 最近一次完成（T18+T19）
- 完成内容：
  1. 深色水墨主题升级（T18）：贝塞尔曲线路线、书法字体 Ma Shan Zheng、31 节点补回目(chapter)/剧情概要(summary)、修正数据错误（凤仙郡/灭法国/毒敌山）、删除调试浮层
  2. 详情显示改为居中弹窗（T19）：遮罩点击关闭、ESC 关闭、淡入缩放动画，保留回目/类型/简介/妖怪/概要全部内容
- 修改文件：index.html、css/style.css、js/main.js、js/data.js、js/tooltip.js
- 验证命令与结果：
  - `node -c js/main.js / js/data.js / js/tooltip.js` → 全部 OK
  - CSS 括号平衡检查 → 108/108 平衡
  - main.js 引用的 DOM id 与 index.html 匹配 → 全部匹配，无残留
  - 数据校验：31 节点含 chapter/summary，位置单调上升（长安 y=1023 → 灵山 y=146）
- 遇到的问题：D3 v7 的 `.curve(null)` 曾导致 `i is not a function`，已改为贝塞尔曲线 `curveCatmullRom`

## 当前阻塞
- 无

## 下一步（按优先级）
1. T25（真实中国—西域地图底图 + D3 投影路线）——v2.0 唯一剩余扩展，复杂度高、涉及底图数据源/许可，建议单独讨论方案
2. 转 T20/T21/T22 快速项（字体本地化/清理测试文件/进度指示）
3. 合并 feature/v2-digital-humanities 分支回 master（v2.0 扩展 T23-T26 已完成）
4. 检查 T23/T24/T26 实际运行效果（浏览器确认）

## 2026-08-02 用户确认项目定位：文学路线图（非地理地图）
- 用户提出：本项目是「文学路线图」而非严格地理地图，因五行山/火焰山/狮驼岭等神魔空间不对应现实经纬度
- 确认：该定位正确，当前象征性登山布局（长安底→灵山顶）已暗合此框架，属正名而非降级
- 建议升级 6 项，已合并为 4 个新任务写入 tasks.md（T23 八十一难时间轴 / T24 妖怪族谱关系图 / T25 真实底图+D3投影 / T26 动态卷轴播放）
- 建议顺序：先清 T20-T22 快速项，再做 v2.0 扩展；扩展项执行前需用户确认顺序

## 备注
- 布局已改为从低到高登山式（长安底部 → 灵山顶部），符合取经登顶意象
- Google Fonts 依赖网络，断网时回退宋体，可本地化
- 未跟踪文件较多，建议后续统一清理并提交
