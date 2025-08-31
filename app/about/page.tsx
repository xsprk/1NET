
'use client';

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionWrapper from '@/components/MotionWrapper';
import { useApp } from '@/lib/context';

export default function AboutPage() {
  const { t, settings } = useApp();

  const features = [
    {
      icon: 'ri-shield-check-line',
      title: t('securePrivate'),
      description: t('securePrivateDesc'),
      color: 'text-green-600'
    },
    {
      icon: 'ri-speed-line',
      title: t('fastEfficient'),
      description: t('fastEfficiientDesc'),
      color: 'text-blue-600'
    },
    {
      icon: 'ri-settings-3-line',
      title: t('multipleFormats'),
      description: t('multipleFormatsDesc'),
      color: 'text-purple-600'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Responsive',
      description: 'Interface adaptée à tous les appareils',
      color: 'text-orange-600'
    },
    {
      icon: 'ri-palette-line',
      title: 'Personnalisable',
      description: 'Thèmes et couleurs personnalisables',
      color: 'text-pink-600'
    },
    {
      icon: 'ri-global-line',
      title: 'Multilingue',
      description: 'Disponible en français et anglais',
      color: 'text-indigo-600'
    }
  ];

  const techStack = [
    { name: 'Next.js 14', description: 'Framework React moderne' },
    { name: 'TypeScript', description: 'Développement sécurisé' },
    { name: 'Tailwind CSS', description: 'Styling rapide et responsive' },
    { name: 'Framer Motion', description: 'Animations fluides' },
    { name: 'Remix Icons', description: 'Icônes cohérentes' },
    { name: 'localStorage', description: 'Stockage local sécurisé' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MotionWrapper>
          <div className="text-center mb-12">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: settings.primaryColor }}
            >
              <i className="ri-information-line text-white w-10 h-10 flex items-center justify-center"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('aboutDesc')}
            </p>
          </div>
        </MotionWrapper>

        {/* Fonctionnalités */}
        <MotionWrapper delay={0.2}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('featuresTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                      <i className={`${feature.icon} ${feature.color} w-6 h-6 flex items-center justify-center`}></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Technologies */}
        <MotionWrapper delay={0.4}>
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Technologies utilisées
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                  >
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: settings.primaryColor }}
                    ></div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{tech.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Avantages */}
        <MotionWrapper delay={0.6}>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Pourquoi choisir MediaDownloader ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">100% Gratuit</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aucun coût caché, toujours gratuit</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Pas d'inscription</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Utilisez directement sans créer de compte</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Téléchargements illimités</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Aucune limite sur le nombre de téléchargements</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Qualité préservée</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Téléchargements en qualité originale</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Support multi-plateforme</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compatible avec 7 plateformes majeures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <i className="ri-check-line text-green-600 w-5 h-5 flex items-center justify-center mt-1"></i>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Mise à jour régulière</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Amélioration continue des fonctionnalités</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MotionWrapper>
      </main>

      <Footer />
    </div>
  );
}
