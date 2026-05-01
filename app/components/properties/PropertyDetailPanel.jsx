import { useState } from "react";
import { Link } from "react-router";
import { currencyFormatter } from "./currencyFormatter";

export function PropertyDetailPanel({ property, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [property.image, property.image, property.image, property.image, property.image];

  return (
    <section className="absolute left-1/2 top-1/2 z-50 w-[min(400px,calc(100%-32px))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl">
      <div className="relative h-[245px]">
        <img src={images[currentImage]} alt={property.title} className="h-full w-full object-cover" />
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full bg-black p-2 text-white transition hover:bg-slate-800"
          aria-label="Fechar detalhes"
        >
          <svg className="size-5" fill="none" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImage(index)}
              className={`size-3 rounded-full transition ${
                index === currentImage ? "bg-black" : "bg-slate-400 hover:bg-slate-500"
              }`}
              aria-label={`Imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <p className="mb-4 text-sm font-bold text-black">{property.locationText}</p>

        <div className="mb-6 flex gap-3">
          {[
            ["Metros", property.area],
            ["Quartos", property.beds],
            ["Banheiros", property.baths],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-1 flex-col items-center gap-1 rounded border border-black/40 bg-[#f5f5f5] px-3 py-3"
            >
              <span className="text-sm font-semibold text-[#404040]">{value}</span>
              <span className="text-[10px] font-bold text-black/40">{label}</span>
            </div>
          ))}
        </div>

        <p className="mb-4 text-justify text-xs leading-5 text-[#6f6f6f]">{property.description}</p>

        <p className="mb-6 text-center text-xl font-extrabold text-black">
          {currencyFormatter.format(property.price)}
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 flex-1 rounded-md border border-black text-sm font-medium text-black transition hover:bg-slate-100"
          >
            Fechar
          </button>
          <Link
            to={`/imoveis/${property.id}`}
            className="flex min-h-11 flex-1 items-center justify-center rounded-md bg-black text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Ver informacoes
          </Link>
        </div>
      </div>
    </section>
  );
}
