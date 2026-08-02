# 项目进度

## 项目目标
基于《西游记》文本内容，创建一个可交互的唐僧取经路线地图，从长安到灵山的完整旅程，深色水墨卷轴风格。

## 当前状态
- 状态：进行中
- 当前阶段：v3.0 八十一难 AI 视频化（T36 动漫风格角色图完成）
- 最近更新：2026-08-02
- 当前分支：master
- 当前主任务 ID：T29（分镜脚本，待开工）

## 最近一次完成（T36：批量重做角色图·中国风动漫）
- 用户反馈：「国风水墨写实」出图太丑 → 切换「中国风精致动漫」（用户确认悟空样图）
- 完成内容：
  1. 风格从'国风水墨写实'切换为'中国风精致动漫'：prompt 模板更新（唯美古风立绘/流畅线条/饱满色彩/2×2四格）
  2. 唐僧/八戒重做（旧水墨风），新增沙僧角色卡（模板填充，蓝靛脸红发+月牙铲）
  3. 4 角色图全部就绪并下载本地
- 验证：864x1152、四格中轴白 91-97% 清晰、动漫饱和色
- 提交：866fb2b

## 最近一次完成（T35：生成角色主体图）
- 完成内容：
  1. 用 Agnes AI (agnes-image-2.1-flash) 生成 唐僧/孙悟空/猪八戒 三张角色主体图（864x1152，国风水墨写实风格）
  2. refImage URL 写回 characters.json 三个角色
  3. refImage 同步到 visual-elements.json 三个角色
  4. 下载到本地 assets/video/refs/（tang-seng.png / sun-wukong.png / zhu-bajie.png）防外部 URL 失效
- 验证：3 张 PNG 有效（864x1152）；JSON refImage 字段完整；本地文件存在
- 提交：b38d132
- 待办：高翠兰/高太公/高才/沙僧 主体图待生成（非标志性角色，可后续批量）
- 备注：Agnes API key 用户已写入系统环境变量（AGNES_API_KEY），本会话需内联使用

## 最近一次完成（T34：数据JSON化）
- 用户需求：将 T27/T28 产出整理为 JSON，方便程序调用
- 完成内容：
  1. `visual-elements.json`：第12难视觉元素结构化（schemaVersion/difficultyId/name/chapter/location/logline/characters 7人/scenes 6场/keyProps 7件/colorPalette/storyHooks）
  2. `characters.json`：角色库结构化（styleKeywords/promptTemplate.common 含全部占位符 + 3角色卡含 id/type/锚点/完整 prompt + notes）
  3. `read-data.js`：程序调用示例——读取JSON、按难取角色、按名取提示词、按type过滤、模板填充新角色（沙僧演示成功）
- 验证：两 JSON 解析 OK、结构字段全齐、占位符完整、模板填充沙僧成功、与 markdown 交叉一致
- 提交：78e88ba

## 最近一次完成（T28：角色库设计）
- 完成内容：
  1. 方案A（国风水墨写实，用户确认）：改造角色卡提示词模板——保留原版四格三视图骨架（头肩肖像+正/侧/背三视图、一致约束、纯净度），风格基调改为国风水墨写实，补唐代服饰/古典神话/去恐怖谷约束
  2. 两档变体：人类角色（水墨写实）/ 神魔角色（去恐怖谷偏水墨动画）
  3. 三张完整角色卡：唐僧（毗卢帽+锦襕袈裟+九环锡杖）、孙悟空（金箍+黄金甲+虎皮裙+金箍棒+火眼金睛）、猪八戒（黑布直裰+包头巾+九齿钉耙+肚大腰圆）
- 验证：三卡完整、锚点全齐、模板结构/风格关键词齐备
- 提交：276bad8
- 待办：参考图生成（Agnes，存 assets/video/refs/，用户确认风格后）

## 最近一次完成（T27：视觉元素清单）
- 完成内容：
  1. 新增 `assets/video/visual-elements.md`：第12难「收降八戒」视觉元素样板 + 可推广 81 难的数据结构
  2. 数据结构：characters（role 枚举 protagonist/boss/deity/mortal/minion、iconic 标志位）、scenes（type 分类）、keyProps、colorPalette、cameraNotes
  3. 第12难提炼：7 人物 / 6 场景 / 8 道具 / 色彩基调 / 5 个镜头钩子（悟空变翠兰红盖头露猴脸、背石头上路、钉耙vs金箍棒、弃耙跪地、朝阳启程）
- 验证：与 difficulties.js/data.js 数据一致、核心元素全覆盖、JSON 示例可解析
- 提交：d41c013

## v3.0 规划（八十一难 AI 视频化，2026-08-02）
- 用户需求：把八十一难用 AI 做成视频。流程：提炼主体/人物/场景/道具 → 生成分镜脚本 → 黑白故事板 → 主体图+故事板共同做成视频
- 已确认策略：
  1. 混合路线：复杂镜头 AI 图生视频，转场/旁白/字幕/空镜 Remotion 合成
  2. 先做 1 支样片（第12难·收降八戒）跑通全流程，再定批量
  3. 画幅优先横屏 16:9
- 流程升级为 6 阶段（相对用户方案补强）：
  ①视觉元素清单 → ②角色库设计（风格一致性核心，防角色漂移） → ③分镜脚本 → ④黑白故事板 → ⑤彩色关键帧 → ⑥样片视频合成
- 关键坑位：角色一致性是生死线（师徒5人+5-6标志妖怪做角色卡，次要妖怪水墨风格化兜底）；黑白故事板是「剧本排练」非视频素材；先样片再批量
- 任务拆分：T27-T33（见 tasks.md）
- 数据基础：js/difficulties.js 已有 81 难难名+剧情

## 最近一次完成（T21：清理未跟踪测试文件）
- 完成内容：
  1. 删除 4 个开发期调试残留：debug-test.html / simple-d3-test.html / svg-transform-test.html / demo.html（已确认用户同意）
  2. 保留 note.txt（原始需求提示词）、test.html（正式功能测试页）
  3. 完善 README.md：补 v2.0 三功能章节、文件结构更新（新增 difficulties/timeline/relations/relations-graph/playback.js）、使用说明、更新日志 v2.0.0
- 修改文件：README.md（完善）、note.txt/test.html（纳入版本控制）
- 验证：README 引用的 12 个文件全部存在，4 个 v2.0 功能关键词齐全；git status 完全干净（无未跟踪/修改文件）
- 提交：fa746a2

## 最近一次修复（T26 播放结束脉动不停止）
- 用户反馈：播放到最后的点一直在跳
- 根因：`.location-node.current` / `.location-node.active` 的 CSS `nodePulse` 无限动画（1.2s infinite），播放到终点后 `.current` 留在灵山节点，动画持续运行 → 一直在跳
- 修复：
  1. 移除 CSS nodePulse 无限动画与 @keyframes，`.current`/`.active` 改静态金色高亮
  2. 脉动全部改 JS 驱动（d3.transition），引入 `_pulseToken` 版本号失效机制：`_stopPulse` 递增 token，所有递归脉动链下一迭代自检退出，彻底停止
- 验证（puppeteer-core + Edge 实测）：4x 速播放到终点，r 值 500ms/1s 均稳定=15 无脉动，playing=false，无错误

## 最近一次修复（T26 播放器二次修复：onVisit 未赋值）
- 用户反馈：爆裂和弹窗还是没有、金色难号没看到、时间轴效果没看到
- 排查：headless Edge dump 无法捕获运行时状态，改用 **puppeteer-core 驱动系统 Edge** 真实交互验证
- 根因：**Playback 构造函数漏读 opts.onVisit**，main.js 注入的 onVisit 恒为 undefined，到达节点时 showDetail 从不触发 → 自动弹窗不工作（爆裂其实已在工作，此前一次修复已生效，但被 onVisit 缺失掩盖）
- 修复：playback.js 构造函数补 `this.onVisit = opts.onVisit`
- 验证（puppeteer-core + Edge 实测）：
  - 播放 t+3s：burst=1（爆裂动画在跑）、modal=true（自动弹窗已开）、进度推进正常
  - 妖魔族谱 open=true、nodes=48、links=61
  - 八十一难面板 open=true、entries=81
  - 无控制台/页面错误
- 注意：verify-final 中妖魔族谱 false 为测试脚本时序问题（关八十一难 overlay 过渡 0.35s 未结束即点族谱，被 overlay 拦截），真实用户操作无此问题

## 最近一次修复（T26 播放器三问题 + 八十一难完整对应）
- 用户反馈：①没有爆裂动画 ②没有自动弹窗 ③八十一难没和路线图完整对应
- 修复内容：
  1. 爆裂动画：实测 CSS 无法动画 SVG 的 `r` 属性（headless Edge 下 animationName 被解析但 r 不变）→ 改用 d3.transition 驱动半径扩张+淡出，结束后自动 remove（同时修复 :last-child 删除 bug）
  2. 自动弹窗：播放器到达节点时通过 onVisit 回调调用 showDetail
  3. 八十一难↔路线图：locationId 支持数组；长安(id1)→难5、两界山(id3)并入难8（[3,2]）；地图节点新增难数标签 .node-diff（30/31 节点标注难号，浮屠山为修行处合理留空）；timeline/main 全面适配 toLocArray/locIds
  4. 节点脉动改 JS 驱动（d3.transition），规避 CSS transform 对 SVG 的不稳支持
- 验证：node -c 全部 OK；CSS 199/199 平衡；locationId 全部有效；真实浏览器(headless Edge)确认 node-diff 31 个标签渲染、抽查长安→5/五行山→8/两界山→8/鹰愁涧→9/高老庄→12 正确，playback/relation/difficulty 无回归

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
1. T28（角色库设计）→ 师徒5人 + 标志妖怪角色卡
2. T29 分镜脚本 → T30 黑白故事板 → T31 彩色关键帧 → T32 样片合成 → T33 批量决策
3. 原快速项 T20（字体本地化）/T22（进度指示）挂起，可在 v3.0 间隙插入
4. T25（真实底图+D3投影）仍挂起，复杂度高，单独讨论

## 2026-08-02 用户确认项目定位：文学路线图（非地理地图）
- 用户提出：本项目是「文学路线图」而非严格地理地图，因五行山/火焰山/狮驼岭等神魔空间不对应现实经纬度
- 确认：该定位正确，当前象征性登山布局（长安底→灵山顶）已暗合此框架，属正名而非降级
- 建议升级 6 项，已合并为 4 个新任务写入 tasks.md（T23 八十一难时间轴 / T24 妖怪族谱关系图 / T25 真实底图+D3投影 / T26 动态卷轴播放）
- 建议顺序：先清 T20-T22 快速项，再做 v2.0 扩展；扩展项执行前需用户确认顺序

## 备注
- 布局已改为从低到高登山式（长安底部 → 灵山顶部），符合取经登顶意象
- Google Fonts 依赖网络，断网时回退宋体，可本地化
- 未跟踪文件较多，建议后续统一清理并提交
