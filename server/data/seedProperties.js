const imagesByType = {
  Apartamento: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  ],
  Casa: [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
  ],
  Cobertura: [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
  ],
  Comercial: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  ],
  Terreno: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
  ],
};

const markets = [
  { country: "Brasil", city: "Sao Paulo", state: "SP", district: "Jardins", lat: -23.5617, lng: -46.6559, street: "Alameda Lorena" },
  { country: "Brasil", city: "Rio de Janeiro", state: "RJ", district: "Ipanema", lat: -22.9847, lng: -43.2048, street: "Rua Visconde de Piraja" },
  { country: "Portugal", city: "Lisboa", state: "Lisboa", district: "Chiado", lat: 38.7108, lng: -9.1426, street: "Rua Garrett" },
  { country: "Espanha", city: "Barcelona", state: "Catalunha", district: "Eixample", lat: 41.3917, lng: 2.1649, street: "Carrer de Mallorca" },
  { country: "Franca", city: "Paris", state: "Ile-de-France", district: "Le Marais", lat: 48.8589, lng: 2.3622, street: "Rue Vieille du Temple" },
  { country: "Reino Unido", city: "Londres", state: "Inglaterra", district: "Kensington", lat: 51.4991, lng: -0.1938, street: "Kensington High Street" },
  { country: "Estados Unidos", city: "Nova York", state: "NY", district: "Brooklyn Heights", lat: 40.696, lng: -73.9933, street: "Montague Street" },
  { country: "Estados Unidos", city: "Miami", state: "FL", district: "Brickell", lat: 25.7617, lng: -80.1918, street: "Brickell Avenue" },
  { country: "Canada", city: "Toronto", state: "Ontario", district: "Yorkville", lat: 43.6708, lng: -79.3948, street: "Bloor Street West" },
  { country: "Mexico", city: "Cidade do Mexico", state: "CDMX", district: "Condesa", lat: 19.4121, lng: -99.1714, street: "Avenida Amsterdam" },
  { country: "Argentina", city: "Buenos Aires", state: "CABA", district: "Palermo", lat: -34.5889, lng: -58.4306, street: "Avenida Santa Fe" },
  { country: "Chile", city: "Santiago", state: "RM", district: "Providencia", lat: -33.4263, lng: -70.6171, street: "Avenida Providencia" },
  { country: "Emirados Arabes Unidos", city: "Dubai", state: "Dubai", district: "Dubai Marina", lat: 25.0807, lng: 55.1403, street: "Marina Walk" },
  { country: "Japao", city: "Toquio", state: "Tokyo", district: "Shibuya", lat: 35.6618, lng: 139.7041, street: "Jinnan Street" },
  { country: "Singapura", city: "Singapura", state: "Central", district: "Marina Bay", lat: 1.2836, lng: 103.8606, street: "Bayfront Avenue" },
  { country: "Australia", city: "Sydney", state: "NSW", district: "Surry Hills", lat: -33.8846, lng: 151.212, street: "Crown Street" },
];

const templates = [
  {
    type: "Casa",
    title: "Casa familiar com jardim",
    description: "Residencia pronta para morar, com ambientes integrados, boa iluminacao natural e area externa funcional.",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    parkingSpaces: 2,
    salePrice: 1250000,
    rentPrice: 8200,
  },
  {
    type: "Apartamento",
    title: "Apartamento urbano bem localizado",
    description: "Apartamento em regiao central, proximo a servicos, transporte e areas de convivencia.",
    bedrooms: 2,
    bathrooms: 2,
    area: 86,
    parkingSpaces: 1,
    salePrice: 780000,
    rentPrice: 4600,
  },
  {
    type: "Cobertura",
    title: "Cobertura com vista panoramica",
    description: "Cobertura com terraco privativo, vista aberta e espaco para receber convidados.",
    bedrooms: 3,
    bathrooms: 4,
    area: 185,
    parkingSpaces: 2,
    salePrice: 1850000,
    rentPrice: 12000,
  },
  {
    type: "Comercial",
    title: "Sala comercial em eixo corporativo",
    description: "Unidade comercial em local de alto fluxo, adequada para escritorio, consultorio ou operacao compacta.",
    bedrooms: 0,
    bathrooms: 2,
    area: 110,
    parkingSpaces: 1,
    salePrice: 980000,
    rentPrice: 6800,
  },
  {
    type: "Terreno",
    title: "Terreno urbano regularizado",
    description: "Terreno documentado em area consolidada, com potencial para desenvolvimento residencial ou misto.",
    bedrooms: 0,
    bathrooms: 0,
    area: 520,
    parkingSpaces: 0,
    salePrice: 640000,
    rentPrice: 3500,
  },
];

export const seedProperties = Array.from({ length: 80 }, (_, index) => {
  const market = markets[index % markets.length];
  const template = templates[index % templates.length];
  const status = index % 4 === 1 ? "Aluguel" : "Venda";
  const cycle = Math.floor(index / templates.length);
  const imageList = imagesByType[template.type];
  const price = (status === "Venda" ? template.salePrice : template.rentPrice) + cycle * (status === "Venda" ? 42000 : 260);

  return {
    title: `${template.title} - ${market.district}`,
    description: `${template.description} Dados preparados para simulacao imobiliaria internacional com localizacao verificavel por cidade e bairro.`,
    type: template.type,
    status,
    price,
    address: {
      street: `${market.street}, ${100 + index * 11}`,
      district: market.district,
      city: market.city,
      state: market.state,
      country: market.country,
    },
    location: {
      lat: Number((market.lat + ((index % 5) - 2) * 0.0021).toFixed(6)),
      lng: Number((market.lng + ((index % 7) - 3) * 0.0024).toFixed(6)),
    },
    bedrooms: template.bedrooms + (template.bedrooms > 0 && index % 6 === 0 ? 1 : 0),
    bathrooms: template.bathrooms + (template.bathrooms > 0 && index % 5 === 0 ? 1 : 0),
    area: template.area + cycle * (template.type === "Terreno" ? 45 : 6),
    parkingSpaces: template.parkingSpaces + (template.parkingSpaces > 0 && index % 8 === 0 ? 1 : 0),
    imageUrl: imageList[index % imageList.length],
    featured: index % 6 === 0,
  };
});
