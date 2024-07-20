export const getParams = (url: string) => {
	const pathname = new URL(url).pathname;

	const [_, ...params] = pathname.split("/");

	const id = params[params.length - 1];

	if (Number.isNaN(Number(id))) {
		throw new Error("Invalid id");
	}

	return { id: Number(id) };
};
