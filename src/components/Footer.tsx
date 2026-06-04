import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import unalLogo from '@/assets/logo-unal.svg';
import styles from './Footer.module.css';

const footerGroups = [
  {
    title: 'Atención y servicios',
    links: [
      { label: 'Quejas y reclamos', href: 'https://quejasyreclamos.unal.edu.co/' },
      { label: 'Atención en línea', href: 'https://unal.edu.co/atencion-en-linea/' },
      { label: 'Buzón de notificaciones', href: 'https://unal.edu.co/buzon-de-notificaciones/' },
      { label: 'Contáctenos', href: 'https://unal.edu.co/contactenos' },
    ],
  },
  {
    title: 'Enlaces institucionales',
    links: [
      { label: 'Régimen legal', href: 'https://legal.unal.edu.co' },
      { label: 'Contratación', href: 'https://portaladquisiciones.unal.edu.co/' },
      { label: 'Talento humano', href: 'https://personal.unal.edu.co' },
      { label: 'Estadísticas', href: 'https://estadisticas.unal.edu.co/' },
    ],
  },
];

const templateCssFiles = [
  '/prototipo-producto/assets/Header-UNAL/css/frontend.css',
  '/prototipo-producto/assets/Header-UNAL/css/bootstrap.min.css',
  '/prototipo-producto/assets/Header-UNAL/css/bootstrap-theme.min.css',
  '/prototipo-producto/assets/Header-UNAL/css/reset.css',
  '/prototipo-producto/assets/Header-UNAL/css/unal.css',
  '/prototipo-producto/assets/Header-UNAL/css/base.css',
  '/prototipo-producto/assets/Header-UNAL/css/tablet.css',
  '/prototipo-producto/assets/Header-UNAL/css/phone.css',
  '/prototipo-producto/assets/Header-UNAL/css/small.css',
  '/prototipo-producto/assets/Header-UNAL/css/printer.css',
];

const institutionalFooterOverrides = `
  :host {
    display: block;
  }

  .unal-footer-host {
    display: block;
  }

  .unal-footer-host * {
    box-sizing: border-box;
  }

  .unal-footer-host footer {
    margin: 0;
  }
`;

const InstitutionalFooterTemplate = () => (
  <>
    {templateCssFiles.map((href) => (
      <link key={href} rel="stylesheet" href={href} />
    ))}
    <style>{institutionalFooterOverrides}</style>

    <div className="unal-footer-host">
      <footer className="clear container-fluid">
        <div className="row">
          <nav className="col-lg-3 col-md-3 col-sm-4 col-6 gobiernoLinea">
            <a href="https://legal.unal.edu.co" target="_blank" rel="noreferrer">Régimen Legal</a>
            <a href="https://personal.unal.edu.co" target="_blank" rel="noreferrer">Talento humano</a>
            <a href="https://portaladquisiciones.unal.edu.co/" target="_blank" rel="noreferrer">Contratación</a>
            <a href="https://personal.unal.edu.co" target="_blank" rel="noreferrer">Ofertas de empleo</a>
            <a href="https://launalcuenta.unal.edu.co/" target="_blank" rel="noreferrer">Rendición de cuentas</a>
            <a href="https://docentes.unal.edu.co/concurso-profesoral/" target="_blank" rel="noreferrer">Concurso docente</a>
            <a href="https://pagovirtual.unal.edu.co/" target="_blank" rel="noreferrer">Pago Virtual</a>
            <a href="https://controlinterno.unal.edu.co/" target="_blank" rel="noreferrer">Control interno</a>
            <a href="http://siga.unal.edu.co" target="_blank" rel="noreferrer">Calidad</a>
            <a href="https://unal.edu.co/buzon-de-notificaciones/" target="_blank" rel="noreferrer">Buzón de notificaciones</a>
          </nav>

          <nav className="col-lg-3 col-md-3 col-sm-4 col-6 gobiernoLinea">
            <a href="https://smartkey.xertica.com/cloudkey/a/unal.edu.co/user/login" target="_blank" rel="noreferrer">Correo institucional</a>
            <a href="#" target="_self" rel="noreferrer">Mapa del sitio</a>
            <a href="https://redessociales.unal.edu.co" target="_blank" rel="noreferrer">Redes Sociales</a>
            <a href="#" target="_self" rel="noreferrer">FAQ</a>
            <a href="https://quejasyreclamos.unal.edu.co/" target="_blank" rel="noreferrer">Quejas y reclamos</a>
            <a href="https://unal.edu.co/atencion-en-linea/" target="_blank" rel="noreferrer">Atención en línea</a>
            <a href="https://unal.edu.co/encuesta/" target="_blank" rel="noreferrer">Encuesta</a>
            <a href="https://unal.edu.co/contactenos" target="_blank" rel="noreferrer">Contáctenos</a>
            <a href="https://estadisticas.unal.edu.co/" target="_blank" rel="noreferrer">Estadísticas</a>
            <a href="#" target="_self" rel="noreferrer">Glosario</a>
          </nav>

          <div className="col-lg-4 col-md-4 col-sm-4 col-12 footer-info">
            <div className="row footer-info-spacing">
              <p className="col-lg-6 col-md-12 col-sm-12 col-6 contacto">
                <b>Contacto página web:</b><br />
                Carrera 45 # 26-85 Of. 000<br />
                Edif. Uriel Gutiérrez - Bogotá D.C., Colombia<br />
                PBX: (+57) 601 4068888 - (+57) 601 3165000<br />
                Línea Gratuita Nacional: 01 8000 912 597
              </p>
              <p className="col-lg-6 col-md-12 col-sm-12 col-6 derechos">
                <a href="https://unal.edu.co/archivos/user_upload/docs/legal.pdf" target="_blank" rel="noreferrer">© Copyright 2019</a><br />
                Algunos derechos reservados.<br />
                <a href="mailto:correo@unal.edu.co">correo@unal.edu.co</a><br />
                <a href="#">Acerca de este sitio web</a><br />
                Actualización: 01/02/26
              </p>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-12 col-12 logos">
            <div className="row px-3">
              <div className="col-lg-6 col-md-12 col-sm-6 col-6 no-padding">
                <div className="row mx-1">
                  <a className="col-md-12 col-sm-6 col-6" href="https://orgullo.unal.edu.co" target="_blank" rel="noreferrer">
                    <img alt="Orgullo UN" src="/prototipo-producto/assets/Header-UNAL/images/log_orgullo.png" width="78" height="21" />
                  </a>
                  <a className="col-md-12 col-sm-6 col-6 imgAgencia" href="https://agenciadenoticias.unal.edu.co" target="_blank" rel="noreferrer">
                    <img alt="Agencia de Noticias" src="/prototipo-producto/assets/Header-UNAL/images/log_agenc.png" width="94" height="25" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-6 col-6 no-padding">
                <div className="row mx-1">
                  <a className="col-md-12 col-sm-6 col-6" href="https://www.gov.co/" target="_blank" rel="noreferrer">
                    <img alt="Portal Único del Estado Colombiano" src="/prototipo-producto/assets/Header-UNAL/images/log_gobiern.png" width="67" height="51" />
                  </a>
                  <a className="col-md-12 col-sm-6 col-6" href="http://www.contaduria.gov.co/" target="_blank" rel="noreferrer">
                    <img alt="Contaduría General de la República" src="/prototipo-producto/assets/Header-UNAL/images/log_contra.png" width="67" height="51" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </>
);

const Footer = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!hostRef.current || hostRef.current.shadowRoot) return;
    const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });
    const mountNode = document.createElement('div');
    shadowRoot.appendChild(mountNode);
    setPortalContainer(mountNode);
  }, []);

  return (
    <footer className={styles.unalPortalFooter}>
      <div className={styles.unalPortalFooterTop}>
        <div className={styles.unalPortalFooterContainer}>
          <div className={styles.unalPortalFooterBranding}>
            <a href="https://unal.edu.co/" target="_blank" rel="noreferrer" className={styles.unalPortalFooterLogoLink}>
              <span className={styles.unalPortalFooterLogoCard}>
                <img src={unalLogo} alt="Universidad Nacional de Colombia" className={styles.unalPortalFooterUnalLogo} />
              </span>
            </a>
            <a href="https://portaldelibros.unal.edu.co/" className={styles.unalPortalFooterSubdomain}>
              portaldelibros.unal.edu.co
            </a>
            <p className={styles.unalPortalFooterDescription}>
              Publicaciones académicas y culturales de la Universidad Nacional de Colombia al servicio de la investigación, la docencia y la extensión.
            </p>
          </div>

          <div className={styles.unalPortalFooterGrid}>
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className={styles.unalPortalFooterTitle}>{group.title}</h2>
                <ul className={styles.unalPortalFooterList}>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noreferrer" className={styles.unalPortalFooterLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h2 className={styles.unalPortalFooterTitle}>Contacto página web</h2>
              <div className={styles.unalPortalFooterContact}>
                <p>Carrera 45 # 26-85, Bogotá D.C., Colombia</p>
                <p>PBX: (+57) 601 4068888 - (+57) 601 3165000</p>
                <p>Línea Gratuita Nacional: 01 8000 912 597</p>
                <p>correo@unal.edu.co</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={hostRef} />
      {portalContainer ? createPortal(<InstitutionalFooterTemplate />, portalContainer) : null}

      <div className={styles.unalPortalFooterBottom}>
        <div className={styles.unalPortalFooterContainer}>
          <p className={styles.unalPortalFooterLegal}>
            © 2026 Universidad Nacional de Colombia · Portal de Libros UNAL. Todos los derechos reservados. Desarrollado por Hipertexto - Netizen. 2026 © Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
