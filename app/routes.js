import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("sobre", "routes/about.jsx"),
  route("imoveis", "routes/search-map.jsx"),
  route("imoveis/:propertyId", "routes/property-details.jsx"),
  route("contato", "routes/contact.jsx"),
  route("entrar", "routes/login.jsx"),
];
