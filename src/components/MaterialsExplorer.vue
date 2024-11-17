<script setup>
import { ref, computed } from 'vue';
import { materialsService } from '../services';
import { Database, Search, ArrowLeft } from 'lucide-vue-next';

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

// Configuration des couleurs par groupe d'éléments avec majuscules
const ELEMENT_GROUPS = {
  'Li': 'alkali-metal',
  'Na': 'alkali-metal',
  'K': 'alkali-metal',
  'Rb': 'alkali-metal',
  'Cs': 'alkali-metal',
  'Fr': 'alkali-metal',
  'Be': 'alkaline-earth',
  'Mg': 'alkaline-earth',
  'Ca': 'alkaline-earth',
  'Sr': 'alkaline-earth',
  'Ba': 'alkaline-earth',
  'Ra': 'alkaline-earth',
  'He': 'noble-gas',
  'Ne': 'noble-gas',
  'Ar': 'noble-gas',
  'Kr': 'noble-gas',
  'Xe': 'noble-gas',
  'Rn': 'noble-gas',
  'Og': 'noble-gas',
  'F': 'halogene',
  'Cl': 'halogene',
  'Br': 'halogene',
  'I': 'halogene',
  'C': 'chnopss',
  'H': 'chnopss',
  'N': 'chnopss',
  'O': 'chnopss',
  'P': 'chnopss',
  'S': 'chnopss',
  'Se': 'chnopss',
  'B': 'metalloid',
  'Si': 'metalloid',
  'Ge': 'metalloid',
  'Sb': 'metalloid',
  'As': 'metalloid',
  'Te': 'metalloid',
  'At': 'metalloid',
  'Zn': 'metal',
  'Cd': 'metal',
  'Hg': 'metal',
  'Al': 'metal',
  'Ga': 'metal',
  'In': 'metal',
  'Tl': 'metal',
  'Sn': 'metal',
  'Pb': 'metal',
  'Bi': 'metal',
  'Po': 'metal',
  'Sc': 'metal-transition',
  'Ti': 'metal-transition',
  'V': 'metal-transition',
  'Cr': 'metal-transition',
  'Mn': 'metal-transition',
  'Fe': 'metal-transition',
  'Co': 'metal-transition',
  'Ni': 'metal-transition',
  'Cu': 'metal-transition',
  'Y': 'metal-transition',
  'Zr': 'metal-transition',
  'Nb': 'metal-transition',
  'Mo': 'metal-transition',
  'Tc': 'metal-transition',
  'Ru': 'metal-transition',
  'Rh': 'metal-transition',
  'Pd': 'metal-transition',
  'Ag': 'metal-transition',
  'Hf': 'metal-transition',
  'Ta': 'metal-transition',
  'W': 'metal-transition',
  'Re': 'metal-transition',
  'Os': 'metal-transition',
  'Ir': 'metal-transition',
  'Pt': 'metal-transition',
  'Au': 'metal-transition',
  'Rf': 'metal-transition',
  'Db': 'metal-transition',
  'Sg': 'metal-transition',
  'Bh': 'metal-transition',
  'Hs': 'metal-transition',
  'Cn': 'metal-transition',
  // Ajoutez d'autres éléments selon les besoins
};

const PERIODIC_TABLE = {
  mainGroup: [
    ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
    ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
    ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
    ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
    ['Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe'],
    ['Cs', 'Ba', 'La', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn'],
    ['Fr', 'Ra', 'Ac', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og']
  ],
  lanthanides: ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
  actinides: ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr']
};

const selectedElements = ref([]);
const searchResults = ref([]);
const loading = ref(false);
const error = ref('');
const selectedMaterial = ref(null);

const handleElementClick = (element) => {
  if (!element) return;
  
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
    const response = await materialsService.searchMaterials(selectedElements.value);
    searchResults.value = response.data;
    
    if (response.data.length === 0) {
      error.value = 'Aucun matériau trouvé pour cette combinaison d\'éléments';
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
    error.value = '';
    const material = await materialsService.getMaterialById(materialId);
    selectedMaterial.value = material;
  } catch (e) {
    console.error('Erreur de chargement du matériau:', e);
    error.value = e.message || 'Erreur lors de la récupération du matériau';
  } finally {
    loading.value = false;
  }
};

const formatNumber = (value, precision = 2) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toFixed(precision);
};

const getElementColor = (element) => {
  const group = ELEMENT_GROUPS[element];
  switch (group) {
    case 'alkali-metal': return 'bg-red-300';
    case 'alkaline-earth': return 'bg-red-100';
    case 'chnopss': return 'bg-green-200';
    case 'noble-gas': return 'bg-blue-200';
    case 'halogene': return 'bg-yellow-300';
    case 'metalloid': return 'bg-yellow-100';
    case 'metal': return 'bg-gray-200';
    case 'metal-transition': return 'bg-orange-200';
    // ... autres couleurs selon les groupes
    default: return 'bg-white';
  }
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <div class="bg-white rounded-lg shadow-md p-6">
      <!-- En-tête -->
      <div class="flex items-center gap-2 mb-6">
        <Database class="w-6 h-6 text-green-600" />
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
          <Search v-if="!loading" class="w-4 h-4" />
          <span>{{ loading ? 'Recherche...' : 'Rechercher' }}</span>
        </button>
      </div>

      <!-- Tableau périodique -->
  <div class="bg-gray-50 p-4 rounded-lg mb-6">
    <!-- Tableau principal -->
    <div class="grid gap-1">
      <div
        v-for="(row, rowIndex) in processedPeriodicTable"
        :key="rowIndex"
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

        <!-- Lanthanides et Actinides -->
        <div class="mt-4">
          <div class="ml-16 flex gap-1">
            <button
              v-for="element in PERIODIC_TABLE.lanthanides"
              :key="element"
              @click="handleElementClick(element)"
              :class="[
                'w-8 h-8 text-xs font-medium rounded flex items-center justify-center transition-colors',
                'bg-purple-200',
                selectedElements.includes(element) ? 'ring-2 ring-green-500' : ''
              ]"
            >
              {{ element }}
            </button>
          </div>
          <div class="mt-1 ml-16 flex gap-1">
            <button
              v-for="element in PERIODIC_TABLE.actinides"
              :key="element"
              @click="handleElementClick(element)"
              :class="[
                'w-8 h-8 text-xs font-medium rounded flex items-center justify-center transition-colors',
                'bg-pink-200',
                selectedElements.includes(element) ? 'ring-2 ring-green-500' : ''
              ]"
            >
              {{ element }}
            </button>
          </div>
        </div>
      </div>

      <!-- Message d'erreur -->
      <div
        v-if="error"
        class="p-4 bg-red-50 text-red-500 rounded-lg mb-6"
      >
        {{ error }}
      </div>

      <!-- Résultats -->
      <div v-if="!selectedMaterial && searchResults.length > 0" class="mt-6">
        <h2 class="text-lg font-semibold text-gray-700 mb-4">
          {{ searchResults.length }} résultats trouvés
        </h2>
        
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="material in searchResults"
            :key="material.material_id"
            @click="viewMaterialDetails(material.material_id)"
            class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <h3 class="font-semibold text-lg">{{ material.formula_pretty }}</h3>
            <p class="text-sm text-gray-600">ID: {{ material.material_id }}</p>
            <p class="text-sm text-gray-600">
              Système: {{ material.symmetry?.crystal_system || 'N/A' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Détails d'un matériau -->
      <!-- Détails d'un matériau -->
      <div v-if="selectedMaterial" class="mt-6">
        <button
          @click="selectedMaterial = null"
          class="mb-4 text-green-600 hover:text-green-700 flex items-center gap-2"
        >
          <ArrowLeft class="w-4 h-4" />
          Retour aux résultats
        </button>

        <div class="space-y-6">
          <div class="border-b pb-4">
            <h2 class="text-2xl font-bold">{{ selectedMaterial.formula_pretty }}</h2>
            <p class="text-gray-600">ID: {{ selectedMaterial.material_id }}</p>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <!-- Propriétés structurales -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Structure</h3>
              <div class="space-y-2">
                <p><span class="text-gray-600">Système cristallin:</span> {{ selectedMaterial.symmetry?.crystal_system || 'N/A' }}</p>
                <p><span class="text-gray-600">Groupe d'espace:</span> {{ selectedMaterial.symmetry?.symbol || 'N/A' }}</p>
                <p><span class="text-gray-600">Densité:</span> {{ formatNumber(selectedMaterial.density) }} g/cm³</p>
              </div>
            </div>

            <!-- Composition -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Composition</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="element in selectedMaterial.elements"
                  :key="element"
                  :class="[
                    'px-2 py-1 rounded-full text-sm',
                    getElementColor(element)
                  ]"
                >
                  {{ element }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>