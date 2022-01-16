const PREFERENCES = "preferences";

export const PAGE_TABLE = "page";

export const REMEMBERME = "rememberme";

export const IDUSER = "iduser";

/**
 * Return the preferences of the tables than can be saved
 * 
 * @param {string} resourceUrl
 * @returns (string)
 */

export const getPreferencesUrlStorage = (resourceUrl = "") => {
    return `${PREFERENCES}_${resourceUrl}`;
};

export const preferencesToStorage = {
    PAGE_TABLE,
    REMEMBERME,
    IDUSER
};