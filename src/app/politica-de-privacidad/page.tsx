import Link from 'next/link'

export const metadata = {
  title: 'Política de privacidad — Tony Alvarado',
  description:
    'Conoce cómo tonyalvarado.com recopila, usa y protege la información que compartes a través del sitio.',
  alternates: { canonical: '/politica-de-privacidad' },
}

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="bg-brand-bg min-h-screen">
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
          Legal
        </p>
        <h1 className="text-4xl font-bold text-brand-text">Política de privacidad</h1>
        <p className="mt-4 text-sm text-brand-muted">Última actualización: junio 2026</p>
      </section>

      {/* Contenido */}
      <div className="mx-auto max-w-3xl px-6 pb-24">

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">1. Responsable del sitio</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Este sitio web es operado por el equipo de Tony Alvarado desde Costa Rica.
            Si tienes alguna pregunta sobre el uso de tus datos, puedes escribir a{' '}
            <a
              href="mailto:info@tonyalvarado.com"
              className="text-brand-accent hover:underline"
            >
              info@tonyalvarado.com
            </a>
            .
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">2. Qué datos se recopilan</h2>
          <p className="mb-3 text-sm leading-relaxed text-brand-muted">
            Cuando completas el formulario de contacto, se recopilan los siguientes datos que tú
            proporcionas voluntariamente:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-brand-muted space-y-1">
            <li>Nombre</li>
            <li>Correo electrónico</li>
            <li>WhatsApp (opcional)</li>
            <li>Empresa u organización (opcional)</li>
            <li>Tipo de consulta o interés</li>
            <li>Mensaje</li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            Además, herramientas de medición como Google Analytics recopilan de forma automática
            datos técnicos anónimos (por ejemplo: páginas visitadas, duración de sesión, tipo de
            dispositivo, país aproximado). Estos datos no permiten identificarte personalmente.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">3. Para qué se usan los datos</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Los datos del formulario se usan exclusivamente para responder tu solicitud, gestionar
            la consulta correspondiente (conferencia, inversión, Pure Cycling, etc.) y dar
            seguimiento si así lo solicitas. Los datos técnicos anónimos se usan para entender
            el comportamiento del sitio y mejorar la experiencia de los visitantes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">4. No se venden datos a terceros</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Tus datos personales no se venden, alquilan ni ceden a terceros con fines comerciales.
            El acceso a los datos está limitado al equipo responsable y a proveedores técnicos
            necesarios para operar el sitio, como servicios de correo, analítica y gestión
            de contenido.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">5. Herramientas de terceros</h2>
          <p className="mb-3 text-sm leading-relaxed text-brand-muted">
            Este sitio utiliza las siguientes herramientas de terceros:
          </p>
          <ul className="list-disc pl-5 text-sm leading-relaxed text-brand-muted space-y-1.5">
            <li>
              <strong className="text-brand-text">Google Tag Manager y Google Analytics</strong> —
              para medir el tráfico y el comportamiento anónimo de los visitantes.
            </li>
            <li>
              <strong className="text-brand-text">Resend</strong> — servicio de envío de correos
              transaccionales para recibir y gestionar los mensajes del formulario.
            </li>
            <li>
              <strong className="text-brand-text">Sanity CMS</strong> — plataforma de gestión de
              contenido para el blog y otras secciones editoriales del sitio.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            Cada uno de estos servicios tiene su propia política de privacidad. Te recomendamos
            revisarlas si deseas más detalles sobre cómo manejan los datos.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">6. Conservación de los datos</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Los datos enviados por el formulario se conservan el tiempo necesario para gestionar
            tu solicitud y dar seguimiento adecuado. Si deseas que se eliminen antes, puedes
            solicitarlo por correo.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">7. Tus derechos</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Tienes derecho a solicitar acceso, corrección o eliminación de los datos personales
            que hayas compartido con nosotros. Para ejercer cualquiera de estos derechos, escríbenos
            a{' '}
            <a
              href="mailto:info@tonyalvarado.com"
              className="text-brand-accent hover:underline"
            >
              info@tonyalvarado.com
            </a>{' '}
            y atenderemos tu solicitud a la brevedad.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">8. Actualizaciones</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Esta política puede actualizarse en cualquier momento. La fecha de la última
            modificación aparece al inicio de esta página. Si realizamos cambios importantes,
            lo indicaremos en el sitio.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-3 text-xl font-bold text-brand-text">9. Contacto</h2>
          <p className="text-sm leading-relaxed text-brand-muted">
            Para cualquier consulta relacionada con esta política, escríbenos a{' '}
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
