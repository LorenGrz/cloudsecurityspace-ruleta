/**
 * OpenRuleta — single source of branding, copy and event data.
 *
 * This is the only file you need to edit to make OpenRuleta your own.
 * Everything user-facing in both apps (`apps/form` and `apps/ruleta`) reads
 * from the `siteConfig` object exported at the bottom.
 *
 * Two things live outside this file on purpose:
 *   - Colour palette / fonts  ->  packages/ui/src/theme.css  (Tailwind v4 `@theme`)
 *   - The Google font import   ->  each app's src/app/layout.tsx (compile-time API)
 */

export type Sponsor = {
  name: string;
  /** Path under the app's `public/` dir. Omit to render a name-only card. */
  src?: string;
  /** Free-form tier label shown under the logo (e.g. "Gold"). Optional. */
  tier?: string;
};

export type Collaborator = {
  name: string;
  /** Path under the app's `public/` dir. Omit to render a name-only card. */
  src?: string;
};

export type DocFieldConfig = {
  /** When false, the form drops the field entirely and the DB column stays null. */
  enabled: boolean;
  label: string;
  hint: string;
  placeholder: string;
  /** Max characters accepted by the input. */
  maxLength: number;
  /** Regex source (no slashes) the value must match when the field is enabled. */
  pattern: string;
  /** Prefix shown before the masked value, e.g. "ID ••• 123". */
  displayLabel: string;
  /** Glyphs standing in for the hidden part of the value. */
  maskGlyph: string;
};

/**
 * Landscape 1920x1080 QR poster rendered by `pnpm poster <form-url>`
 * (apps/form/scripts/poster.mjs) and projected full-screen by the wheel's
 * "Show QR" button. Logo and sponsor chips come from `assets.logo` /
 * `sponsors[]`; everything else on the poster is configured here.
 */
export type PosterConfig = {
  /** Big headline. Use `\n` for a line break. */
  title: string;
  /** Uppercase line under the headline (e.g. the event name). */
  subtitle: string;
  /** Short line under the QR code, inside the white card. */
  hint: string;
  /** Label above the sponsor chips. */
  supportLabel: string;
  /** CSS `background` value for the whole poster (colour, gradients…). */
  background: string;
  /** Dark text colour used on white surfaces (QR hint, name-only chips). */
  ink: string;
  /** Accent colour: the URL pill and the glow around the QR card. */
  accent: string;
  /** Google Fonts family name, loaded by the poster page. Default "Montserrat". */
  font?: string;
  /** Put the logo on a white card (for dark logos on a dark background). Default true. */
  logoCard?: boolean;
};

/**
 * Winner email. Sent over SMTP when apps/ruleta has SMTP_USER / SMTP_PASS set
 * (the address is then replaced by the SMTP account, the display name kept);
 * otherwise simulated, nothing is sent. `{name}` and `{prize}`
 * are substituted in `subject` and `body`; `body` is plain text, blank lines
 * become paragraphs in the HTML preview.
 */
export type WinnerEmailConfig = {
  /** "Display Name <address>" or a bare address. */
  from: string;
  subject: string;
  body: string;
};

/** Labels for the four draw modes, keyed by mode id (see apps/ruleta draw registry). */
export type DrawModeLabels = {
  wheel: string;
  slot: string;
  grid: string;
  plinko: string;
};

/**
 * Draw-mode presentation: selector copy, mode labels and the colours the
 * slot / grid / plinko modes paint with (the wheel keeps `wheelSegmentFills`).
 */
export type DrawModesConfig = {
  /** Accessible name of the mode selector in the header. */
  selectorLabel: string;
  labels: DrawModeLabels;
  /** Colour reserved for the winning moment (grid pulse, slot name, plinko PRIZE bin). */
  winColor: string;
  /** Text drawn on top of `winColor`. */
  winInk: string;
  plinko: {
    /** Label of the single golden bin. */
    prizeLabel: string;
    /** Label of every other bin. */
    outLabel: string;
    /** Heading of the side ticker listing balls as they land. */
    tickerHeading: string;
    /** Accessible description of the canvas board. */
    boardAriaLabel: string;
    /** Peg colour. */
    pegColor: string;
    /** Ball colours, cycled per participant. */
    ballColors: string[];
    /** Initials drawn on the balls. */
    ballInk: string;
  };
};

export type SiteConfig = {
  /** Product / event name. */
  name: string;
  /** Kebab-case id. Namespaces this deployment's localStorage keys. */
  slug: string;
  /** `<html lang>` value for both apps. */
  lang: string;
  /** BCP-47 locale for date/number formatting in the wheel app. */
  locale: string;

  assets: {
    /** Header wordmark, both apps. */
    logo: string;
    /** Small mark in the centre of the wheel (ruleta only). */
    wheelLogo: string;
    /** Full-screen image the ruleta projects behind "Show QR". */
    poster: string;
  };

  /** Generated QR poster — see {@link PosterConfig}. */
  poster: PosterConfig;

  form: {
    meta: {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
    };
    /** Minimum length for the name field. */
    nameMinLength: number;
    docField: DocFieldConfig;
    messages: {
      sponsorsLabel: string;
      collaboratorsLabel: string;
      privacyNote: string;
      heading: string;
      subtitle: string;
      logoAlt: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      honeypotLabel: string;
      consent: string;
      termsRequired: string;
      submit: string;
      submitting: string;
      successHeading: string;
      ticketLabel: string;
      statusLabel: string;
      statusValue: string;
      deviceNote: string;
      /** Validation errors. */
      nameError: string;
      emailError: string;
      docError: string;
      /** Client transport errors. */
      offline: string;
      genericError: string;
      /** Server (route handler) errors. */
      invalidJson: string;
      invalidData: string;
      serverMisconfigured: string;
      saveFailed: string;
      duplicate: string;
    };
  };

  ruleta: {
    meta: { title: string; description: string };
    /** First-run value of the editable title above the wheel. */
    defaultTitle: string;
    /** Full turns before landing on the winning segment. */
    wheelSpins: number;
    /** Spin animation length in ms (kept in sync with the CSS transition). */
    wheelDurationMs: number;
    /** Confetti burst colours on the winner modal. */
    confettiColors: string[];
    /** Alternating fill for the wheel segments: [even, odd]. */
    wheelSegmentFills: [string, string];
    /** Solid colour of the wheel rim / single-entry disc. */
    wheelRimColor: string;
    /** Draw modes (wheel, slot, grid, plinko) — see {@link DrawModesConfig}. */
    drawModes: DrawModesConfig;
    csv: {
      filenamePrefix: string;
      headers: [string, string, string, string, string];
      /** Filename prefix for the "export all participants" CSV. */
      participantsFilenamePrefix: string;
      /** Columns for the "export all participants" CSV (incl. winners). */
      participantsHeaders: [string, string, string, string, string, string];
    };
    /** Winner email — see {@link WinnerEmailConfig}. */
    email: WinnerEmailConfig;
    messages: {
      sponsorsLabel: string;
      collaboratorsLabel: string;
      privateBadge: string;
      showQr: string;
      posterAlt: string;
      close: string;
      muteSound: string;
      unmuteSound: string;
      /** Header hamburger menu. */
      menu: string;
      menuOpen: string;
      menuClose: string;
      exportParticipantsCsv: string;
      titleAriaLabel: string;
      editTitle: string;
      spin: string;
      spinning: string;
      viewWinners: string;
      resetDraw: string;
      poolEmpty: string;
      noParticipants: string;
      participantsHeading: string;
      inPlay: string;
      refresh: string;
      refreshing: string;
      deleteAll: string;
      deletingAll: string;
      searchPlaceholder: string;
      lastUpdated: string;
      noResults: string;
      wonTag: string;
      skippedTag: string;
      newTag: string;
      deleteEntry: string;
      winnerHeading: string;
      prizeLabel: string;
      prizePlaceholder: string;
      confirmWinner: string;
      saving: string;
      spinAgain: string;
      /** Closes the winner modal without confirming; the person stays in the pool. */
      cancelDraw: string;
      winnersHeading: string;
      exportCsv: string;
      noWinners: string;
      addPrize: string;
      undoWinner: string;
      editPrizePrompt: string;
      /** confirm() dialogs — {name} / {n} are substituted. */
      confirmDelete: string;
      confirmDeleteAll: string;
      confirmResetWithWinners: string;
      confirmReset: string;
      /** Load / write errors surfaced under the wheel. */
      loadFailed: string;
      confirmFailed: string;
      reloadFailed: string;
      prizeFailed: string;
      undoFailed: string;
      deleteFailed: string;
      deleteAllFailed: string;
      resetFailed: string;
      /** Route-handler error bodies. */
      listFailed: string;
      missingId: string;
      notFound: string;
      deleteRouteFailed: string;
      markFailed: string;
      prizeRouteFailed: string;
      undoRouteFailed: string;
      resetRouteFailed: string;
      /** Winner email (simulated). {name} / {time} / {action} are substituted. */
      notifyByEmail: string;
      notifyAriaLabel: string;
      resendEmail: string;
      notifiedBadge: string;
      winnerConfirmed: string;
      done: string;
      emailPreviewHeading: string;
      emailTo: string;
      emailFrom: string;
      emailSubject: string;
      emailBody: string;
      emailMessageId: string;
      emailSending: string;
      emailSent: string;
      /** Status once a real (SMTP) send succeeded. */
      emailDelivered: string;
      emailSimulatedNote: string;
      notifyFailed: string;
      retry: string;
      /** Notify route-handler error bodies. */
      notifyNotWinner: string;
      notifyNoPrize: string;
      notifyInvalidId: string;
      notifyRouteFailed: string;
    };
  };

  sponsors: Sponsor[];
  collaborators: Collaborator[];
};

/** Identity helper — keeps editing type-checked without importing types by hand. */
export function defineSiteConfig(config: SiteConfig): SiteConfig {
  return config;
}

export const siteConfig = defineSiteConfig({
  name: "Cloud Security Space · Ekoparty 2026",
  slug: "cloudsecurityspace-ekoparty-2026",
  lang: "es",
  locale: "es-AR",

  assets: {
    logo: "/logo.png",
    wheelLogo: "/logos/wheel-logo.png",
    poster: "/poster.png",
  },

  poster: {
    title: "ESCANEÁ EL QR\nY PARTICIPÁ",
    subtitle: "Sorteo · Cloud Security Space",
    hint: "Apuntá la cámara de tu celular",
    supportLabel: "CON EL APOYO DE",
    background:
      "radial-gradient(900px 560px at 8% 0%, rgba(225,29,46,.28), transparent 60%), radial-gradient(1100px 680px at 100% 100%, rgba(43,85,199,.32), transparent 60%), linear-gradient(165deg, #0a1020 0%, #070b12 100%)",
    ink: "#0a1020",
    accent: "#2a63e0",
    font: "Akshar",
    logoCard: false,
  },

  form: {
    meta: {
      title: "Sorteo — Cloud Security Space · Ekoparty 2026",
      description:
        "Dejá tus datos para participar del sorteo de Cloud Security Space, el village de seguridad ofensiva y defensiva en la nube de Ekoparty 2026.",
      ogTitle: "Sumate al sorteo de Cloud Security Space",
      ogDescription: "Dejá tus datos para participar del sorteo.",
    },
    nameMinLength: 2,
    docField: {
      enabled: true,
      label: "Últimos 3 dígitos de tu DNI",
      hint: "Solo guardamos los últimos 3 dígitos — nunca tu DNI completo.",
      placeholder: "ej. 123",
      maxLength: 3,
      pattern: "^\\d{3}$",
      displayLabel: "DNI",
      maskGlyph: "•••",
    },
    messages: {
      sponsorsLabel: "Sponsors",
      collaboratorsLabel: "Comunidades",
      privacyNote:
        "Usamos tus datos solo para organizar este sorteo y contactar a la persona ganadora.",
      heading: "Sorteo Cloud Security Space",
      subtitle:
        "Ingresá tus datos para participar del sorteo del village de seguridad ofensiva y defensiva en la nube, en Ekoparty 2026.",
      logoAlt: "Cloud Security Space",
      nameLabel: "Nombre completo",
      namePlaceholder: "ej. Ana Pérez",
      emailLabel: "Email",
      emailPlaceholder: "ana@ejemplo.com",
      honeypotLabel: "No completes este campo",
      consent:
        "Acepto participar de este sorteo y el uso de mis datos para este fin.",
      termsRequired: "Tenés que aceptar los términos para participar.",
      submit: "Participar",
      submitting: "Enviando…",
      successHeading: "¡Ya estás participando!",
      ticketLabel: "Ticket del sorteo",
      statusLabel: "Estado",
      statusValue: "CONFIRMADO",
      deviceNote:
        "Este dispositivo ya participó una vez. Una entrada por persona.",
      nameError: "Ingresá tu nombre.",
      emailError: "Ingresá un email válido.",
      docError: "Tienen que ser exactamente 3 dígitos.",
      offline: "Parece que estás sin conexión. Revisá tu internet.",
      genericError: "No se pudo enviar el formulario.",
      invalidJson: "JSON inválido.",
      invalidData: "Datos inválidos.",
      serverMisconfigured:
        "Configuración del servidor incompleta (Supabase): faltan variables de entorno.",
      saveFailed: "No se pudo guardar. Intentá de nuevo.",
      duplicate: "Ese email ya está participando.",
    },
  },

  ruleta: {
    meta: {
      title: "Ruleta de ganadores — Cloud Security Space",
      description:
        "Ruleta local para elegir ganadores del sorteo de Cloud Security Space, Ekoparty 2026.",
    },
    defaultTitle: "Sorteo Cloud Security Space",
    wheelSpins: 6,
    wheelDurationMs: 4600,
    confettiColors: ["#0a1020", "#2a63e0", "#e11d2e", "#ffffff"],
    wheelSegmentFills: ["#2a63e0", "#0a1020"],
    wheelRimColor: "#e11d2e",
    drawModes: {
      selectorLabel: "Modo de sorteo",
      labels: {
        wheel: "Ruleta",
        slot: "Tragamonedas",
        grid: "Grilla",
        plinko: "Plinko",
      },
      winColor: "#f5b82e",
      winInk: "#1a1200",
      plinko: {
        prizeLabel: "PREMIO",
        outLabel: "afuera",
        tickerHeading: "Cayendo",
        boardAriaLabel:
          "Tablero de plinko: cada participante cae como una pelotita y solo una entra en el cajón del premio.",
        pegColor: "#9fb8e6",
        ballColors: ["#2a63e0", "#e11d2e", "#4f7fe8", "#b3121f", "#1d4ed8"],
        ballInk: "#ffffff",
      },
    },
    csv: {
      filenamePrefix: "sorteo-cloudsecurityspace",
      headers: ["nombre", "email", "dni_ult_3", "premio", "ganó_el"],
      participantsFilenamePrefix: "participantes-cloudsecurityspace",
      participantsHeaders: [
        "nombre",
        "email",
        "dni_ult_3",
        "inscripto_el",
        "ganó_el",
        "premio",
      ],
    },
    email: {
      from: "Cloud Security Space · Ekoparty <no-reply@cloudsecurityspace.org>",
      subject: "¡Ganaste {prize}!",
      body: "Hola {name},\n\n¡Felicitaciones! Ganaste el premio {prize} en el sorteo de Cloud Security Space · Ekoparty 2026.\n\nAcercate al stand de Cloud Security Space para retirarlo.\n\nEl equipo de Cloud Security Space",
    },
    messages: {
      sponsorsLabel: "Sponsors",
      collaboratorsLabel: "Comunidades",
      privateBadge: "Privado · vista local",
      showQr: "Mostrar QR",
      posterAlt: "Escaneá el código QR para participar del sorteo",
      close: "Cerrar (Esc)",
      muteSound: "Silenciar ruleta",
      unmuteSound: "Activar sonido",
      menu: "Menú",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      exportParticipantsCsv: "Exportar CSV de participantes",
      titleAriaLabel: "Título del sorteo",
      editTitle: "Editar título",
      spin: "Girar",
      spinning: "Girando…",
      viewWinners: "Ver ganadores ({n})",
      resetDraw: "Reiniciar sorteo (volver a meter a todos)",
      poolEmpty: "No queda nadie en el pozo.",
      noParticipants: "Todavía no hay participantes. Compartí el formulario.",
      participantsHeading: "Participantes — {n}",
      inPlay: "{n} en juego",
      refresh: "Actualizar participantes",
      refreshing: "Actualizando…",
      deleteAll: "Eliminar todos los participantes",
      deletingAll: "Eliminando…",
      searchPlaceholder: "Buscar participante…",
      lastUpdated: "Última actualización {time}",
      noResults: "No hay resultados para esa búsqueda.",
      wonTag: "ganó",
      skippedTag: "afuera",
      newTag: "Nuevo",
      deleteEntry: "Eliminar de la base de datos",
      winnerHeading: "Ganador/a",
      prizeLabel: "Premio (opcional)",
      prizePlaceholder: "ej. Gift card, libro, remera…",
      confirmWinner: "Confirmar ganador/a",
      saving: "Guardando…",
      spinAgain: "Saltear y girar de nuevo",
      cancelDraw: "Cancelar — no cuenta",
      winnersHeading: "Ganadores ({n})",
      exportCsv: "Exportar CSV",
      noWinners: "Todavía no hay ganadores.",
      addPrize: "+ premio",
      undoWinner: "Deshacer (volver al pozo)",
      editPrizePrompt: "Premio para {name}:",
      confirmDelete:
        "¿Eliminar a {name} de la base de datos? Esta acción no se puede deshacer.",
      confirmDeleteAll:
        "Estás por ELIMINAR a los {n} participantes. Esta acción no se puede deshacer. ¿Estás seguro/a?",
      confirmResetWithWinners:
        "Esto vuelve a meter a {n} ganador(es) en el pozo. ¿Estás seguro/a?",
      confirmReset: "¿Reiniciar el sorteo?",
      loadFailed: "No se pudo cargar la lista.",
      confirmFailed: "No se pudo confirmar al ganador/a. Intentá de nuevo.",
      reloadFailed:
        "Ganador/a confirmado/a, pero no se pudo actualizar la lista. Actualizala a mano.",
      prizeFailed: "No se pudo guardar el premio.",
      undoFailed: "No se pudo deshacer.",
      deleteFailed: "No se pudo eliminar al participante.",
      deleteAllFailed: "No se pudo eliminar a los participantes.",
      resetFailed: "No se pudo reiniciar.",
      listFailed: "No se pudo leer la lista desde Supabase.",
      missingId: "Falta el id.",
      notFound: "No se encontró al participante.",
      deleteRouteFailed: "No se pudo eliminar.",
      markFailed: "No se pudo confirmar.",
      prizeRouteFailed: "No se pudo guardar el premio.",
      undoRouteFailed: "No se pudo deshacer.",
      resetRouteFailed: "No se pudo reiniciar.",
      notifyByEmail: "Avisar por correo",
      notifyAriaLabel: "{action}: {name}",
      resendEmail: "Reenviar correo",
      notifiedBadge: "Avisado {time}",
      winnerConfirmed: "Ganador/a confirmado/a ✓",
      done: "Listo",
      emailPreviewHeading: "Correo al ganador/a",
      emailTo: "Para",
      emailFrom: "De",
      emailSubject: "Asunto",
      emailBody: "Mensaje",
      emailMessageId: "ID del mensaje",
      emailSending: "Enviando…",
      emailSent: "Enviado (simulado) ✓",
      emailDelivered: "Correo enviado ✓",
      emailSimulatedNote:
        "Simulación: no se envió ningún correo real. Esta es una vista previa de lo que recibiría el/la ganador/a.",
      notifyFailed: "No se pudo enviar el correo. Intentá de nuevo.",
      retry: "Reintentar",
      notifyNotWinner: "Este participante no ganó.",
      notifyNoPrize: "Asigná un premio antes de avisarle al ganador/a.",
      notifyInvalidId: "Id inválido.",
      notifyRouteFailed: "No se pudo enviar el correo.",
    },
  },

  sponsors: [
    { name: "AWS", src: "/logos/aws.png" },
    { name: "Electronic Cats", src: "/logos/electronic-cats.png" },
    { name: "OffSec", src: "/logos/offsec-mono.png" },
    { name: "Altered Security", src: "/logos/altered-security.png" },
    { name: "Spartan Cybersecurity", src: "/logos/spartan-cybersecurity.png" },
  ],
  collaborators: [],
});
