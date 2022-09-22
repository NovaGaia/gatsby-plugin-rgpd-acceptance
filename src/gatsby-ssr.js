/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */
// You can delete this file if you're not using it

import React from 'react'

function buildInformationMessage() {
  return (
    <script
      key="rgpd_message"
      dangerouslySetInnerHTML={{
        __html: `
        console.log("La RGPD, c'est quoi ? https://www.economie.gouv.fr/entreprises/reglement-general-sur-protection-des-donnees-rgpd")
      `,
      }}
    />
  )
}

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([buildInformationMessage()])
}
