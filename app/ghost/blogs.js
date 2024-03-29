import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI(
  {
    url: 'https://blog.cap.devink.site',
    key: '7e12f0e2473a55e7af84b57fc9',
    version: 'v5.2.2',
    makeRequest: async ({ url, method, params, headers }) => {
      const apiUrl = new URL(url);
      Object.keys(params).map(key => apiUrl.searchParams.set(key, params[key]));

      return fetch(apiUrl.toString(), { method, headers })
        .then(async res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}, response data: ${await res.text()}`);
          }

          return { data: await res.json() };
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    },

  },
)

export async function getGhostBlogs() {
  return await api.posts.browse({ limit: 'all' }).catch((e) => { console.log(e) })
}
