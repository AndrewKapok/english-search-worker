// D1数据库操作类
class SearchIndex {
  constructor(db) {
    this.db = db;
    this.words = [];
    this.sentences = [];
    this.phrases = [];
    this.isLoaded = false;
  }

  // 初始化数据库表结构
  async initDatabase() {
    try {
      // 创建单词表
      await this.db.prepare(`
        CREATE TABLE IF NOT EXISTS words (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // 创建句子表
      await this.db.prepare(`
        CREATE TABLE IF NOT EXISTS sentences (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // 创建词组表
      await this.db.prepare(`
        CREATE TABLE IF NOT EXISTS phrases (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();

      // 创建索引
      await this.db.prepare('CREATE INDEX IF NOT EXISTS idx_words_key ON words(key)').run();
      await this.db.prepare('CREATE INDEX IF NOT EXISTS idx_sentences_key ON sentences(key)').run();
      await this.db.prepare('CREATE INDEX IF NOT EXISTS idx_phrases_key ON phrases(key)').run();

      console.log('数据库表结构初始化完成');
    } catch (error) {
      console.error('初始化数据库失败:', error);
    }
  }

  // 从数据库加载数据
  async loadData() {
    if (this.isLoaded) return;
    
    try {
      // 先初始化数据库表结构
      await this.initDatabase();

      // 加载单词数据
      const wordsResult = await this.db.prepare('SELECT key, content FROM words').all();
      this.words = wordsResult.results.map(item => ({
        key: item.key,
        content: item.content,
        type: 'word',
        searchText: (item.key + ' ' + item.content).toLowerCase()
      }));

      // 加载句子数据
      const sentencesResult = await this.db.prepare('SELECT key, content FROM sentences').all();
      this.sentences = sentencesResult.results.map(item => ({
        key: item.key,
        content: item.content,
        type: 'sentence',
        searchText: (item.key + ' ' + item.content).toLowerCase()
      }));

      // 加载词组数据
      const phrasesResult = await this.db.prepare('SELECT key, content FROM phrases').all();
      this.phrases = phrasesResult.results.map(item => ({
        key: item.key,
        content: item.content,
        type: 'phrase',
        searchText: (item.key + ' ' + item.content).toLowerCase()
      }));

      this.isLoaded = true;
      console.log('数据加载完成:', {
        words: this.words.length,
        sentences: this.sentences.length,
        phrases: this.phrases.length
      });
    } catch (error) {
      console.error('加载数据失败:', error);
      // 使用默认空数据
      this.words = [];
      this.sentences = [];
      this.phrases = [];
      this.isLoaded = true;
    }
  }

  // 搜索函数
  async search(query, type = 'all', limit = 20) {
    await this.loadData();
    
    if (!query || query.trim() === '') {
      return { words: [], sentences: [], phrases: [], total: 0 };
    }

    const lowerQuery = query.toLowerCase().trim();
    const results = {
      words: [],
      sentences: [],
      phrases: []
    };

    // 搜索单词
    if (type === 'all' || type === 'word') {
      results.words = this.searchInArray(this.words, lowerQuery, limit);
    }

    // 搜索句子
    if (type === 'all' || type === 'sentence') {
      results.sentences = this.searchInArray(this.sentences, lowerQuery, limit);
    }

    // 搜索词组
    if (type === 'all' || type === 'phrase') {
      results.phrases = this.searchInArray(this.phrases, lowerQuery, limit);
    }

    const total = results.words.length + results.sentences.length + results.phrases.length;

    return {
      ...results,
      total
    };
  }

  // 在数组中搜索并排序
  searchInArray(array, query, limit) {
    const scored = array.map(item => {
      const score = this.calculateScore(item, query);
      return { ...item, score };
    }).filter(item => item.score > 0);

    // 按分数排序并限制数量
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ searchText, score, ...rest }) => rest);
  }

  // 计算匹配分数
  calculateScore(item, query) {
    const key = item.key.toLowerCase();
    const content = item.content.toLowerCase();
    let score = 0;

    // 完全匹配键名，分数最高
    if (key === query) {
      score += 100;
    }
    // 键名开头匹配
    else if (key.startsWith(query)) {
      score += 80;
    }
    // 键名包含匹配
    else if (key.includes(query)) {
      score += 60;
    }
    // 内容开头匹配
    else if (content.startsWith(query)) {
      score += 40;
    }
    // 内容包含匹配
    else if (content.includes(query)) {
      score += 20;
    }

    return score;
  }

  // 获取搜索建议
  async getSuggestions(query, limit = 10) {
    await this.loadData();
    
    if (!query || query.trim() === '') {
      return [];
    }

    const lowerQuery = query.toLowerCase().trim();
    const suggestions = [];

    // 从所有数据中获取建议
    const allItems = [...this.words, ...this.sentences, ...this.phrases];
    
    for (const item of allItems) {
      if (suggestions.length >= limit) break;
      
      const key = item.key.toLowerCase();
      if (key.includes(lowerQuery)) {
        suggestions.push({
          type: item.type,
          text: item.key,
          match: this.extractMatchText(item.key, lowerQuery)
        });
      }
    }

    return suggestions;
  }

  // 提取匹配文本
  extractMatchText(text, query) {
    const lowerText = text.toLowerCase();
    const index = lowerText.indexOf(query);
    if (index === -1) return text;
    
    const start = Math.max(0, index - 10);
    const end = Math.min(text.length, index + query.length + 10);
    let result = text.substring(start, end);
    
    if (start > 0) result = '...' + result;
    if (end < text.length) result = result + '...';
    
    return result;
  }
}

// 创建单例
let searchIndex = null;

export function getSearchIndex(db) {
  if (!searchIndex) {
    searchIndex = new SearchIndex(db);
  }
  return searchIndex;
}

export { SearchIndex };
