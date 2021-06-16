import {
	lt, lte, gt, gte, coerce
} from 'semver';

export const formatAttachmentUrl = (attachmentUrl, userId, token, server) => {
	attachmentUrl = decodeURI(attachmentUrl);
	if (attachmentUrl.startsWith('http')) {
		if (attachmentUrl.includes('rc_token')) {
			// return encodeURI(attachmentUrl);
			return attachmentUrl;
		}
		// return encodeURI(`${ attachmentUrl }?rc_uid=${ userId }&rc_token=${ token }`);
		return attachmentUrl + encodeURI(`?rc_uid=${ userId }&rc_token=${ token }`);
	}
	// return encodeURI(`${ server }${ attachmentUrl }?rc_uid=${ userId }&rc_token=${ token }`);
	return `${ server }${ attachmentUrl }${ encodeURI(`?rc_uid=${ userId }&rc_token=${ token }`) }`;
};

export const methods = {
	lowerThan: lt,
	lowerThanOrEqualTo: lte,
	greaterThan: gt,
	greaterThanOrEqualTo: gte
};

export const compareServerVersion = (currentServerVersion, versionToCompare, func) => currentServerVersion && func(coerce(currentServerVersion), versionToCompare);
