// Gina · CRM Strategy — site settings (contact, legal, language routing)
// © 2026 Isaac Antunes. All rights reserved.

export const AUTHOR = 'Isaac Antunes';
export const YEAR = 2026;
export const EMAIL = 'iantunessp@gmail.com';
export const LINKEDIN = 'https://www.linkedin.com/in/isaacnandes/';

// Fill in once the page has a public address, so link previews resolve
// og:image to an absolute URL (LinkedIn and WhatsApp ignore relative paths).
export const SITE_URL = 'https://isaacantunesfacha-dev.github.io/gina-crm';

export const MAIL_SUBJECT = {
  en: 'CRM diagnosis - Gina',
  pt: 'Diagnóstico de CRM - Gina',
};

export const LANGS = {
  en: { html: 'en', path: 'index.html', root: '', label: 'EN' },
  pt: { html: 'pt-BR', path: 'pt/index.html', root: '../', label: 'PT' },
};

export const UI = {
  en: {
    skip: 'Skip to content',
    langNav: 'Language',
    title: 'CRM strategy · lifecycle marketing and customer retention · Gina',
    ogTitle: 'Gina — CRM strategy and retention with agents',
    ogDesc: "Small businesses don't grow by chasing new customers every day. They grow when existing buyers come back.",
    walkerAlt: 'Gina walking along the channel line',
    rights: `© ${YEAR} ${AUTHOR}. All rights reserved.`,
    rightsDetail: 'Gina (name, character and illustrations), method, copy and page design are original work by the author. Reproduction, adaptation or commercial use requires written permission.',
    fiction: 'Businesses, customers and figures shown in the examples are fictional and illustrative.',
    top: 'Back to top ↑',
  },
  pt: {
    skip: 'Pular para o conteúdo',
    langNav: 'Idioma',
    title: 'Estratégia de CRM · retenção de clientes e régua de relacionamento · Gina',
    ogTitle: 'Gina — Estratégia de CRM e retenção com agentes',
    ogDesc: 'Pequeno negócio não cresce buscando cliente novo todo dia. Cresce quando quem já veio volta.',
    walkerAlt: 'Gina andando pela linha de canais',
    rights: `© ${YEAR} ${AUTHOR}. Todos os direitos reservados.`,
    rightsDetail: 'Gina (nome, personagem e ilustrações), método, textos e design da página são obra original do autor. Reprodução, adaptação ou uso comercial dependem de autorização por escrito.',
    fiction: 'Negócios, clientes e números dos exemplos são fictícios e ilustrativos.',
    top: 'Voltar ao topo ↑',
  },
};
