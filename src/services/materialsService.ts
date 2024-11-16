import axios, { AxiosError } from 'axios'
import type { AxiosInstance } from 'axios'

export interface Material {
  material_id: string;
  formula_pretty: string;
  structure?: {
    lattice: {
      a: number;
      b: number;
      c: number;
      alpha: number;
      beta: number;
      gamma: number;
    };
  };
  density?: number;
  elements: string[];
  symmetry?: {
    crystal_system: string;
    symbol: string;
  };
}

export interface SearchResponse {
  data: Material[];
  meta: {
    total: number;
  };
}

class MaterialsService {
  private api: AxiosInstance
  
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api/materials',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  async searchMaterials(elements: string[]): Promise<SearchResponse> {
    try {
      if (!Array.isArray(elements) || elements.length === 0) {
        throw new Error('Au moins un élément est requis');
      }

      // Encodage correct des paramètres
      const elementsString = encodeURIComponent(
        elements
          .map(e => e.trim())
          .filter(e => e)
          .join(',')
      );

      console.log('Recherche des éléments (encodés):', elementsString);

      const response = await this.api.get('/materials/core/', {
        params: {
          elements: elements    // axios encodera automatiquement les paramètres
            .map(e => e.trim().toLowerCase())
            .filter(e => e)
            .join(','),
          deprecated: 'false'
        }
      });

      console.log('Réponse reçue:', response.data);

      return {
        data: response.data?.data || [],
        meta: response.data?.meta || { total: 0 }
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Détails de l\'erreur:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          url: error.config?.url,
          params: error.config?.params
        });
      }
      throw error;
    }
  }
}

export const materialsService = new MaterialsService();