<!-- <script setup lang="ts">
import { ref } from 'vue'
import { materialsService } from '../services'
import type { Material } from '../services'

const searchQuery = ref('')
const materials = ref<Material[]>([])
const selectedMaterial = ref<Material | null>(null)
const loading = ref(false)
const error = ref('')
const searchType = ref<'formula' | 'element'>('formula')

const handleSearch = async () => {
  if (searchQuery.value.trim().length < 1) {
    error.value = 'Veuillez entrer au moins 1 caractère'
    return
  }

  loading.value = true
  error.value = ''
  materials.value = []
  selectedMaterial.value = null

  try {
    const response = await materialsService.searchMaterials(searchQuery.value.trim())
    console.log('Réponse de recherche:', response)
    
    if (response && response.data) {
      materials.value = response.data
      if (materials.value.length === 0) {
        error.value = 'Aucun matériau trouvé'
      }
    } else {
      error.value = 'Format de réponse invalide'
    }
  } catch (e) {
    console.error('Erreur de recherche:', e)
    error.value = e instanceof Error ? e.message : 'Erreur lors de la recherche'
  } finally {
    loading.value = false
  }
}

const selectMaterial = (material: Material) => {
  selectedMaterial.value = material
}

const formatNumber = (value: number | undefined, precision: number = 2): string => {
  if (typeof value !== 'number') return 'Non disponible'
  return value.toFixed(precision)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Recherche de Matériaux</h1>

      <!-- Formulaire de recherche -->
      <div class="space-y-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="w-full md:w-48">
            <select 
              v-model="searchType"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="formula">Formule chimique</option>
              <option value="element">Élément</option>
            </select>
          </div>
          
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchType === 'formula' ? 'Ex: Fe2O3, TiO2' : 'Ex: Fe, Ti'"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              @keyup.enter="handleSearch"
            />
          </div>

          <button
            @click="handleSearch"
            :disabled="loading"
            class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
          >
            <span v-if="loading">Recherche...</span>
            <span v-else>Rechercher</span>
          </button>
        </div>

        <p class="text-sm text-gray-600">
          {{ searchType === 'formula' 
            ? 'Entrez une formule chimique (ex: Fe2O3, TiO2)' 
            : 'Entrez un élément chimique (ex: Fe, Ti)' }}
        </p>
      </div>

      <!-- Message d'erreur -->
      <div v-if="error" class="text-red-500 mb-4 p-4 bg-red-50 rounded-lg">
        {{ error }}
      </div>

      <!-- Résultats -->
      <div v-if="!error && materials.length > 0" class="space-y-4">
        <h2 class="text-lg font-semibold text-gray-700">
          Résultats trouvés: {{ materials.length }}
        </h2>
        
        <!-- Liste des résultats -->
        <div class="grid gap-4 md:grid-cols-2" v-if="!selectedMaterial">
          <div
            v-for="material in materials"
            :key="material.material_id"
            @click="selectMaterial(material)"
            class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
          >
            <div class="font-semibold text-lg">{{ material.formula_pretty }}</div>
            <div class="text-sm text-gray-600">ID: {{ material.material_id }}</div>
            <div class="text-sm text-gray-600">
              Système: {{ material.symmetry?.crystal_system || 'Non disponible' }}
            </div>
          </div>
        </div>

        <!-- Détails du matériau sélectionné -->
        <div v-if="selectedMaterial" class="space-y-6">
          <button
            @click="selectedMaterial = null"
            class="text-green-500 hover:text-green-600"
          >
            ← Retour aux résultats
          </button>

          <div class="space-y-6">
            <div class="border-b pb-4">
              <h2 class="text-2xl font-bold">{{ selectedMaterial.formula_pretty }}</h2>
              <p class="text-gray-600">ID: {{ selectedMaterial.material_id }}</p>
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <!-- Propriétés cristallographiques -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Propriétés cristallographiques</h3>
                <div class="space-y-2">
                  <p>
                    <span class="text-gray-600">Système cristallin: </span>
                    {{ selectedMaterial.symmetry?.crystal_system || 'Non disponible' }}
                  </p>
                  <p>
                    <span class="text-gray-600">Volume de la maille: </span>
                    {{ formatNumber(selectedMaterial.volume) }} Å³
                  </p>
                  <p>
                    <span class="text-gray-600">Densité: </span>
                    {{ formatNumber(selectedMaterial.density) }} g/cm³
                  </p>
                </div>
              </div>

              <!-- Propriétés électroniques -->
              <div class="space-y-4">
                <h3 class="text-lg font-semibold">Propriétés électroniques</h3>
                <div class="space-y-2">
                  <p>
                    <span class="text-gray-600">Band gap: </span>
                    {{ formatNumber(selectedMaterial.band_gap) }} eV
                  </p>
                  <p>
                    <span class="text-gray-600">Énergie de formation: </span>
                    {{ formatNumber(selectedMaterial.formation_energy_per_atom) }} eV/atome
                  </p>
                </div>
              </div>

              <!-- Composition -->
              <div class="md:col-span-2 space-y-4">
                <h3 class="text-lg font-semibold">Composition</h3>
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="element in selectedMaterial.elements" 
                    :key="element"
                    class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
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
  </div>
</template> -->