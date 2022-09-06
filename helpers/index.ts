enum ENPost {
  'building-multilanguage-nextjs' = 'building-multilanguage-nextjs',
  'challenges-n-achievements-portfolio' = 'challenges-n-achievements-portfolio',
  'curved-bottom-tab-react-native' = 'curved-bottom-tab-react-native',
  'firebase-persisted-auth-nextjs' = 'firebase-persisted-auth-nextjs',
  'global-status-modal-hoc' = 'global-status-modal-hoc',
}

enum PTBRPost {
  'desafios-e-conquistas-portfolio' = 'desafios-e-conquistas-portfolio',
}

export const mapENPostByPTBRLocale: {
  [key in PTBRPost]: ENPost
} = {
  [PTBRPost['desafios-e-conquistas-portfolio']]:
    ENPost['challenges-n-achievements-portfolio'],
}

export const mapPTBRPostByENLocale: { [key in ENPost]?: PTBRPost } = {
  [ENPost['challenges-n-achievements-portfolio']]:
    PTBRPost['desafios-e-conquistas-portfolio'],
}
