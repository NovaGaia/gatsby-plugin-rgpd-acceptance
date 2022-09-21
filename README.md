# gatsby-plugin-rgpd-acceptance

## Description

Another plugin to manage third party scripts, respecting the GDPR.

You can upload complete scripts or just script urls.

Two components are provided:

- `Banner` which is used to display and manage the acceptance.
- `RGPDBlocker` which is used to prevent the loading of code (e.g. YouTube iframe, navgation map, playlist, etc.) if the person has not explicitly given his consent.

Two modes are proposed, one where the banner component is automatically added and a manual mode where you have to add it yourself.

To use the manual mode, it in the `gatsby-config.js` plugin options. Change the value of `useInternalComponent` to `false`.

## How to install

`npm i gatsby-plugin-rgpd-acceptance`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `./plugins/gatsby-plugin-rgpd-acceptance`,
      options: {
        cookieDuration: 31557600000, // Optionnal, default value: one year in milliseconds
        useInternalCss: true, // Boolean Optionnal, default value: true
        useInternalComponent: true, // Boolean Optionnal, default value: true
        labels: {
          icon: `🍪`, // Optionnal, default value: 🍪 an emoji
          titleBanner: `Les cookies`, // Optionnal, default value: Les cookies
          descriptionBanner: `Nous utilisons des cookies [...]`, // Optionnal, default value: (see below)
          acceptAllLabel: `Accepter tout`, // Optionnal, default value: Accepter tout
          rejectAllLabel: `Rejeter tout`, // Optionnal, default value: Rejeter tout
          chooseLabel: `Choisir`, // Optionnal
          saveLabel: `Enregistrer`, // Optionnal
          mandatoryLabel: `obligatoire`, // Optionnal
          blockerWarnLabel: `Accepter`, // Optionnal
          blockerWarnMessage: `Vous n'avez pas accepté les cookies globalement ou celui-ci précisement.<br/> Pour afficher ce contenu, vous devez accepter.`, // Optionnal
        },
        cookiesList: [
          // At least one is required (otherwise, what is the point of installing this plugin).
          {
            key: `google-analitics`, // Required, your internal key
            publicName: `Google Analytics`, // Required, a Firendly Name
            publicDescription: `GA Description`, // Required, a Firendly Description
            type: `analytic`, // Required, a type/usage of script, chose one of them `ads|analytic|api|comment|other|social|support|video`
            mandatory: false, // Boolean Required, set if this script is mandatory
            urlToCall: `https://test.io`, // Optional (otherwise, enter `scriptToInclude`), the url of your script.
          },
          {
            key: `youtube`, // Required, your internal key
            publicName: `YouTube`, // Required, a Firendly Name
            publicDescription: `YT Description`, // Required, a Firendly Description
            type: `video`, // Required, a type/usage of script, chose one of them `ads|analytic|api|comment|other|social|support|video`
            mandatory: true, // Boolean Required, set if this script is mandatory
            scriptToInclude: `<script>console.info('Testing script is loaded')</script>`, // Optional (otherwise, enter `urlToCall`), the url of your script.
          },
        ],
      },
    },
  ],
}
```

> **`descriptionBanner` default value:**  
> Nous utilisons des cookies et des technologies similaires sur notre site web et traitons vos données personnelles (par exemple, l'adresse IP), par exemple, pour personnaliser le contenu et les annonces, pour intégrer des médias de fournisseurs tiers ou pour analyser le trafic sur notre site web.&lt;br/> Le traitement des données peut également se produire à la suite de la mise en place de cookies. Nous partageons ces données avec des tiers que nous nommons dans les paramètres de confidentialité. Le traitement des données peut avoir lieu avec votre consentement ou sur la base d'un intérêt légitime, auquel vous pouvez vous opposer dans les paramètres de confidentialité. Vous avez le droit de ne pas consentir et de modifier ou révoquer votre consentement ultérieurement. Pour plus d'informations sur l'utilisation de vos données, veuillez consulter notre politique de confidentialité.

> **`blockerWarnMessage` default value:**  
> Vous n'avez pas accepté les cookies globalement ou celui-ci précisement.&lt;br/> Pour afficher ce contenu, vous devez accepter.

## Available options

### Design

The design is intentionally horrible. So you can/should adapt it by disabling it in the `gatsby-config.js` plugin options. Change the value of `useInternalCss` to false

Here are the css classes (the names speak for themselves)

If you set `useInternalCss` a `rgpd-acceptance-theme` class is added to `<html>`. So you don't need to put `!important` to override the predefined styles.

```css
/* Banner and Banner-mini component */
.rgpd--container 

.rgpd--banner 

.rgpd--banner.full 

.rgpd--banner.mini 

.rgpd--container .rgpd--banner 

.rgpd--header 

.rgpd--icon 

.rgpd--title 

.rgpd--cookies-list

.rgpd--cookie-item 

.rgpd--cookie-name 

.rgpd--cookie-description 

.rgpd--cookie-type 

.rgpd--cookie-mandatory 

.rgpd--cookie-checkzone 

.rgpd--footer 

.rgpd--btn 

.rgpd--btn.all 

.rgpd--btn.some 

.rgpd--btn.none 

.rgpd--btn.choose 

.rgpd--btn.save 

.rgpd--link 

/* RGPDBlocker component */

.rgpd--blocker--container 

.rgpd--blocker--container .rgpd--icon 

.rgpd--blocker--title 

.rgpd--blocker--warn-message;
```

### Component `Banner`

```comment
/**
 * The pilot of acceptance
 * @param {*} icon `String` Emoji Override plugin or config label (eg. for i18n).
 * @param {*} titleBanner `String` Override plugin or config label (eg. for i18n).
 * @param {*} descriptionBanner `String` Override plugin or config label (eg. for i18n).
 * @param {*} acceptAllLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} chooseLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} rejectAllLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} saveLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} mandatoryLabel `String` Override plugin or config label (eg. for i18n).
 * @param {*} asAContainer `Boolean` Add a container with `rgpd--container` classname.
 * @returns
 */
```

### Component `RGPDBlocker`

```comment
/**
 * A component to block the loading of an unaccepted third party script.
 * @param {*} cookieKey `String` **Required**, your internal key, same as configured in `gatsby-config.js`
 * @param {*} className `String` Optionnal, your style (set width and height)
 * @param {*} blockerWarnMessage `String` Optionnal, the label of the localy acceptance button
 * @param {*} blockerWarnLabel `String` Optionnal, the warning message.
 * @returns
 */
```

## How to contribute

You can make enhancement requests, report bugs, or simply offer help at https://github.com/NovaGaia/gatsby-plugin-rgpd-acceptance/issues
