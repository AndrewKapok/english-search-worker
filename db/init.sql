-- D1数据库初始化

-- 创建表结构
-- 创建单词表
CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建句子表
CREATE TABLE IF NOT EXISTS sentences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建词组表
CREATE TABLE IF NOT EXISTS phrases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引以提高搜索性能
CREATE INDEX IF NOT EXISTS idx_words_key ON words(key);
CREATE INDEX IF NOT EXISTS idx_sentences_key ON sentences(key);
CREATE INDEX IF NOT EXISTS idx_phrases_key ON phrases(key);


-- 插入数据
-- 插入words数据
DELETE FROM words;
INSERT OR IGNORE INTO words (key, content) VALUES ('compare', '*v.* 比较；对比；与…类似(或相似)；将…比作；表明…与…相似

	*n.* 比较

	第三人称单数：compares

	现在进行时：comparing

	过去式：compared

	过去分词：compared

	* compare A with B
		比较A和B');
INSERT OR IGNORE INTO words (key, content) VALUES ('damage', '*n.* (有形的)损坏，破坏，损失；损害；伤害；(法院判定的)损害赔偿金
	*vt.* 损害；破坏；伤害；毁坏');
INSERT OR IGNORE INTO words (key, content) VALUES ('embarrassed', '*adj.* 尴尬；(尤指在社交场合)窘迫的；害羞的；拮据的；经济困难的
     *v.* (尤指在社交场合)使窘迫；使为难；使困惑；使陷入困境
     embarrass的过去分词和过去式');
INSERT OR IGNORE INTO words (key, content) VALUES ('fight', '*v.* 战斗；作战；打架；参加(竞赛)；参加（拳击比赛）；打斗；打仗；竞争；搏斗；努力争取；争辩；极力反对；（为…）和某人打官司
	*n.* 战斗；斗争；打架；(尤指体育运动)比赛，竞赛；打斗；搏斗；争论；斗志

	* 第三人称单数：fights
	* 现在进行时：fighting
	* 过去式：fought
	* 过去分词：fought
	* 派生词：*n.* fighting');
INSERT OR IGNORE INTO words (key, content) VALUES ('launch', '`动词+名词短语`

1. 开始从事，发起，发动（尤指有组织的活动）

  		to start an activity, especially an organized one

  		to launch an appeal/an inquiry/an investigation/a campaign
  		开始进行上诉 / 质询 / 调查 / 一场运动

  		to launch an attack/invasion
  		发起攻击；发动侵略

  2. （首次）上市，发行

  		to make a product available to the public for the first time

  3. 使（船，尤指新船）下水

  		to put a ship or boat into the water, especially one that has just been built

  4. 发射；把（航天器、武器等）发射上天；水中发射

  		to send sth such as a spacecraft , weapon, etc. into space, into the sky or through water

  		to launch a communications satellite
  		发射通信卫星

  		to launch a missile/rocket/torpedo
  		发射导弹 / 火箭 / 鱼雷

  5. ~ yourself at, from, etc. sth | ~ yourself forwards, etc.

  		to jump forwards with a lot of force
  		猛扑向前
  6. `通常用单数形式` （航天器的）发射；（船的）下水；（产品的）上市；（事件的）发起

  		the action of launching sth; an event at which sth is launched

  7. 大型汽艇；机动大舢板；交通艇


  		a large boat with a motor');
INSERT OR IGNORE INTO words (key, content) VALUES ('Palestine', '*n.* 巴勒斯坦 (专有名词)');
INSERT OR IGNORE INTO words (key, content) VALUES ('success', '*n.* 成功；胜利；成功的人(或事物)；成名；发财');
INSERT OR IGNORE INTO words (key, content) VALUES ('successful', '*adj.* 成功的；有成就的；有成效的；达到目的

  比较级：more successful

  最高级：most successful

  派生词：successfully adv.');
INSERT OR IGNORE INTO words (key, content) VALUES ('seldom', '*adv.* 不常；难得；很少

  *adj.* 不常有的，很少的，难得的');
INSERT OR IGNORE INTO words (key, content) VALUES ('luxurious', '*adj.* 奢侈的；十分舒适的');
INSERT OR IGNORE INTO words (key, content) VALUES ('artistic', '*adj.*  艺术的；艺术家的；精美的；有艺术性的；有艺术天赋的；(尤指)有美术才能的');
INSERT OR IGNORE INTO words (key, content) VALUES ('creative', '*adj.*   创造性的；(尤指艺术作品)创作的；有创造力的；表现创造力的
    *n.* 创意；创作素材；搞创作的人；富于创造力的人

    复数：creatives

    派生词：*adv.* creatively

    		*n.* creativity');
INSERT OR IGNORE INTO words (key, content) VALUES ('practical', '实用的');
INSERT OR IGNORE INTO words (key, content) VALUES ('cost \ pay \ spend', '“cost”、“pay”和“spend”这三个词在英语中都与“花费”有关，但它们在用法和含义上存在显著的差异。');
INSERT OR IGNORE INTO words (key, content) VALUES ('cost', '* 意为“花费，需”，**侧重于表示某物或某项活动的价值或价格。**

    	* 主要用于**描述某物的价格或成本**，主语是**物或活动**。其常用结构为“sth. cost sb. money”，表示“某物花了某人多少钱”。

    	* at the cost of（以…为代价）at any cost（不惜任何代价）等。');
INSERT OR IGNORE INTO words (key, content) VALUES ('pay', '* 意为“支付，付”，**强调支付动作本身**，只用于**钱**。

    	* 主语通常是**人**，常用结构为“pay…for…”，表示“为…支付…”。

    	* “pay”还可以表示“付款给某人”、“报答或回报”等含义，如“pay you the money tomorrow”（明天把钱付给你）、“pay him back for his kindness”（报答了他的好意）。此外，“pay”在固定短语中也有多种用法，如“pay someone a visit”（拜访）、“pay attention”（注意）等。');
INSERT OR IGNORE INTO words (key, content) VALUES ('spend', '* 意为“花费”，通常用于**描述某人主动花费时间或金钱去做某事**。

    	* 主语是**人**，强调**花费的过程和目的**。其用法非常多样，主要包括两种结构：一是“spend time/money (in) doing sth.”，表示花费时间或金钱去做某事，其中“in”在口语中常可省略；二是“spend time/money on sth.”，表示在某物或活动上花费时间或金钱。

    	* “spend”还可以与介词或副词搭配使用，表达不同的含义，如“spend the weekend with friends”（和朋友共度周末）。

    4. 句子中的位置与语法功能
    	* 在句子中，“spend”和“pay”的主语通常是**人**，而“cost”的主语则是**物或活动**。

    	* 从动作的主动性来看，“spend”和“pay”强调**主动**花费或支付，而“cost”则强调**被动**花费或需要。

    	* 在语法功能上，“spend”和“pay”可以作为**及物动词**或**不及物动词**使用，而“cost”则主要用作**及物动词**。');
INSERT OR IGNORE INTO words (key, content) VALUES ('popular', '受欢迎的');
INSERT OR IGNORE INTO words (key, content) VALUES ('eleven-year-old', '*adj.* 十一岁的');
INSERT OR IGNORE INTO words (key, content) VALUES ('more', '（数、量等）更多的，更大的');
INSERT OR IGNORE INTO words (key, content) VALUES ('few', '*adj.* 很少');
INSERT OR IGNORE INTO words (key, content) VALUES ('push', '/ **pull**

    *v.* 推 / *v.* 拉');
INSERT OR IGNORE INTO words (key, content) VALUES ('immediately', '/ɪˈmiːdiətli/

    *adv.* 立即；马上；即刻；紧接；附近；接近；直接地；紧接地

    *conj.* 一…就；即刻');
INSERT OR IGNORE INTO words (key, content) VALUES ('temperature', '*n.* 温度');
INSERT OR IGNORE INTO words (key, content) VALUES ('commen', '/ˈkɑːmən/

    *adj.* 常见的；共同的；普通的；普遍的；通常的；共享的；共有的；平常的；寻常的；平凡的；粗俗的

    *n.* 公共用地；公地；(学校、大学等的)学生公共食堂

    复数：commons

    比较级：commoner

    最高级：commonest');
INSERT OR IGNORE INTO words (key, content) VALUES ('disabulity', '消失');
INSERT OR IGNORE INTO words (key, content) VALUES ('disadvantage', '不利因素，缺点');
INSERT OR IGNORE INTO words (key, content) VALUES ('disagree', '不同意');
INSERT OR IGNORE INTO words (key, content) VALUES ('disappear', '消失，失踪');
INSERT OR IGNORE INTO words (key, content) VALUES ('disabled', '有残疾的，没能力的');
INSERT OR IGNORE INTO words (key, content) VALUES ('disappoint', '使失望');
INSERT OR IGNORE INTO words (key, content) VALUES ('discover', '发现');
INSERT OR IGNORE INTO words (key, content) VALUES ('discuss', '1.  讨论
    2.  详述');
INSERT OR IGNORE INTO words (key, content) VALUES ('disgrace', '耻辱；不光彩');
INSERT OR IGNORE INTO words (key, content) VALUES ('dish', '碟子');


-- 插入sentences数据
DELETE FROM sentences;
INSERT OR IGNORE INTO sentences (key, content) VALUES ('Not just...,it is ....', '不只是...而是....');
INSERT OR IGNORE INTO sentences (key, content) VALUES ('work hard is the best color of youth', '奋斗是青春最靓丽的底色');
INSERT OR IGNORE INTO sentences (key, content) VALUES ('Over the past 75 years', '在过去的75年中');
INSERT OR IGNORE INTO sentences (key, content) VALUES ('That is a diffrent story', '那又是另一回事了');


-- 插入phrases数据
DELETE FROM phrases;
INSERT OR IGNORE INTO phrases (key, content) VALUES ('leave their home', '离开他们的家');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('want to do sth.', '想要做某事');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('more quickly than...', '比...更快');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('the few', '少数人；少数派');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('spend a lot of time / money on it', '在...事上花费了很多 时间 / 金钱');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('isn''t bad for', '不是坏的');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('check this book out', '借阅这本书');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('be good at', '* 表示“擅长于，在某方面做得好”。它用于描述某人在某个领域、技能或活动上表现出的优异能力。
		* 通常后面接名词、代词或动名词（动词-ing形式），表示擅长的具体活动或技能。');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('be good with', '* 表示“与……相处得好”或“擅长处理……”。它用于描述某人与其他人或事物之间的和谐关系，或者某人在处理特定任务时所展现出的高超能力。
		* 通常后面接名词，表示与之相处融洽的人或物，或擅长处理的事务');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('be good for', '* 表示“对……有益”或“对……有好处”。它用于描述某物或某事对另一物或某事具有积极的影响或益处。
		* 通常后面接名词或动名词作宾语，表示对某人或某事物有益的事物或活动。');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('just now', '刚才');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('the other day', '不久前的一天');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('protect...from...', '保护...免遭...');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('head back to school', '返校');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('get hurt', '受伤');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('take in', '吸收');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('show pictures', '展示照片');
INSERT OR IGNORE INTO phrases (key, content) VALUES ('show calligraphy', '/kəˈlɪɡrəfi/

	展示书法作品');


-- 完成初始化
SELECT 'Database initialized successfully' AS status;
