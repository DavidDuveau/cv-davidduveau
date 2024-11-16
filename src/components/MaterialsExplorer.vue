<script setup>
import { ref, computed } from 'vue';
import { materialsService } from '../services';

const processedPeriodicTable = computed(() => {
  return PERIODIC_TABLE.mainGroup.map(row => 
    row.map(element => ({
      element,
      isEmpty: !element,
      color: getElementColor(element),
      isSelected: selectedElements.value.includes(element)
    }))
  );
});

// Configuration des couleurs par groupe d'éléments
const ELEMENT_COLORS = {
  'alkali-metal': 'bg-green-100',         // Métaux alcalins (groupe 1)
  'alkaline-earth': 'bg-blue-100',        // Métaux alcalino-terreux (groupe 2)
  'transition-metal': 'bg-purple-100',     // Métaux de transition
  'post-transition-metal': 'bg-yellow-100', // Métaux pauvres
  'metalloid': 'bg-orange-100',           // Métalloïdes
  'nonmetal': 'bg-red-100',               // Non-métaux
  'halogen': 'bg-pink-100',               // Halogènes
  'noble-gas': 'bg-gray-100',             // Gaz nobles
  'lanthanide': 'bg-indigo-100',          // Lanthanides
  'actinide': 'bg-teal-100'               // Actinides
};

// Structure du tableau périodique
const PERIODIC_TABLE = {
  mainGroup: [
    ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
    ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
    ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
    ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
    ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
    ['Cs', 'Ba', '*', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
    ['Fr', 'Ra', '**', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og']
  ],
  lanthanides: ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
  actinides: ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']
};

// États réactifs
const selectedElements = ref([]);
const searchResults = ref([]);
const loading = ref(false);
const error = ref('');
const selectedMaterial = ref(null);

// Méthodes
const handleElementClick = (element) => {
  if (!element || element === '*' || element === '**') return;
  
  const index = selectedElements.value.indexOf(element);
  if (index === -1) {
    selectedElements.value.push(element);
  } else {
    selectedElements.value.splice(index, 1);
  }
};

const handleSearch = async () => {
  if (selectedElements.value.length === 0) {
    error.value = 'Veuillez sélectionner au moins un élément';
    return;
  }

  loading.value = true;
  error.value = '';
  searchResults.value = [];
  selectedMaterial.value = null;

  try {
    // Maintenant on passe directement le tableau des éléments sélectionnés
    const response = await materialsService.searchMaterials(selectedElements.value);
    
    if (response.data.length === 0) {
      error.value = 'Aucun matériau trouvé pour cette combinaison d\'éléments';
    } else {
      searchResults.value = response.data;
    }
  } catch (e) {
    console.error('Erreur de recherche:', e);
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const viewMaterialDetails = async (materialId) => {
  try {
    loading.value = true;
    const material = await materialsService.getMaterialById(materialId);
    selectedMaterial.value = material;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const formatNumber = (value, precision = 2) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toFixed(precision);
};

const getElementGroup = (element) => {
  // Classification simplifiée des éléments
  const groups = {
    'H': 'nonmetal',
    'He': 'noble-gas',
    'Li': 'alkali-metal',
    'Be': 'alkaline-earth',
    // ... ajoutez d'autres éléments selon les besoins
  };
  return groups[element] || 'transition-metal';
};

const getElementColor = (element) => {
  if (!element || element === '*' || element === '**') return 'bg-gray-100';
  const group = getElementGroup(element);
  return ELEMENT_COLORS[group] || 'bg-gray-100';
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- En-tête -->
      <div class="flex items-center gap-2 mb-6">
        <i class="fas fa-database text-green-600"></i>
        <h1 class="text-2xl font-bold">Materials Explorer</h1>
      </div>

      <!-- Barre de recherche avec éléments sélectionnés -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="flex-1 min-h-[40px] p-2 border rounded-lg bg-gray-50 flex flex-wrap gap-2">
          <span
            v-for="element in selectedElements"
            :key="element"
            class="px-2 py-1 bg-green-100 text-green-800 rounded-full flex items-center gap-1"
          >
            {{ element }}
            <button
              @click="handleElementClick(element)"
              class="hover:bg-green-200 rounded-full w-4 h-4 flex items-center justify-center"
            >
              ×
            </button>
          </span>
        </div>
        <button
          @click="handleSearch"
          :disabled="loading"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 flex items-center gap-2"
        >
          <i class="fas fa-search"></i>
          {{ loading ? 'Recherche...' : 'Rechercher' }}
        </button>
      </div>

      <!-- Tableau périodique -->
  <div class="bg-gray-50 p-4 rounded-lg mb-6">
    <!-- Tableau principal -->
    <div class="grid gap-1">
      <div
        v-for="(row, rowIndex) in processedPeriodicTable"
        :key="`main-${rowIndex}`"
        class="flex gap-1"
      >
        <template v-for="(cell, colIndex) in row" :key="`${rowIndex}-${colIndex}`">
          <button
            v-if="!cell.isEmpty"
            @click="handleElementClick(cell.element)"
            :class="[
              'w-8 h-8 text-xs font-medium rounded flex items-center justify-center transition-colors',
              cell.color,
              cell.isSelected ? 'ring-2 ring-green-500' : ''
            ]"
          >
            {{ cell.element }}
          </button>
          <div v-else class="w-8 h-8"></div>
        </template>
      </div>
    </div>

        <!-- Lanthanides -->
        <div class="mt-4 flex gap-1 ml-16">
          <button
            v-for="element in PERIODIC_TABLE.lanthanides"
            :key="`lanthanide-${element}`"
            @click="handleElementClick(element)"
            :class="[
              'w-8 h-8 text-xs font-medium rounded flex items-center justify-center transition-colors',
              'bg-indigo-100',
              selectedElements.includes(element) ? 'ring-2 ring-green-500' : ''
            ]"
          >
            {{ element }}
          </button>
        </div>

        <!-- Actinides -->
        <div class="mt-1 flex gap-1 ml-16">
          <button
            v-for="element in PERIODIC_TABLE.actinides"
            :key="`actinide-${element}`"
            @click="handleElementClick(element)"
            :class="[
              'w-8 h-8 text-xs font-medium rounded flex items-center justify-center transition-colors',
              'bg-teal-100',
              selectedElements.includes(element) ? 'ring-2 ring-green-500' : ''
            ]"
          >
            {{ element }}
          </button>
        </div>
      </div>

      <!-- Message d'erreur -->
      <div
        v-if="error"
        class="p-4 bg-red-50 text-red-500 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <!-- Résultats de recherche -->
      <div v-if="!selectedMaterial && searchResults.length > 0" class="space-y-4">
        <h2 class="text-lg font-semibold">
          {{ searchResults.length }} résultats trouvés
        </h2>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="material in searchResults"
            :key="material.material_id"
            @click="viewMaterialDetails(material.material_id)"
            class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <h3 class="font-semibold text-lg">{{ material.formula_pretty }}</h3>
            <p class="text-sm text-gray-600">ID: {{ material.material_id }}</p>
            <p class="text-sm text-gray-600">
              Système: {{ material.symmetry?.crystal_system || 'N/A' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Détails du matériau -->
      <div v-if="selectedMaterial" class="space-y-6">
        <button
          @click="selectedMaterial = null"
          class="text-green-600 hover:text-green-700 flex items-center gap-2"
        >
          <i class="fas fa-arrow-left"></i>
          Retour aux résultats
        </button>

        <div class="border-b pb-4">
          <h2 class="text-2xl font-bold">{{ selectedMaterial.formula_pretty }}</h2>
          <p class="text-gray-600">ID: {{ selectedMaterial.material_id }}</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Structure</h3>
            <div class="space-y-2">
              <p><span class="text-gray-600">Système cristallin:</span> {{ selectedMaterial.symmetry?.crystal_system || 'N/A' }}</p>
              <p><span class="text-gray-600">Groupe d'espace:</span> {{ selectedMaterial.symmetry?.symbol || 'N/A' }}</p>
              <p><span class="text-gray-600">Densité:</span> {{ formatNumber(selectedMaterial.density) }} g/cm³</p>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Composition</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="element in selectedMaterial.elements"
                :key="element"
                class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {{ element }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
