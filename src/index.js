import { getSearchIndex } from './search.js';
import { marked } from 'marked';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 静态文件内容
const staticFiles = {
  '/': {
    content: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>英语学习搜索</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; min-height: 100vh; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; padding-top: 80px; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #1e293b; font-size: 2.5rem; margin-bottom: 10px; }
        .header p { color: #64748b; font-size: 1.1rem; }
        .search-container { background: white; border-radius: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); padding: 8px; margin-bottom: 30px; position: relative; border: 1px solid #e2e8f0; }
        .search-box { display: flex; align-items: center; padding: 12px 20px; }
        .search-icon { width: 24px; height: 24px; color: #94a3b8; margin-right: 12px; flex-shrink: 0; }
        .search-input { flex: 1; border: none; outline: none; font-size: 1.1rem; color: #334155; background: transparent; }
        .search-input::placeholder { color: #94a3b8; }
        .search-btn { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; padding: 10px 24px; border-radius: 20px; font-size: 1rem; cursor: pointer; transition: all 0.3s; }
        .search-btn:hover { background: #e2e8f0; transform: translateY(-1px); }
        .suggestions { position: absolute; top: 100%; left: 0; right: 0; background: white; border-radius: 16px; margin-top: 8px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); max-height: 300px; overflow-y: auto; display: none; z-index: 100; border: 1px solid #e2e8f0; }
        .suggestions.active { display: block; }
        .suggestion-item { padding: 12px 20px; cursor: pointer; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid #f1f5f9; }
        .suggestion-item:last-child { border-bottom: none; }
        .suggestion-item:hover { background: #f8fafc; }
        .suggestion-type { font-size: 0.75rem; padding: 2px 8px; border-radius: 10px; background: #f1f5f9; color: #64748b; text-transform: uppercase; }
        .suggestion-text { flex: 1; color: #334155; }
        .filters { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .filter-btn { padding: 8px 20px; border: 1px solid #e2e8f0; background: white; color: #64748b; border-radius: 20px; cursor: pointer; transition: all 0.3s; font-size: 0.95rem; }
        .filter-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .filter-btn.active { background: #f1f5f9; color: #1e293b; border-color: #cbd5e1; font-weight: 500; }
        .results-container { background: white; border-radius: 20px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); min-height: 200px; border: 1px solid #e2e8f0; }
        .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f1f5f9; }
        .results-title { font-size: 1.2rem; color: #1e293b; font-weight: 600; }
        .results-count { color: #64748b; font-size: 0.9rem; }
        .result-section { margin-bottom: 24px; }
        .result-section:last-child { margin-bottom: 0; }
        .section-title { font-size: 1rem; color: #475569; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-title::before { content: ''; width: 4px; height: 18px; background: #e2e8f0; border-radius: 2px; }
        .result-item { background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 12px; transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; border: 1px solid #f1f5f9; }
        .result-item:hover { transform: translateX(4px); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
        .result-key { font-size: 1.1rem; font-weight: 600; color: #1e293b; margin-bottom: 8px; }
        .result-key mark { background: #fef08a; color: #92400e; padding: 0 4px; border-radius: 3px; }
        .result-content { color: #475569; line-height: 1.6; font-size: 0.95rem; }
        .result-content ul, .result-content ol { margin: 10px 0; padding-left: 20px; }
        .result-content li { margin: 5px 0; }
        .empty-state { text-align: center; padding: 60px 20px; color: #94a3b8; }
        .empty-state svg { width: 80px; height: 80px; margin-bottom: 20px; opacity: 0.5; }
        .empty-state h3 { font-size: 1.2rem; margin-bottom: 8px; color: #64748b; }
        .loading { text-align: center; padding: 40px; }
        .spinner { width: 40px; height: 40px; border: 3px solid #f1f5f9; border-top-color: #cbd5e1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 16px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .container { padding-top: 40px; } .header h1 { font-size: 1.8rem; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>英语学习助手</h1>
            <p>搜索单词、句子、词组，轻松学习英语</p>
        </div>
        <div class="search-container">
            <div class="search-box">
                <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" class="search-input" placeholder="搜索单词、句子或词组..." id="searchInput" autocomplete="off">
                <button class="search-btn" id="searchBtn">搜索</button>
            </div>
            <div class="suggestions" id="suggestions"></div>
        </div>
        <div class="filters">
            <button class="filter-btn active" data-type="all">全部</button>
            <button class="filter-btn" data-type="word">单词</button>
            <button class="filter-btn" data-type="sentence">句子</button>
            <button class="filter-btn" data-type="phrase">词组</button>
        </div>
        <div class="results-container" id="resultsContainer">
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <h3>开始搜索</h3>
                <p>输入关键词查找单词、句子或词组</p>
            </div>
        </div>
    </div>
    <script>
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const suggestions = document.getElementById('suggestions');
        const resultsContainer = document.getElementById('resultsContainer');
        const filterBtns = document.querySelectorAll('.filter-btn');
        let currentFilter = 'all';
        let debounceTimer = null;

        function debounce(func, wait) {
            return function(...args) {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(this, args), wait);
            };
        }

        function highlightText(text, query) {
            if (!query || !text) return text || '';
            const lowerText = (text || '').toLowerCase();
            const lowerQuery = (query || '').toLowerCase();
            let result = text;
            let idx = lowerText.indexOf(lowerQuery);
            let offset = 0;
            while (idx !== -1 && query.length > 0) {
                const before = result.substring(0, idx + offset);
                const match = result.substring(idx + offset, idx + offset + query.length);
                const after = result.substring(idx + offset + query.length);
                result = before + '<mark>' + match + '</mark>' + after;
                offset += 13;
                idx = lowerText.indexOf(lowerQuery, idx + query.length);
            }
            return result;
        }

        async function fetchSuggestions(query) {
            if (!query.trim()) { suggestions.classList.remove('active'); return; }
            try {
                const response = await fetch('/api/suggest?q=' + encodeURIComponent(query));
                const data = await response.json();
                renderSuggestions(data.suggestions || [], query);
            } catch (error) { console.error('Error:', error); }
        }

        function renderSuggestions(items, query) {
            if (items.length === 0) { suggestions.classList.remove('active'); return; }
            const labels = { word: '单词', sentence: '句子', phrase: '词组' };
            suggestions.innerHTML = items.map(item => 
                '<div class="suggestion-item" data-text="' + item.text + '">' +
                '<span class="suggestion-type">' + (labels[item.type] || item.type) + '</span>' +
                '<span class="suggestion-text">' + highlightText(item.match || item.text, query) + '</span>' +
                '</div>'
            ).join('');
            suggestions.classList.add('active');
            suggestions.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchInput.value = item.dataset.text;
                    suggestions.classList.remove('active');
                    performSearch(item.dataset.text);
                });
            });
        }

        async function performSearch(query) {
            if (!query.trim()) { renderEmptyState(); return; }
            resultsContainer.innerHTML = '<div class="loading"><div class="spinner"></div><p>搜索中...</p></div>';
            try {
                const response = await fetch('/api/search?q=' + encodeURIComponent(query) + '&type=' + currentFilter);
                const data = await response.json();
                renderResults(data, query);
            } catch (error) {
                resultsContainer.innerHTML = '<div class="empty-state"><h3>搜索出错</h3><p>请稍后重试</p></div>';
            }
        }

        function renderResults(data, query) {
            const words = data.words || [];
            const sentences = data.sentences || [];
            const phrases = data.phrases || [];
            const total = words.length + sentences.length + phrases.length;
            if (total === 0) {
                resultsContainer.innerHTML = '<div class="empty-state"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><h3>未找到结果</h3><p>尝试使用其他关键词搜索</p></div>';
                return;
            }
            let html = '<div class="results-header"><span class="results-title">搜索结果</span><span class="results-count">共 ' + total + ' 条</span></div>';
            if (words.length > 0) html += renderSection('单词', words, query);
            if (sentences.length > 0) html += renderSection('句子', sentences, query);
            if (phrases.length > 0) html += renderSection('词组', phrases, query);
            resultsContainer.innerHTML = html;
        }

        function renderSection(title, items, query) {
            return '<div class="result-section"><div class="section-title">' + title + '</div>' + 
                items.map(item => {
                    return '<div class="result-item"><div class="result-key">' + highlightText(item.key, query) + '</div><div class="result-content">' + (item.content || '') + '</div></div>';
                }).join('') + '</div>';
        }

        function renderEmptyState() {
            resultsContainer.innerHTML = '<div class="empty-state"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg><h3>开始搜索</h3><p>输入关键词查找单词、句子或词组</p></div>';
        }

        searchInput.addEventListener('input', debounce((e) => fetchSuggestions(e.target.value), 200));
        searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { suggestions.classList.remove('active'); performSearch(searchInput.value); } });
        searchBtn.addEventListener('click', () => { suggestions.classList.remove('active'); performSearch(searchInput.value); });
        document.addEventListener('click', (e) => { if (!e.target.closest('.search-container')) suggestions.classList.remove('active'); });
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.type;
                if (searchInput.value.trim()) performSearch(searchInput.value);
            });
        });
        searchInput.focus();
    </script>
</body>
</html>`,
    contentType: 'text/html;charset=UTF-8'
  }
};

// 静态文件服务
function serveStaticFile(path) {
  const normalizedPath = path === '/' || path === '/index.html' ? '/' : path;
  const file = staticFiles[normalizedPath];
  
  if (file) {
    return new Response(file.content, {
      headers: { 'Content-Type': file.contentType, ...corsHeaders }
    });
  }
  
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain', ...corsHeaders }
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 静态文件服务
    if (path.startsWith('/') && !path.startsWith('/api/')) {
      return await serveStaticFile(path);
    }

    if (path === '/api/search') {
      const query = url.searchParams.get('q') || '';
      const type = url.searchParams.get('type') || 'all';
      const searchIndex = getSearchIndex(env.ENGLISH_DB);
      const results = await searchIndex.search(query, type);
      
      // 处理Markdown渲染
      const renderMarkdown = (text) => {
        if (!text) return '';
        return marked.parse(text);
      };
      
      const processedResults = {
        ...results,
        words: results.words.map(item => ({
          ...item,
          content: renderMarkdown(item.content)
        })),
        sentences: results.sentences.map(item => ({
          ...item,
          content: renderMarkdown(item.content)
        })),
        phrases: results.phrases.map(item => ({
          ...item,
          content: renderMarkdown(item.content)
        }))
      };
      
      return new Response(JSON.stringify({ query, ...processedResults }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (path === '/api/suggest') {
      const query = url.searchParams.get('q') || '';
      const searchIndex = getSearchIndex(env.ENGLISH_DB);
      const suggestions = await searchIndex.getSuggestions(query);
      return new Response(JSON.stringify({ query, suggestions }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};
