/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
    brand: {
        id: `${scope}.brand`,
        defaultMessage: 'Antariksh Roy',
    },
    allComponentsLink: {
        id: `${scope}.allComponentsLink`,
        defaultMessage: 'All Components',
    },
});
