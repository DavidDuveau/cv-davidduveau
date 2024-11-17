import axios from 'axios'
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
        'Accept': 'application/json'
      }
    })
  }

  async searchMaterials(elements: string[]): Promise<SearchResponse> {
    try {
      if (!Array.isArray(elements) || elements.length === 0) {
        throw new Error('Au moins un élément est requis');
      }

      const params = {
        elements: elements
          .map(e => e.trim()) // Garde les majuscules
          .filter(e => e)
          .join(','),
        deprecated: 'false',
        _per_page: '100',
        _skip: '0',
        _limit: '100',
        _all_fields: 'false',
        license: 'BY-C'
      };

      const response = await this.api.get('/materials/core/', { params });

      return {
        data: response.data?.data || [],
        meta: response.data?.meta || { total: 0 }
      };
    } catch (error) {
      console.error('Erreur de recherche:', error);
      throw error;
    }
  }

  async getMaterialById(materialId: string): Promise<Material> {
    try {
      const response = await this.api.get(`/materials/core/${materialId}`);
      return response.data.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du matériau:', error);
      throw error;
    }
  }
}

export const materialsService = new MaterialsService();