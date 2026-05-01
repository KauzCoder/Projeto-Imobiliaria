import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("sobre", "routes/about.jsx"),
  route("imoveis", "routes/search-map.jsx"),
  route("contato", "routes/contact.jsx"),
];
