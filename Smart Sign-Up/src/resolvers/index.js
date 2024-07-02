import Resolver from '@forge/resolver';
import api, { route } from "@forge/api";

const resolver = new Resolver();

resolver.define('getText', async (req) => {
    const response = await api.asUser().requestConfluence(route`/wiki/rest/api/user/current`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return { error: `Request failed with status ${response.status}` };
    }
});

export const handler = resolver.getDefinitions();
