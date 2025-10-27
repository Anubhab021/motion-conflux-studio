// --- js/search.js ---
/*
  Motion Conflux Studio - Search Module
  Author: Anubhab Jana
  Description: Fuzzy search functionality using Fuse.js
  Last Updated: 2025-01-27
*/

(function() {
  'use strict';

  // Search configuration
  const SEARCH_CONFIG = {
    keys: ['title', 'description', 'tags', 'category', 'subcategory'],
    threshold: 0.3,
    distance: 100,
    includeScore: true,
    includeMatches: true
  };

  let searchData = [];
  let fuse = null;
  let currentQuery = '';

  // Initialize search module
  const SearchModule = {
    async init() {
      try {
        await this.loadSearchData();
        this.initializeFuse();
        this.bindEvents();
        console.log('Search module initialized successfully');
      } catch (error) {
        console.error('Failed to initialize search module:', error);
      }
    },

    async loadSearchData() {
      try {
        const response = await fetch('/data/search-index.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        searchData = await response.json();
        console.log(`Loaded ${searchData.length} search items`);
      } catch (error) {
        console.error('Failed to load search data:', error);
        // Fallback sample dataset so search works without external JSON
        searchData = [
          {
            title: 'Showreel Highlight',
            description: 'Quick look at recent video, VFX, and motion work.',
            tags: ['video', 'vfx', 'reel'],
            category: 'video',
            subcategory: 'showreel',
            url: '#',
            thumb: './assets/placeholders/placeholder-400x300.jpg'
          },
          {
            title: '3D Character Turntable',
            description: 'Blender model turntable with lighting and materials.',
            tags: ['3d', 'blender', 'model'],
            category: '3d',
            subcategory: 'turntable',
            url: '#',
            thumb: './assets/placeholders/placeholder-400x300.jpg'
          },
          {
            title: 'Poster Series',
            description: 'Graphic design explorations for a brand refresh.',
            tags: ['graphics', 'poster', 'brand'],
            category: 'graphics',
            subcategory: 'branding',
            url: '#',
            thumb: './assets/placeholders/placeholder-400x300.jpg'
          },
          {
            title: 'Compositing Shot',
            description: 'Green-screen keying with light wrap and color match.',
            tags: ['vfx', 'compositing', 'keying'],
            category: 'vfx',
            subcategory: 'comp',
            url: '#',
            thumb: './assets/placeholders/placeholder-400x300.jpg'
          }
        ];
      }
    },

    initializeFuse() {
      if (searchData.length === 0) {
        console.warn('No search data available');
        return;
      }

      try {
        fuse = new Fuse(searchData, SEARCH_CONFIG);
        console.log('Fuse.js initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Fuse.js:', error);
      }
    },

    bindEvents() {
      // Search input events
      const searchInputs = document.querySelectorAll('#site-search, #main-search');
      searchInputs.forEach(input => {
        input.addEventListener('input', this.debounce((e) => {
          this.handleSearch(e.target.value);
        }, 300));

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            this.clearSearch();
          }
        });
      });

      // Click outside to close suggestions
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
          this.hideSuggestions();
        }
      });
    },

    search(query, context = 'all') {
      if (!fuse || !query || query.length < 2) {
        this.hideSuggestions();
        return [];
      }

      currentQuery = query;
      const results = fuse.search(query);
      
      // Limit results for better performance
      const limitedResults = results.slice(0, 8);
      
      this.displaySuggestions(limitedResults, context);
      return limitedResults;
    },

    displaySuggestions(results, context) {
      const suggestionsContainer = document.getElementById('search-suggestions');
      if (!suggestionsContainer) return;

      if (results.length === 0) {
        suggestionsContainer.innerHTML = `
          <div class="search-suggestion">
            <div class="suggestion-content">
              <div class="suggestion-title">No results found</div>
              <div class="suggestion-description">Try different keywords or check spelling</div>
            </div>
          </div>
        `;
        suggestionsContainer.hidden = false;
        return;
      }

      const suggestionsHTML = results.map((result, index) => {
        const item = result.item;
        const score = result.score;
        const matches = result.matches;

        return `
          <div class="search-suggestion" data-index="${index}" data-url="${item.url}">
            <div class="suggestion-thumb">
              <img src="${item.thumb}" alt="${item.title}" loading="lazy" />
            </div>
            <div class="suggestion-content">
              <div class="suggestion-title">${this.highlightMatches(item.title, matches, 'title')}</div>
              <div class="suggestion-description">${this.highlightMatches(item.description, matches, 'description')}</div>
              <div class="suggestion-meta">
                <span class="suggestion-category">${item.category}</span>
                <div class="suggestion-tags">
                  ${item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      suggestionsContainer.innerHTML = suggestionsHTML;
      suggestionsContainer.hidden = false;

      // Bind click events to suggestions
      this.bindSuggestionEvents();
    },

    highlightMatches(text, matches, key) {
      if (!matches) return text;

      const match = matches.find(m => m.key === key);
      if (!match) return text;

      let highlightedText = text;
      match.indices.forEach(([start, end]) => {
        const before = highlightedText.substring(0, start);
        const match = highlightedText.substring(start, end + 1);
        const after = highlightedText.substring(end + 1);
        highlightedText = `${before}<mark>${match}</mark>${after}`;
      });

      return highlightedText;
    },

    bindSuggestionEvents() {
      const suggestions = document.querySelectorAll('.search-suggestion');
      suggestions.forEach((suggestion, index) => {
        suggestion.addEventListener('click', () => {
          const url = suggestion.getAttribute('data-url');
          if (url) {
            window.location.href = url;
          }
        });

        suggestion.addEventListener('mouseenter', () => {
          this.setActiveSuggestion(index);
        });
      });
    },

    setActiveSuggestion(index) {
      const suggestions = document.querySelectorAll('.search-suggestion');
      suggestions.forEach((suggestion, i) => {
        suggestion.classList.toggle('active', i === index);
      });
    },

    hideSuggestions() {
      const suggestionsContainer = document.getElementById('search-suggestions');
      if (suggestionsContainer) {
        suggestionsContainer.hidden = true;
      }
    },

    clearSearch() {
      const searchInputs = document.querySelectorAll('#site-search, #main-search');
      searchInputs.forEach(input => {
        input.value = '';
        input.focus();
      });
      this.hideSuggestions();
    },

    handleSearch(query) {
      if (query.length < 2) {
        this.hideSuggestions();
        return;
      }

      this.search(query);
    },

    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SearchModule.init());
  } else {
    SearchModule.init();
  }

  // Expose to global scope
  window.SearchModule = SearchModule;
})();