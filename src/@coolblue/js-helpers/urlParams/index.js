import { camelCase } from "../convertString";
import { validations } from "../validations";
import getType from "../getType";

const castString = (value, commaSeparatedToArray = true) => {
    const isJSONString = validations.isJSONString(value);

    if (isJSONString === true) return JSON.parse(value);

    const valueTrimmed = value.trim();

    if (commaSeparatedToArray && value.includes(",")) {
        const valueAsArray = value.split(",").map((item) => castString(item));

        return valueAsArray;
    }

    if (valueTrimmed === "Infinity") return Infinity;
    if (valueTrimmed === "NaN") return NaN;
    if (valueTrimmed === "undefined") return undefined;

    return valueTrimmed;
};

const urlParamsAsObject = (urlPathOrHref = window.location.href, keyAsCamelCase = true) => {
    if (getType(urlPathOrHref) !== "string" || !urlPathOrHref) return {};

    const locationOrgin = window.location.origin;
    const url = new URL(urlPathOrHref, locationOrgin);
    const urlParams = url.searchParams;

    const paramsAsObject = {};
    urlParams.forEach((paramValue, paramKey) => {
        const key = keyAsCamelCase ? camelCase(paramKey) : paramKey;
        const value = castString(paramValue);

        if (Object.prototype.hasOwnProperty.call(paramsAsObject, key)) {
            const previousValue = paramsAsObject[key];
            const previousValueIsEmpty = validations.isEmpty(previousValue);

            if (previousValueIsEmpty) {
                paramsAsObject[key] = value;
                return;
            }

            const previousValueType = getType(paramsAsObject[key]);
            const valueType = getType(value);

            if (previousValueType === "object" && valueType === "object") {
                const newObjectValue = {
                    ...previousValue,
                    ...value,
                };

                paramsAsObject[key] = newObjectValue;
                return;
            }

            if (previousValueType === "array" && valueType === "array") {
                const newArrayValue = [...new Set([...previousValue, ...value])];
                paramsAsObject[key] = newArrayValue;
                return;
            }

            const newValue = [...new Set([...[previousValue, value]])];
            paramsAsObject[key] = newValue.length === 1 ? value : newValue;
            return;
        }

        paramsAsObject[key] = value;
    });

    return paramsAsObject;
};

const objectAsUrlParams = (data, addQuestionMark = true, addPrefix = true) => {
    if (getType(data) !== "object" || !Object.keys(data).length) return "";

    const urlParams = new URLSearchParams();

    Object.keys(data).forEach((key) => {
        const tempValue = data[key];
        if (!["", "null", "undefined", undefined, null].includes(tempValue)) {
            const urlValue = getType(tempValue) === "object" ? JSON.stringify(tempValue) : tempValue;
            const value = getType(urlValue) === "string" ? urlValue.replace(/\s+/g, " ") : urlValue;

            urlParams.append(key, value);
        }
    });

    urlParams.sort();
    const urlSearchAsString = urlParams.toString();

    if (validations.isEmpty(urlSearchAsString)) return "";

    const prefixUrlSearch = addQuestionMark ? "?" : "&";
    const urlSearch = `${addPrefix ? prefixUrlSearch : ""}${urlSearchAsString}`;

    return decodeURIComponent(urlSearch);
};

const getCurrentUrlSearchAsObject = () => {
    const currentUrlSearch = window.location.search;
    const currentUrlSearchAsObject = urlParamsAsObject(currentUrlSearch);

    return currentUrlSearchAsObject;
};

const getNewUrlSearchAsObjectAndString = (data) => {
    const currentUrlSearchAsObject = getCurrentUrlSearchAsObject();
    const searchObject = {
        ...currentUrlSearchAsObject,
        ...data,
    };
    const search = objectAsUrlParams(searchObject);

    return {
        searchObject,
        search,
    };
};

const setUrlSearchParam = (data) => {
    const currentUrlSearch = window.location.search;
    const { search } = getNewUrlSearchAsObjectAndString(data);
    const isSearchCurrentUrlSearch = search === currentUrlSearch;
    if (!isSearchCurrentUrlSearch) window.history.pushState({}, "", search || window.location.pathname);
};

const getReplaceChar = () => {
    const replaceChar = {
        ??: "A",
        ??: "A",
        ??: "A",
        ??: "A",
        ??: "A",
        ??: "A",
        ??: "AE",
        ??: "C",
        ??: "E",
        ??: "E",
        ??: "E",
        ??: "E",
        ??: "I",
        ??: "I",
        ??: "I",
        ??: "I",
        ??: "D",
        ??: "N",
        ??: "O",
        ??: "O",
        ??: "O",
        ??: "O",
        ??: "O",
        ??: "O",
        ??: "O",
        ??: "U",
        ??: "U",
        ??: "U",
        ??: "U",
        ??: "U",
        ??: "Y",
        ??: "TH",
        ??: "ss",
        ??: "a",
        ??: "a",
        ??: "a",
        ??: "a",
        ??: "a",
        ??: "a",
        ??: "ae",
        ??: "c",
        ??: "e",
        ??: "e",
        ??: "e",
        ??: "e",
        ??: "i",
        ??: "i",
        ??: "i",
        ??: "i",
        ??: "d",
        ??: "n",
        ??: "o",
        ??: "o",
        ??: "o",
        ??: "o",
        ??: "o",
        ??: "o",
        ??: "o",
        ??: "u",
        ??: "u",
        ??: "u",
        ??: "u",
        ??: "u",
        ??: "y",
        ??: "th",
        ??: "y",
        ???: "SS",
        ??: "c",
        ??: "d",
        ??: "e",
        ??: "n",
        ??: "r",
        ??: "s",
        ??: "t",
        ??: "u",
        ??: "z",
        ??: "C",
        ??: "D",
        ??: "E",
        ??: "N",
        ??: "R",
        ??: "S",
        ??: "T",
        ??: "U",
        ??: "Z",
        ??: "A",
        ??: "E",
        ??: "I",
        ??: "O",
        ??: "Y",
        ??: "I",
        ??: "I",
        ??: "Y",
        ??: "a",
        ??: "e",
        ??: "g",
        ??: "i",
        ??: "k",
        ??: "l",
        ??: "n",
        ??: "u",
        ??: "A",
        ??: "E",
        ??: "G",
        ??: "I",
        ??: "k",
        ??: "L",
        ??: "N",
        ??: "U",
        ??: "K",
        ??: "k",
        ??: "a",
        ??: "c",
        ??: "e",
        ??: "l",
        ??: "n",
        ??: "s",
        ??: "z",
        ??: "z",
        ??: "A",
        ??: "C",
        ??: "E",
        ??: "L",
        ??: "N",
        ??: "S",
        ??: "Z",
        ??: "Z",
        ??: "e",
        ??: "I",
        ??: "I",
        ??: "e",
        ??: "i",
        ??: "g",
        ??: "a",
        ??: "A",
        ??: "s",
        ??: "S",
        ??: "t",
        ??: "T",
        ??: "t",
        ??: "T",
        ??: "e",
        ??: "l",
        ??: "l",
        ??: "r",
        ??: "L",
        ??: "L",
        ??: "R",
        ??: "s",
        ??: "S",
        ??: "I",
        ??: "g",
        ??: "G",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ??: "d",
        ??: "D",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "e",
        ???: "E",
        ???: "o",
        ???: "o",
        ???: "o",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ??: "o",
        ??: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "O",
        ???: "o",
        ???: "o",
        ???: "i",
        ???: "I",
        ??: "i",
        ??: "I",
        ???: "i",
        ???: "i",
        ???: "u",
        ???: "U",
        ???: "u",
        ???: "U",
        ??: "u",
        ??: "U",
        ??: "u",
        ??: "U",
        ???: "u",
        ???: "U",
        ???: "u",
        ???: "U",
        ???: "u",
        ???: "U",
        ???: "u",
        ???: "U",
        ???: "u",
        ???: "??",
        ???: "y",
        ???: "y",
        ???: "y",
        ???: "Y",
        ???: "y",
        ???: "Y",
        ???: "y",
        ???: "Y",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
        ???: "a",
        ???: "A",
    };

    return {
        replaceChar,
        replaceCharForRexExp: Object.keys(replaceChar).join("|"),
    };
};

const getStringAsUrlfriendly = (value) => {
    const { replaceChar, replaceCharForRexExp } = getReplaceChar();

    const regExpReplaceChar = new RegExp(replaceCharForRexExp, "g");

    const urlFriendly = value
        .toLowerCase()
        .replace(regExpReplaceChar, (character) => replaceChar[character])
        .replace(/[.,;:~!@#$%^&*()_????='"`\-\[\]\{\}\<\>\s]+/g, "-")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");

    return urlFriendly;
};

export {
    urlParamsAsObject,
    objectAsUrlParams,
    getCurrentUrlSearchAsObject,
    getNewUrlSearchAsObjectAndString,
    setUrlSearchParam,
    getStringAsUrlfriendly,
};
