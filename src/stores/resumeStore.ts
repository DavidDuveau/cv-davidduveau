import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResumeStore = defineStore('resume', () => {
  const personalInfo = ref({
    name: 'David Duveau',
    title: 'Développeur Logiciel C# .Net',
    location: '34000 Montpellier',
    phone: '07 69 49 51 72',
    email: 'david.duveau@hotmail.fr',
    github: 'https://github.com/DavidDuveau',
    linkedin: 'https://www.linkedin.com/in/david-duveau/',
    profile: 'Après une reconversion réussie dans le numérique, j\'ai développé de solides compétences qui me permettent d\'apporter une réelle valeur ajoutée dans des projets innovants. Grâce à ma formation scientifique, je suis rigoureux, analytique et j\'apprends vite. Cela m\'a permis d\'acquérir diverses compétences techniques (BdD, OOP...) et de gérer avec succès des projets complexes dans un environnement en constante évolution. Curieux et passionné, je cherche de nouvelles opportunités pour contribuer à des projets stimulants, tout en continuant à développer mes compétences et à élargir mon horizon professionnel.'
  })

  const experience = ref([
    {
      period: '2021',
      company: 'Weda',
      position: 'Développeur logiciel',
      description: 'Migration de données sensibles secteur médical.\r\n Automatisation des process de migration de données - flow & data.\r\n Développement et maintient d\'un outils interne - ETL non commercial.\r\n Communication technique - opérateurs, commerciaux, clients.',
      technologies: 'Fichiers plats - Microsoft SQL Server - .NET Framework - Bases de données orientées texte',
    },
    {
      period: '2020 - 2021',
      company: 'Adrar',
      position: 'Stagiaire developpeur',
      technologies: 'Javascript',
    },
    {
      period: '2020 - 2021',
      company: 'Triotech',
      position: 'Stagiaire développeur Web',
      description: 'Développement d\'une solution web pour laboratoire de langue',
      technologies: 'JS - Vue - Insomnia - KDE',
    },
    {
      period: '2018 - 2019',
      company: 'Research To Business',
      position: 'Prestataire',
      description: 'Rédaction scientifique de dossiers CIR'
    },
    {
      period: '2016 - 2017',
      company: 'Université François Rabelais',
      position: 'Ingénieur de recherche',
      description: 'Recherche et développement sur la synthèse de matériaux poreux, Rédaction de rapports, présentation de résultats'
    }
  ]);
  
  const skills = ref([
    { 
      category: 'Technologies', 
      items: ['C#', '.NET Framework', 'SQL', 'JavaScript', 'TypeScript', 'Vue.js', 'Microsoft SQL Server', 'PosgreSQL'] 
    },
    { 
      category: 'Soft Skills', 
      items: ['Esprit scientifique', 'Travail en équipe', 'Anglais'] 
    }
  ])

  const education = ref([
    {
      year: '2020',
      school: 'Adrar',
      diploma: 'Formation Développement Web',
      details: 'JS - React - Node - HTML/CSS - SQL - Wordpress'
    },
    {
      year: '2019',
      school: 'Diginamic',
      diploma: 'Formation Développement',
      details: 'Java - Spring - Hibernate - JS - TS - Angular - SQL'
    },
    {
      year: '2012 - 2015',
      school: 'Université Montpellier',
      diploma: 'Thèse de doctorat - Chimie des matériaux',
      details: 'Développement de batteries Li-ion à base de silicium'
    }
  ]);
  
  const interests = ref(['Escalade', 'Voyage', 'Brassage', 'Randonnée'])

  return {
    personalInfo,
    experience,
    skills,
    education,
    interests
  }
})