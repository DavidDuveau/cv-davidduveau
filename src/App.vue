// App.vue
<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import Profile from './components/Profile.vue';
import Experience from './components/Experience.vue';
import Skills from './components/Skills.vue';
import Education from './components/Education.vue';
import Interests from './components/Interests.vue';
import { jsPDF } from 'jspdf';
import '@fortawesome/fontawesome-free/css/all.min.css';


const personalInfo = ref({
  name: 'David Duveau',
  title: 'Développeur Logiciel C# .Net',
  location: '34000 Montpellier',
  phone: '07 69 49 51 72',
  email: 'david.duveau@hotmail.fr',
  github: 'https://github.com/DavidDuveau',
  linkedin: 'https://www.linkedin.com/in/david-duveau/',
  profile: 'Après une reconversion réussie dans le domaine du numérique, j\'ai développé des compétences solides qui me permettent aujourd\'hui d\'apporter de la valeur dans des projets innovants.\r\n Issu d\'une formation scientifique, je me distingue par un esprit analytique et rigoureux, ainsi qu\'une grande capacité d\'apprentissage. Ces atouts m\'ont permis d\'acquérir des compétences techniques variées (BdD, OOP...) et de mener à bien des projets complexes dans un environnement en constante évolution.\r\n Animé par une curiosité constante et une soif d’apprendre, je suis à la recherche d’opportunités qui me permettront de contribuer à des projets ambitieux tout en continuant à enrichir mes compétences et à élargir mes perspectives professionnelles.'
});

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
  { category: 'Technologies', items: ['C#', '.NET Framework', 'SQL', 'JavaScript', 'TypeScript', 'Vue.js', 'Microsoft SQL Server', 'PosgreSQL'] },
  { category: 'Soft Skills', items: ['Esprit scientifique', 'Travail en équipe', 'Anglais'] }
]);

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

const interests = ref(['Escalade','Voyage','Brassage','Randonnée']);

const generatePDF = () => {
  const doc = new jsPDF();

  // Configuration du PDF
  doc.setFont('helvetica');
  doc.setFontSize(24);
  doc.text(personalInfo.value.name, 20, 20);
  doc.setFontSize(16);
  doc.text(personalInfo.value.title, 20, 30);
  doc.text(personalInfo.value.location, 20, 40);
  doc.text(personalInfo.value.phone, 20, 50);
  doc.text(personalInfo.value.email, 20, 60);
  doc.text(personalInfo.value.github, 20, 70);
  doc.text(personalInfo.value.linkedin, 20, 80);
  
  // Ajouter la section "Profil"
  doc.setFontSize(18);
  doc.text('Profil', 20, 100);
  doc.setFontSize(12);
  doc.text(personalInfo.value.profile, 20, 110);

  // Ajouter la section "Expérience"
  doc.setFontSize(18);
  doc.text('Expérience', 20, 140);
  doc.setFontSize(12);
  experience.value.forEach((exp, index) => {
    doc.text(`${exp.period} - ${exp.position} chez ${exp.company}`, 20, 150 + (index * 10));
    if (exp.description) {
      doc.text(exp.description, 20, 160 + (index * 10));
    }
    doc.text(`Technologies: ${exp.technologies}`, 20, 170 + (index * 10));
  });

  // Ajouter la section "Compétences"
  doc.setFontSize(18);
  doc.text('Compétences', 20, 200);
  doc.setFontSize(12);
  skills.value.forEach((skillCategory, index) => {
    doc.text(skillCategory.category, 20, 210 + (index * 10));
    skillCategory.items.forEach((item, itemIndex) => {
      doc.text(item, 20, 220 + (index * 10) + (itemIndex * 10));
    });
  });

  // Ajouter la section "Formation"
  doc.setFontSize(18);
  doc.text('Formation', 20, 250);
  doc.setFontSize(12);
  education.value.forEach((edu, index) => {
    doc.text(`${edu.year} - ${edu.diploma} (${edu.school})`, 20, 260 + (index * 10));
    doc.text(edu.details, 20, 270 + (index * 10));
  });

  // Ajouter la section "Intérêts"
  doc.setFontSize(18);
  doc.text('Intérêts', 20, 300);
  doc.setFontSize(12);
  interests.value.forEach((interest, index) => {
    doc.text(`${interest.icon} ${interest.title}`, 20, 310 + (index * 10));
  });

  // Enregistrer le PDF
  doc.save('CV-David-Duveau.pdf');
};

</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="w-full mx-auto p-6">
      <Header :personal-info="personalInfo" />
      
      <div class="grid gap-6 mt-6">
        <Profile :description="personalInfo.profile" />
        <Experience :experiences="experience" />
        <Skills :skills="skills" />
        <Education :education="education" />
        <Interests :interests="interests" />
        
        <!-- <button
          @click="generatePDF"
          class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Télécharger CV (PDF)
        </button> -->
      </div>
    </div>
  </div>
</template>

<style>
/* Styles globaux */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>