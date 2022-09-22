# gatsby-plugin-rgpd-acceptance

## Description

Yet Another plugin to manage third-party scripts, respecting the GDPR.

This plugin is not specific to one solution (e.g. Google Analytics, Facebook pixel, YouTube, etc.), it can use and drive them all.

You just have to declare the whole script or an URL to load.

> All `consents` datas are stored in `localStorage`.

Two components are provided:

- `RGPDCookieBanner` which is used to display and manage the acceptance.
- `RGPDBlocker` which is used to prevent the loading of code (e.g. YouTube iframe, navigation map, playlist, etc.) if the person has not explicitly given his consent.

Two modes are proposed, one where the banner component is automatically added and a manual mode where you have to add it yourself.

To use the manual mode, it in the `gatsby-config.js` plugin options. Change the value of `useInternalComponent` to `false`.

| `RGPDCookieBanner`                                                                                                                      | `RGPDBlocker`                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Full version, not accepted:**![RGPDCookieBanner](./docs/SCR-20220922-gcg.png)                                                         | **Not accepted version:**<br/>![RGPDBlocker not accepted](./docs/SCR-20220922-gam.png) |
| **Accepted version:**<br/>![RGPDCookieBanner mini](./docs/SCR-20220922-g5t.png)                                                         | **Accepted version:**<br/>![RGPDBlocker accepted](./docs/SCR-20220922-gb7.png)         |
| **Choosing view without mandatory cookie:**<br/>![RGPDCookieBanner choosing view without mandatory cookie](./docs/SCR-20220922-gjx.png) |                                                                                        |
| **Choosing view with mandatory cookie:**<br/>![RGPDCookieBanner choosing view with mandatory cookie](./docs/SCR-20220922-gyw.png)       |                                                                                        |

## How to install

`npm i gatsby-plugin-rgpd-acceptance`

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-rgpd-acceptance`,
      options: {
        cookieDuration: 365, // Optionnal, default value: one year in days
        useInternalCss: true, // Boolean Optionnal, default value: true
        useInternalComponent: true, // Boolean Optionnal, default value: true
        labels: {
          // See below
        },
        cookiesList: [
          // At least one is required (otherwise, what is the point of installing this plugin).
          // See below for all explaination
          {
            key: `google-analitics`, // Required, your internal key
            publicName: `Google Analytics`, // Required, a Friendly Name
            publicDescription: `GA Description`, // Required, a Friendly Description
            type: `analytic`, // Required, a type/usage of script, chose one of them `ads|analytic|api|comment|other|social|support|video`
            mandatory: true, // Boolean Required, set if this script is mandatory
            urlToCall: `https://test.io`, // Optional (otherwise, enter `scriptToInclude`), the url of your script.
            scriptToInclude: `<script>console.info('Testing script is loaded')</script>`, // Optional (otherwise, enter `urlToCall`), the url of your script.
          },
          // ...
        ],
      },
    },
  ],
}
```

### Explanation of the `options`

| Name                        | Default                                   | Description                                                                |
| --------------------------- | ----------------------------------------- | -------------------------------------------------------------------------- |
| `cookieDuration`            | 365                                       | How long the acceptance is still validate                                  |
| `useInternalCss`            | true                                      | Active the internal demo style                                             |
| `useInternalComponent`      | true                                      | Add automatically the `RGPDCookieBanner` component                         |
| `labels`                    | {\*} Object                               | The different labels of the `RGPDCookieBanner` component                   |
| `labels.icon`               | 🍪                                        | The icon used in both version of `RGPDCookieBanner` component              |
| `labels.titleBanner`        | Les cookies                               | Title of the `RGPDCookieBanner`                                            |
| `labels.descriptionBanner`  | Nous utilisons des cookies [...]          | Description text (complete text below) of the `RGPDCookieBanner`           |
| `labels.acceptAllLabel`     | Accepter tout                             | Button label of `RGPDCookieBanner`                                         |
| `labels.rejectAllLabel`     | Rejeter tout                              | Button label of `RGPDCookieBanner`                                         |
| `labels.chooseLabel`        | Choisir                                   | Button label of `RGPDCookieBanner`                                         |
| `labels.saveLabel`          | Enregistrer                               | Button label of `RGPDCookieBanner`                                         |
| `labels.mandatoryLabel`     | obligatoire                               | information to indicate the cookie is mandatory                            |
| `labels.blockerWarnLabel`   | Accepter                                  | Button label of `RGPDBlocker`                                              |
| `labels.blockerWarnMessage` | Vous n'avez pas accepté les cookies [...] | Description text (complete text below) of the `RGPDBlocker`                |
| `cookiesList`               | [\*] Array of objects                     | The configuration Array of each cookie, at least 1 is mandatory            |
| `key`                       | -                                         | **Required**, your internal key                                            |
| `publicName`                | -                                         | **Required**, a Friendly Name                                              |
| `type`                      | -                                         | **Required**, a type/usage of script, chose one of them (list below)       |
| `mandatory`                 | -                                         | `Boolean` **Required**, a set if this script is mandatory                  |
| `urlToCall`                 | -                                         | **Optional**, (otherwise, enter `scriptToInclude`), the URL of your script |
| `scriptToInclude`           | -                                         | **Optional**, (otherwise, enter `urlToCall`), the URL of your script       |

> **`type` of cookie :**
>
> - `ads`
> - `analytic`
> - `api`
> - `comment`
> - `other`
> - `social`
> - `support`
> - `video`

> **`descriptionBanner` default value:**

> Nous utilisons des cookies et des technologies similaires sur notre site web et traitons vos données personnelles (par exemple, l'adresse IP), par exemple, pour personnaliser le contenu et les annonces, pour intégrer des médias de fournisseurs tiers ou pour analyser le trafic sur notre site web.&lt;br/> Le traitement des données peut également se produire à la suite de la mise en place de cookies. Nous partageons ces données avec des tiers que nous nommons dans les paramètres de confidentialité. Le traitement des données peut avoir lieu avec votre consentement ou sur la base d'un intérêt légitime, auquel vous pouvez vous opposer dans les paramètres de confidentialité. Vous avez le droit de ne pas consentir et de modifier ou révoquer votre consentement ultérieurement. Pour plus d'informations sur l'utilisation de vos données, veuillez consulter notre politique de confidentialité.

> **`blockerWarnMessage` default value:**

> Vous n'avez pas accepté les cookies globalement ou celui-ci précisement.&lt;br/> Pour afficher ce contenu, vous devez accepter.

## Available options

### Design

The design is intentionally horrible. So, you can/should adapt it by disabling it in the `gatsby-config.js` plugin options. Change the value of `useInternalCss` to false

Here are the CSS classes (the names speak for themselves)

If you set `useInternalCss` a `rgpd-acceptance-theme` class is added to `<html>`. So, you don't need to put `!important` to override the predefined styles.

```CSS
/* RGPDCookieBanner and his mini version component */
.rgpd--container
  .rgpd--banner
  .rgpd--banner.full
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
  .rgpd--banner.mini
    .rgpd--icon
    .rgpd--link

/* RGPDBlocker component */
.rgpd--blocker--container
  .rgpd--blocker--container .rgpd--icon
  .rgpd--blocker--title
  .rgpd--blocker--warn-message
```

### Component `RGPDCookieBanner`

If you set in `gatsby-config.js` the option `useInternalComponent` at `false` you can add it manually in your layout.

> It's **mandatory** if you need to translate labels with `i18n`. I you have only one language, you can directely set text in `gatsby-config.js`.

```javascript
import { RGPDCookieBanner } from 'gatsby-plugin-rgpd-acceptance'
```

```javascript
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

This component is used to block the loading of a child component that would require an acceptance validation.

If he didn't get it, an alert message is displayed and he can directly accept it by clicking on a button.

By implementing this system, you protect your users from tracking by the third party service used.

```javascript
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

### Bugs and Features

You can make enhancement requests, report bugs, or simply offer help at https://github.com/NovaGaia/gatsby-plugin-rgpd-acceptance/issues

### Futur

Create some plugins to facilitate the implemtation of a cookie script (like the others plugins who are specialized).
