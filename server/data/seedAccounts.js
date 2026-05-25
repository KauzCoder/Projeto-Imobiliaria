export const seedPassword = "Ninho@123";

export const seedSuperUsers = [
  {
    name: "Kauz Coder",
    email: "super@ninhoimoveis.com",
    phone: "(91) 99999-0001",
    document: "000.000.000-01",
    permissions: ["all"],
    canManageAdmins: true,
  },
  {
    name: "Diretoria Ninho",
    email: "diretoria@ninhoimoveis.com",
    phone: "(91) 99999-0002",
    document: "000.000.000-02",
    permissions: ["all", "settings", "reports"],
    canManageAdmins: true,
  },
];

export const seedAdmins = [
  {
    name: "Amanda Reis",
    email: "admin@ninhoimoveis.com",
    phone: "(91) 98888-1001",
    document: "111.111.111-01",
    department: "Operacoes",
    permissions: ["properties", "brokers", "users", "reports"],
  },
  {
    name: "Bruno Costa",
    email: "bruno.admin@ninhoimoveis.com",
    phone: "(91) 98888-1002",
    document: "111.111.111-02",
    department: "Comercial",
    permissions: ["properties", "brokers", "content"],
  },
  {
    name: "Carla Menezes",
    email: "carla.admin@ninhoimoveis.com",
    phone: "(91) 98888-1003",
    document: "111.111.111-03",
    department: "Atendimento",
    permissions: ["users", "reports", "content"],
  },
  {
    name: "Diego Martins",
    email: "diego.admin@ninhoimoveis.com",
    phone: "(91) 98888-1004",
    document: "111.111.111-04",
    department: "Cadastro",
    permissions: ["properties", "brokers"],
  },
  {
    name: "Elisa Rocha",
    email: "elisa.admin@ninhoimoveis.com",
    phone: "(91) 98888-1005",
    document: "111.111.111-05",
    department: "Marketing",
    permissions: ["content", "reports"],
  },
];

export const seedBrokers = [
  "Ana Paula Lima",
  "Caio Fernandes",
  "Mariana Torres",
  "Rafael Nunes",
  "Juliana Araujo",
  "Felipe Barros",
  "Patricia Sousa",
  "Lucas Almeida",
  "Renata Freitas",
  "Gustavo Moraes",
  "Bianca Carvalho",
  "Thiago Ribeiro",
].map((name, index) => ({
  name,
  email: `corretor${index + 1}@ninhoimoveis.com`,
  phone: `(91) 97777-${String(2000 + index).padStart(4, "0")}`,
  document: `222.222.222-${String(index + 1).padStart(2, "0")}`,
  creci: `PA-${12000 + index}`,
  bio: "Corretor especializado em atendimento consultivo, avaliacao de imoveis e negociacao segura.",
  specialties:
    index % 3 === 0
      ? ["Casa", "Venda"]
      : index % 3 === 1
        ? ["Apartamento", "Aluguel"]
        : ["Comercial", "Terreno", "Venda"],
  serviceAreas: ["Belem", "Umarizal", "Nazare", "Marco", "Pedreira"].slice(0, 2 + (index % 4)),
  commissionRate: 4 + (index % 3) * 0.5,
  verified: index < 9,
  socialLinks: {
    instagram: `https://instagram.com/corretor${index + 1}ninho`,
    linkedin: `https://linkedin.com/in/corretor${index + 1}ninho`,
    whatsapp: `559197777${String(2000 + index).padStart(4, "0")}`,
  },
}));

export const seedUsers = Array.from({ length: 30 }, (_, index) => ({
  name: `Cliente ${String(index + 1).padStart(2, "0")} Ninho`,
  email: `cliente${index + 1}@email.com`,
  phone: `(91) 96666-${String(3000 + index).padStart(4, "0")}`,
  document: `333.333.333-${String(index + 1).padStart(2, "0")}`,
  address: {
    street: `Rua Cliente Feliz, ${100 + index}`,
    district: ["Umarizal", "Nazare", "Marco", "Pedreira", "Marambaia"][index % 5],
    city: "Belem",
    state: "PA",
    zipCode: `660${String(10000 + index).slice(1)}`,
  },
  favorites: [],
  savedSearches: [
    {
      name: "Busca principal",
      filters: {
        status: index % 2 === 0 ? "Venda" : "Aluguel",
        type: ["Casa", "Apartamento", "Cobertura", "Comercial", "Terreno"][index % 5],
        city: "Belem",
        minPrice: index % 2 === 0 ? 250000 : 1500,
        maxPrice: index % 2 === 0 ? 900000 : 7000,
      },
    },
  ],
}));
