import Link from 'next/link'

export const metadata = {
  title: 'Términos y condiciones — Tony Alvarado',
  description:
    'Condiciones de uso del sitio tonyalvarado.com. Información sobre contenido, inversión, formularios y propiedad intelectual.',
  alternates: { canonical: '/terminos-y-condiciones' },
}

export default function TerminosYCondicionesPage() {
  return (
    <main className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-brand-text">Términos y condiciones</h1>
        <p className="mt-4 text-sm text-brand-muted">Última actualización: junio 2026</p>
      </section>

      {/* Contenido */}
      <div className="mx-auto max-w-3xl px-6 pb-24">

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">1. Uso del sitio</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            El sitio tonyalvarado.com es de carácter informativo y tiene como objetivo presentar
            la marca personal de Tony Alvarado, sus empresas, proyectos y contenidos. El acceso
            y uso de este sitio no crea ninguna relación contractual, laboral ni de inversión entre
            el visitante y Tony Alvarado o sus empresas, a menos que se haya formalizado un acuerdo
            independiente por escrito.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">2. Contenido informativo</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            La información sobre programas (como Pure Cycling), libros, conferencias, hoteles
            y servicios presentada en este sitio tiene fines informativos. No constituye una oferta
            vinculante de compra, venta, membresía ni contratación. Las condiciones, precios
            y disponibilidad pueden cambiar sin previo aviso.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">3. Resultados no garantizados</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Este sitio puede incluir testimonios y casos de éxito de participantes en programas
            de Tony Alvarado. Estos reflejan experiencias individuales y no representan resultados
            típicos. No se garantizan resultados deportivos, físicos, financieros, médicos ni
            personales de ningún tipo. Cada persona obtiene resultados distintos según sus
            condiciones, esfuerzo y contexto.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">4. Información sobre inversión</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            La información sobre oportunidades de inversión en Bike & Bed Hotels u otras empresas
            de Tony Alvarado es referencial y no constituye una oferta pública de valores ni
            una invitación formal a invertir. Toda participación o acuerdo de inversión requiere
            un proceso de evaluación independiente, asesoría legal y documentación formal. No se
            garantizan rendimientos, ingresos ni rentabilidad de ningún tipo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">5. Enlaces externos</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Este sitio contiene enlaces a plataformas externas como Skool, Amazon, PuroMTB y
            Bike & Bed Hotels, entre otros. Estos enlaces se proporcionan por conveniencia.
            Tony Alvarado no se responsabiliza por el contenido, políticas ni disponibilidad
            de sitios de terceros.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">6. Formularios de contacto</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Al enviar el formulario de contacto, aceptas que el equipo de Tony Alvarado utilice
            los datos proporcionados para responder tu solicitud específica y dar seguimiento
            relacionado con el tema consultado. Para más detalles sobre el manejo de tus datos,
            consulta la{' '}
            <Link
              href="/politica-de-privacidad"
              className="text-brand-accent hover:underline"
            >
              Política de privacidad
            </Link>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">7. Propiedad intelectual</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Todo el contenido de este sitio — incluyendo textos, imágenes, logotipos, videos,
            diseño y estructura — es propiedad de Tony Alvarado o de las empresas que representa.
            Queda prohibida su reproducción, distribución o uso comercial sin autorización escrita
            previa.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">8. Limitación de responsabilidad</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Este sitio se brinda en el estado en que se encuentra, sin garantías de disponibilidad
            continua ni exactitud absoluta de la información. Tony Alvarado no se hace responsable
            de daños directos o indirectos derivados del uso o la imposibilidad de acceder al sitio.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">9. Modificaciones</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Estos términos pueden actualizarse en cualquier momento. La fecha de la última
            modificación aparece al inicio de esta página. El uso continuado del sitio después
            de una actualización implica la aceptación de los nuevos términos.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">10. Contacto</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Para consultas relacionadas con estos términos, escríbenos a{' '}
            <a
              href="mailto:info@tonyalvarado.com"
              className="text-brand-accent hover:underline"
            >
              info@tonyalvarado.com
            </a>
            .
          </p>
        </section>

        <div className="mt-12 border-t border-brand-border pt-8">
          <Link
            href="/"
            className="text-sm text-brand-accent hover:underline"
          >
            ← Volver al inicio
          </Link>
        </div>

      </div>
    </main>
  )
}
