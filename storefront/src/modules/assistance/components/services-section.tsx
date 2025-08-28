export default function ServicesSection() {
  const services = [
    {
      id: 1,
      title: "Reparo de iPhone",
      description: "Especialistas em conserto de todos os modelos de iPhone, incluindo troca de tela, bateria, conector de carregamento e muito mais.",
      image: "/images/iphone-repair.jpg",
      features: [
        "Troca de tela quebrada",
        "Substituição de bateria",
        "Reparo de conector de carregamento",
        "Conserto de alto-falantes",
        "Recuperação de dados",
        "Diagnóstico gratuito"
      ]
    },
    {
      id: 2,
      title: "Reparo de MacBook",
      description: "Serviços especializados para MacBook, MacBook Air e MacBook Pro com técnicos certificados Apple.",
      image: "/images/macbook-repair.jpg",
      features: [
        "Troca de teclado",
        "Substituição de bateria",
        "Reparo de placa-mãe",
        "Conserto de tela",
        "Limpeza interna",
        "Upgrade de memória e SSD"
      ]
    },
    {
      id: 3,
      title: "Recuperação de Dados",
      description: "Recuperamos seus dados importantes de dispositivos com problemas, mesmo em casos de danos físicos.",
      image: "/images/data-recovery.jpg",
      features: [
        "Recuperação de arquivos deletados",
        "Recuperação de dispositivos com danos físicos",
        "Backup e restauração",
        "Recuperação de senhas",
        "Análise de dispositivos",
        "Relatório detalhado"
      ]
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Nossos Serviços Especializados
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Oferecemos soluções completas para todos os problemas dos seus dispositivos Apple
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Por que escolher nossa assistência técnica?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Garantia</h4>
                <p className="text-sm text-gray-600">90 dias de garantia em todos os reparos</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Peças Originais</h4>
                <p className="text-sm text-gray-600">Utilizamos apenas peças de qualidade</p>
              </div>
              <div className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">Técnicos Certificados</h4>
                <p className="text-sm text-gray-600">Equipe especializada e treinada</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
