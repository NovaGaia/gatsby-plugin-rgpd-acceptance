/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */
// You can delete this file if you're not using it

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.com/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log('Loaded gatsby-starter-plugin')

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    cookieDuration: Joi.number()
      .integer()
      .optional()
      .description(`Add duration length before revalidate acceptance.`)
      .default(31557600000),
    useInternalCss: Joi.boolean()
      .optional()
      .description(`Add usage of the internal css.`)
      .default(true),
    useInternalComponent: Joi.boolean()
      .optional()
      .description(`Automaticaly add the cookie acceptance banner.`)
      .default(true),
    labels: Joi.object({
      icon: Joi.string().description('Banner icon/emoji').default('🍪'),
      titleBanner: Joi.string()
        .optional()
        .description('Banner title')
        .default('Les cookies'),
      descriptionBanner: Joi.string()
        .optional()
        .description('Description of the module / Privacy policy.')
        .default(
          `Nous utilisons des cookies et des technologies similaires sur notre site web et traitons vos données personnelles (par exemple, l'adresse IP), par exemple, pour personnaliser le contenu et les annonces, pour intégrer des médias de fournisseurs tiers ou pour analyser le trafic sur notre site web.<br/> Le traitement des données peut également se produire à la suite de la mise en place de cookies. Nous partageons ces données avec des tiers que nous nommons dans les paramètres de confidentialité. Le traitement des données peut avoir lieu avec votre consentement ou sur la base d'un intérêt légitime, auquel vous pouvez vous opposer dans les paramètres de confidentialité. Vous avez le droit de ne pas consentir et de modifier ou révoquer votre consentement ultérieurement. Pour plus d'informations sur l'utilisation de vos données, veuillez consulter notre politique de confidentialité.`
        ),
      acceptAllLabel: Joi.string()
        .optional()
        .description('All acceptance label button.')
        .default('Accepter tout'),
      rejectAllLabel: Joi.string()
        .optional()
        .description('None acceptance label button.')
        .default('Rejeter tout'),
      chooseLabel: Joi.string()
        .optional()
        .description('Choose acceptance label button.')
        .default('Choisir'),
      saveLabel: Joi.string()
        .optional()
        .description('Save acceptance label button.')
        .default('Enregistrer'),
      mandatoryLabel: Joi.string()
        .optional()
        .description('mandatoryLabel alert.')
        .default('obligatoire'),
      blockerWarnLabel: Joi.string()
        .optional()
        .description('Valid acceptance label button in RGPDBlocker Component.')
        .default('Accepter'),
      blockerWarnMessage: Joi.string()
        .optional()
        .description('Warning message in RGPDBlocker Component.')
        .default(
          `Vous n'avez pas accepté les cookies globalement ou celui-ci précisement.<br/> Pour afficher ce contenu, vous devez accepter.`
        ),
    }),
    cookiesList: Joi.array()
      .items(
        Joi.object({
          key: Joi.string()
            .case('lower')
            .description('Unique key, id of the plugin')
            .required(),
          publicName: Joi.string()
            .description('Friendly name of the plugin.')
            .required(),
          publicDescription: Joi.string()
            .description('Friendly description of the plugin.')
            .required(),
          type: Joi.string()
            .description('Friendly type of the plugin.')
            .required(),
          mandatory: Joi.boolean().description(
            'Set if the cookie is mandatory (pre-checked).'
          ),
          urlToCall: Joi.string()
            .uri()
            .optional()
            .description('URL of the script to load.'),
          scriptToInclude: Joi.string()
            .optional()
            .description('Complete script code to include.'),
        })
      )
      .min(1),
  })
}
