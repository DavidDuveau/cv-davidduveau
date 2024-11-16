// src/services/materialsService.ts
import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'

export interface Material {
  material_id: string
  formula_pretty: string
  formula: string
  symmetry?: {
    crystal_system?: string
    symbol?: string
  }
  density?: number
  volume?: number
  band_gap?: number
  formation_energy_per_atom?: number
  elements: string[]
}

export interface SearchResponse {
  data: Material[]
  total: number
}

class MaterialsService {
  private api: AxiosInstance
  
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api/materials',
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  async searchMaterials(query: string): Promise<SearchResponse> {
    try {
      console.log('Envoi de la requête avec query:', query);
      
      // Construction des paramètres de requête GET
      const params = {
        formula: query,
        fields: [
          "material_id",
          "formula_pretty",
          "formula",
          "symmetry",
          "density",
          "volume",
          "band_gap",
          "formation_energy_per_atom",
          "elements"
        ].join(',')
      };

      const response = await this.api.get('/materials', { params });

      console.log('Réponse brute:', response.data);

      // Transformation de la réponse
      const transformedData: SearchResponse = {
        data: response.data?.data || [],
        total: response.data?.meta?.total || 0
      };

      console.log('Données transformées:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        console.error('Réponse d\'erreur:', axiosError.response?.data);
        const errorMessage = axiosError.response?.data?.error || 'Erreur lors de la recherche des matériaux';
        throw new Error(errorMessage);
      }
      throw new Error('Erreur lors de la recherche des matériaux');
    }
  }
}

export const materialsService = new MaterialsService()