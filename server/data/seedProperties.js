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

const districts = [
  { name: "Umarizal", lat: -1.4471, lng: -48.4855 },
  { name: "Nazare", lat: -1.4531, lng: -48.4876 },
  { name: "Batista Campos", lat: -1.4489, lng: -48.4923 },
  { name: "Marco", lat: -1.4312, lng: -48.4698 },
  { name: "Pedreira", lat: -1.4023, lng: -48.4601 },
  { name: "Reduto", lat: -1.4502, lng: -48.4941 },
  { name: "Comercio", lat: -1.4558, lng: -48.502 },
  { name: "Marambaia", lat: -1.4198, lng: -48.4755 },
  { name: "Parque Verde", lat: -1.4152, lng: -48.4782 },
  { name: "Tapana", lat: -1.3901, lng: -48.4432 },
];

const streets = [
  "Rua das Orquideas",
  "Av. Augusto Montenegro",
  "Tv. Padre Eutiquio",
  "Rua Boaventura da Silva",
  "Av. Presidente Vargas",
  "Rua Municipalidade",
  "Rodovia Arthur Bernardes",
  "Av. Almirante Barroso",
  "Av. Visconde de Souza Franco",
  "Passagem Marambaia",
  "Rua dos Mundurucus",
  "Av. Duque de Caxias",
  "Rua Antonio Barreto",
  "Av. Jose Malcher",
  "Travessa Lomas Valentinas",
];

const templates = [
  {
    type: "Casa",
    title: "Casa ampla com quintal",
    description: "Casa com ambientes integrados, area gourmet e boa ventilacao natural.",
    bedrooms: 3,
    bathrooms: 3,
    area: 165,
    parkingSpaces: 2,
    salePrice: 690000,
    rentPrice: 5200,
  },
  {
    type: "Apartamento",
    title: "Apartamento com varanda",
    description: "Apartamento em condominio com lazer, portaria e facil acesso a servicos.",
    bedrooms: 2,
    bathrooms: 2,
    area: 74,
    parkingSpaces: 1,
    salePrice: 480000,
    rentPrice: 3200,
  },
  {
    type: "Cobertura",
    title: "Cobertura com area gourmet",
    description: "Cobertura com terraco privativo, vista aberta e espaco para receber convidados.",
    bedrooms: 3,
    bathrooms: 4,
    area: 145,
    parkingSpaces: 2,
    salePrice: 980000,
    rentPrice: 7400,
  },
  {
    type: "Comercial",
    title: "Sala comercial bem localizada",
    description: "Imovel comercial em ponto estrategico, ideal para escritorio, clinica ou loja.",
    bedrooms: 0,
    bathrooms: 2,
    area: 88,
    parkingSpaces: 1,
    salePrice: 620000,
    rentPrice: 4100,
  },
  {
    type: "Terreno",
    title: "Terreno plano documentado",
    description: "Terreno regularizado em area de crescimento, ideal para construcao ou incorporacao.",
    bedrooms: 0,
    bathrooms: 0,
    area: 420,
    parkingSpaces: 0,
    salePrice: 260000,
    rentPrice: 1800,
  },
];

export const seedProperties = Array.from({ length: 100 }, (_, index) => {
  const template = templates[index % templates.length];
  const district = districts[index % districts.length];
  const status = index % 4 === 1 ? "Aluguel" : "Venda";
  const variant = Math.floor(index / templates.length);
  const priceStep = status === "Venda" ? 23500 : 180;
  const areaStep = template.type === "Terreno" ? 35 : 4;
  const imageList = imagesByType[template.type];

  return {
    title: `${template.title} ${district.name}`,
    description: `${template.description} Unidade ${index + 1} com acabamento revisado e documentacao pronta.`,
    type: template.type,
    status,
    price: (status === "Venda" ? template.salePrice : template.rentPrice) + variant * priceStep,
    address: {
      street: `${streets[index % streets.length]}, ${120 + index * 7}`,
      district: district.name,
      city: "Belem",
      state: "PA",
    },
    location: {
      lat: Number((district.lat + ((index % 7) - 3) * 0.0017).toFixed(6)),
      lng: Number((district.lng + ((index % 9) - 4) * 0.0015).toFixed(6)),
    },
    bedrooms: template.bedrooms + (template.bedrooms > 0 ? index % 2 : 0),
    bathrooms: template.bathrooms + (template.bathrooms > 0 ? index % 3 : 0),
    area: template.area + variant * areaStep,
    parkingSpaces: template.parkingSpaces + (template.parkingSpaces > 0 && index % 6 === 0 ? 1 : 0),
    imageUrl: imageList[index % imageList.length],
    featured: index % 5 === 0,
  };
});
