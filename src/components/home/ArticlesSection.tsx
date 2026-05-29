"use client";

import { useEffect, useRef, useState } from "react";
import { mockSpecialtyServices } from "../../data/mockSpecialtyServices";
import styles from "./ArticlesSection.module.css";

export function ArticlesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: "100px" } // Inicia un poco antes de que sea visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600" tabIndex={0}>
          Nuestros servicios
        </p>

        <h2 className="mt-3 text-4xl font-bold text-slate-900" tabIndex={0}>
          Especialidades médicas disponibles
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600" tabIndex={0}>
          Ponemos a tu disposición distintas áreas de atención sanitaria para
          ofrecer un seguimiento más completo y especializado. Contamos con
          varios centros médicos.
        </p>

        <div className="mt-10 overflow-hidden">
          <div className={`flex w-max gap-6 pt-0 mt-5 motion-reduce:flex-wrap motion-reduce:w-auto ${isInView ? styles.specialtiesScroll : ""}`}>
            {[...mockSpecialtyServices, ...mockSpecialtyServices].map(
              (service, index) => (
                <article
                  key={`${service.specialty}-${index}`}
                  className="w-[320px] shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5"
                  tabIndex={0}
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.specialty}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {service.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
