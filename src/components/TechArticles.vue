<script setup>
import { ref, onMounted, computed } from 'vue';
import { RefreshCw, BookOpen } from 'lucide-vue';

const articles = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedTech = ref('all');

const API_URL = 'https://api.example.com/articles';

const technologies = [
  { id: 'all', name: 'Tous' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'csharp', name: 'C#' }
];

const filteredArticles = computed(() => {
  if (selectedTech.value === 'all') {
    return articles.value;
  }
  return articles.value.filter(article => article.technology === selectedTech.value);
});

const fetchArticles = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erreur lors de la récupération des articles');
    
    articles.value = await response.json();
  } catch (e) {
    error.value = e.message;
    articles.value = [
      // Articles de démonstration
    ];
  } finally {
    loading.value = false;
  }
};

const refreshArticles = () => {
  fetchArticles();
};

onMounted(() => {
  fetchArticles();
});
</script>
<template>
  <section class="bg-white rounded-lg shadow-md p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Articles Tech</h2>
      <button 
    @click="refreshArticles"
    class="text-blue-600 hover:text-blue-800 flex items-center gap-2"
    :disabled="loading"
  >
    <RefreshCw :class="{ 'animate-spin': loading }" size="20" />
    Actualiser
  </button>
</div>

<div class="flex gap-2 mb-6 overflow-x-auto pb-2">
  <button
    v-for="tech in technologies"
    :key="tech.id"
    @click="selectedTech = tech.id"
    :class="[
      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
      selectedTech === tech.id
        ? 'bg-blue-600 text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    ]"
  >
    {{ tech.name }}
  </button>
</div>

<div v-if="error" class="text-red-600 mb-4">
  {{ error }}
</div>

<div class="space-y-6">
  <article
    v-for="article in filteredArticles"
    :key="article.id"
    class="border-l-4 border-blue-600 pl-4 hover:bg-gray-50 transition-colors"
  >
    <div class="flex justify-between items-start">
      <h3 class="font-semibold text-lg text-gray-900">
        {{ article.title }}
      </h3>
      <span 
        :class="[
          'text-xs px-2 py-1 rounded-full',
          {
            'bg-yellow-100 text-yellow-800': article.technology === 'javascript',
            'bg-blue-100 text-blue-800': article.technology === 'typescript',
            'bg-purple-100 text-purple-800': article.technology === 'csharp'
          }
        ]"
      >
        {{ technologies.find(t => t.id === article.technology)?.name }}
      </span>
    </div>
    
    <p class="text-gray-600 mt-2">{{ article.description }}</p>
    
    <div class="flex items-center justify-between mt-3 text-sm">
      <div class="text-gray-500">
        {{ new Date(article.date).toLocaleDateString() }} • {{ article.readTime }}
      </div>
      
      <a 
        :href="article.url"
        target="_blank"
        class="flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        <BookOpen size="16" />
        Lire l'article
      </a>
    </div>
  </article>
</div>

<div v-if="loading && !articles.length" class="text-center py-8 text-gray-600">
  Chargement des articles...
</div>

<div v-if="!loading && !filteredArticles.length" class="text-center py-8 text-gray-600">
  Aucun article trouvé pour cette technologie.
</div>
</section>
</template>
