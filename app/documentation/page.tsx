'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionWrapper from '@/components/MotionWrapper';
import { useApp } from '@/lib/context';
import { PLATFORM_CONFIGS } from '@/lib/platforms';

export default function DocumentationPage() {
  const { t, settings } = useApp();

  const features = [
    {
      icon: 'ri-download-2-line',
      title: 'Téléchargement Multi-Plateforme',
      description: 'Supportez 7 plateformes majeures avec extraction automatique',
      details: [
        'YouTube, TikTok, Instagram, Facebook',
        'Twitter/X, WhatsApp, Pinterest',
        'Détection automatique des plateformes',
        'Extraction des métadonnées complètes'
      ]
    },
    {
      icon: 'ri-file-music-line',
      title: 'Formats Multiples',
      description: 'Choisissez le format optimal pour vos besoins',
      details: [
        'Vidéo : MP4, AVI, MOV, WMV',
        'Audio : MP3, WAV, AAC, OGG',
        'Image : JPG, PNG, GIF, WEBP',
        'Qualités : SD, HD, Full HD, 4K'
      ]
    },
    {
      icon: 'ri-palette-line',
      title: 'Interface Personnalisable',
      description: 'Adaptez l\'interface à vos préférences',
      details: [
        'Thème sombre et clair',
        '10 couleurs prédéfinies',
        'Sélecteur de couleur personnalisé',
        'Interface responsive'
      ]
    },
    {
      icon: 'ri-global-line',
      title: 'Multilingue',
      description: 'Disponible en français et anglais',
      details: [
        'Traduction automatique',
        'Commutateur de langue',
        'Détection du navigateur',
        'Extensible à d\'autres langues'
      ]
    },
    {
      icon: 'ri-history-line',
      title: 'Historique Avancé',
      description: 'Suivez tous vos téléchargements',
      details: [
        'Historique persistant',
        'Système de favoris',
        'Statistiques détaillées',
        'Recherche et filtrage'
      ]
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Sécurité & Confidentialité',
      description: '100% sécurisé et privé',
      details: [
        'Aucune donnée stockée sur serveur',
        'Traitement côté client uniquement',
        'Pas d\'inscription requise',
        'Respecte votre vie privée'
      ]
    }
  ];

  const technicalSpecs = [
    {
      category: 'Architecture',
      items: [
        { label: 'Framework', value: 'Next.js 15' },
        { label: 'Langage', value: 'TypeScript' },
        { label: 'Styling', value: 'Tailwind CSS' },
        { label: 'Animations', value: 'Framer Motion' }
      ]
    },
    {
      category: 'APIs & Services',
      items: [
        { label: 'Extraction', value: 'APIs multiples avec fallback' },
        { label: 'Proxy', value: 'CORS proxy pour contournement' },
        { label: 'oEmbed', value: 'Support natif des plateformes' },
        { label: 'Génération', value: 'Stable Diffusion pour images' }
      ]
    },
    {
      category: 'Stockage & Performance',
      items: [
        { label: 'Stockage', value: 'localStorage pour préférences' },
        { label: 'Cache', value: 'Mise en cache intelligente' },
        { label: 'Optimisation', value: 'Lazy loading et compression' },
        { label: 'Responsive', value: 'Adaptatif mobile/desktop' }
      ]
    }
  ];

  const useCases = [
    {
      title: 'Créateurs de Contenu',
      description: 'Sauvegardez et archivez vos créations',
      icon: 'ri-user-star-line',
      benefits: [
        'Backup automatique de vos vidéos',
        'Conversion en différents formats',
        'Archivage local sécurisé',
        'Partage facilité'
      ]
    },
    {
      title: 'Éducation & Formation',
      description: 'Ressources pédagogiques hors ligne',
      icon: 'ri-graduation-cap-line',
      benefits: [
        'Cours et tutoriels hors ligne',
        'Bibliothèque de ressources',
        'Pas de dépendance internet',
        'Accès permanent'
      ]
    },
    {
      title: 'Marketing & Communication',
      description: 'Collecte de contenu pour campagnes',
      icon: 'ri-megaphone-line',
      benefits: [
        'Veille concurrentielle',
        'Collecte de trends',
        'Analyse de contenu',
        'Inspiration créative'
      ]
    },
    {
      title: 'Archivage Personnel',
      description: 'Préservez vos souvenirs numériques',
      icon: 'ri-archive-line',
      benefits: [
        'Sauvegarde de souvenirs',
        'Organisation par catégories',
        'Accès sans connexion',
        'Sécurité des données'
      ]
    }
  ];

  const pricingPlans = [
    {
      name: 'Gratuit',
      price: '0€',
      period: 'Toujours',
      features: [
        'Téléchargements illimités',
        'Toutes les plateformes',
        'Formats de base',
        'Historique local',
        'Thème personnalisable'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '9€',
      period: 'par mois',
      features: [
        'Tout de la version gratuite',
        'Téléchargements par lot',
        'Formats avancés (4K, FLAC)',
        'Historique cloud',
        'Support prioritaire',
        'API personnalisée'
      ],
      popular: true
    },
    {
      name: 'Entreprise',
      price: 'Sur devis',
      period: 'par mois',
      features: [
        'Tout de la version Pro',
        'Déploiement sur site',
        'Branding personnalisé',
        'Support 24/7',
        'Intégration sur mesure',
        'Formation équipe'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <MotionWrapper>
          <div className="text-center mb-16">
            <div 
              className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <i className="ri-file-text-line text-white w-12 h-12 flex items-center justify-center"></i>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Documentation Complète
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Découvrez toutes les fonctionnalités avancées de MediaDownloader, la solution professionnelle de téléchargement multi-plateforme.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Essayer Maintenant
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                En Savoir Plus
              </Link>
            </div>
          </div>
        </MotionWrapper>

        {/* Features Section */}
        <MotionWrapper delay={0.2}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Fonctionnalités Avancées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <i className={`${feature.icon} text-white w-8 h-8 flex items-center justify-center`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <i className="ri-check-line text-green-500 w-4 h-4 flex items-center justify-center"></i>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Technical Specifications */}
        <MotionWrapper delay={0.4}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Spécifications Techniques
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technicalSpecs.map((spec, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{spec.category}</h3>
                  <div className="space-y-3">
                    {spec.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Supported Platforms */}
        <MotionWrapper delay={0.5}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Plateformes Supportées
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                {Object.entries(PLATFORM_CONFIGS).map(([platform, config], index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <i className={`${config.icon} ${config.color} w-8 h-8 flex items-center justify-center`}></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{config.name}</h4>
                    <div className="mt-2 flex justify-center space-x-1">
                      {config.supports.video && (
                        <i className="ri-video-line text-blue-500 w-4 h-4 flex items-center justify-center" title="Vidéo"></i>
                      )}
                      {config.supports.audio && (
                        <i className="ri-music-line text-green-500 w-4 h-4 flex items-center justify-center" title="Audio"></i>
                      )}
                      {config.supports.image && (
                        <i className="ri-image-line text-purple-500 w-4 h-4 flex items-center justify-center" title="Image"></i>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Use Cases */}
        <MotionWrapper delay={0.6}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Cas d'Usage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${settings.primaryColor}20` }}
                    >
                      <i className={`${useCase.icon} w-6 h-6 flex items-center justify-center`} style={{ color: settings.primaryColor }}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{useCase.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{useCase.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-arrow-right-s-line text-gray-400 w-4 h-4 flex items-center justify-center"></i>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Pricing */}
        <MotionWrapper delay={0.7}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Tarification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border-2 transition-all duration-300 hover:shadow-lg ${
                    plan.popular 
                      ? 'border-current' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  style={plan.popular ? { borderColor: settings.primaryColor } : {}}
                >
                  {plan.popular && (
                    <div 
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      Populaire
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <i className="ri-check-line text-green-500 w-4 h-4 flex items-center justify-center"></i>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer ${
                      plan.popular
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    style={plan.popular ? { backgroundColor: settings.primaryColor } : {}}
                  >
                    {plan.name === 'Gratuit' ? 'Commencer' : plan.name === 'Entreprise' ? 'Nous Contacter' : 'Choisir Pro'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* FAQ */}
        <MotionWrapper delay={0.8}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Questions Fréquentes
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "MediaDownloader est-il vraiment gratuit ?",
                  answer: "Oui, la version de base est entièrement gratuite avec téléchargements illimités. Aucune inscription requise."
                },
                {
                  question: "Quelles plateformes sont supportées ?",
                  answer: "Nous supportons 7 plateformes : YouTube, TikTok, Instagram, Facebook, Twitter/X, WhatsApp et Pinterest."
                },
                {
                  question: "Les téléchargements sont-ils légaux ?",
                  answer: "Vous êtes responsable de respecter les droits d'auteur et les conditions d'utilisation des plateformes."
                },
                {
                  question: "Comment fonctionne la détection automatique ?",
                  answer: "Notre système analyse l'URL et détecte automatiquement la plateforme pour optimiser l'extraction."
                },
                {
                  question: "Mes données sont-elles sécurisées ?",
                  answer: "Tout est traité côté client. Aucune donnée n'est envoyée à nos serveurs."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* CTA */}
        <MotionWrapper delay={0.9}>
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à Commencer ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'utilisateurs qui font confiance à MediaDownloader
              </p>
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:scale-105 transition-transform cursor-pointer"
              >
                <i className="ri-download-2-line w-5 h-5 flex items-center justify-center"></i>
                <span>Essayer Maintenant</span>
              </Link>
            </div>
          </div>
        </MotionWrapper>
      </main>

      <Footer />
    </div>
  );
}