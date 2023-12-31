import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject, subset } from 'utils';

/**
 *
 * @param {string[]} keys - keys you want to check in the url query
 *
 * @return
 * [`params`, `setParams`]
 * - `params` Object the params in the url
 * - `setParams` function to change the query url by give param
 *
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
	// useSearchParams: react router methods
	const [searchParams] = useSearchParams();
	const setSearchParam = useSetUrlSearchParam();
	// Dependencies:
	// 	prmitive type 		✅
	// 	state				✅
	// 	un-state object		❌ NEVER!
	return [
		useMemo(
			() =>
				keys.reduce((prev, key) => {
					return { ...prev, [key]: searchParams.get(key) || '' };
				}, {} as { [key in K]: string }),
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[searchParams]
		),
		(params: Partial<{ [key in K]: unknown }>) => {
			return setSearchParam(params);
		},
	] as const;
};

export const useSetUrlSearchParam = () => {
	const [searchParams, setSearchParam] = useSearchParams();
	return (param: Partial<{ [key in string]: unknown }>) => {
		const obj = cleanObject({
			...Object.fromEntries(searchParams),
			...param,
		}) as URLSearchParamsInit;
		return setSearchParam(obj);
	};
};
