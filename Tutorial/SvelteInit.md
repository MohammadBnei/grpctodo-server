Same as for envoy and the server, we need to inject the certs and proto files into the svelte environnement. The simplest way to do it is to use docker compose. We'll also be using node 16.

#### compose.yml
```Yml
    front:
        build:
        dockerfile: ./svelte/Dockerfile
        context: ./
        working_dir: /app
        ports:
            - 8080:5000
        volumes:
            - ./dev/certs/grpctodo.dev+1-key.pem:/certs/key.pem:ro
            - ./dev/certs/grpctodo.dev+1.pem:/certs/cert.pem:ro
            - ./svelte:/app/
            - ./proto/js:/app/src/proto
        # Only for initialization
        stdin_open: true
```

Spin up the new container :
```console
docker-compose up -d
```

Create a new svelte project :
```console
docker-compose exec front npx degit sveltejs/template tmp
#Optional : use antfu/ni and pnpm
docker-compose exec front npm i -g @antfu/ni pnpm

# From inside the container
npx degit sveltejs/template tmp
npm i -g @antfu/ni pnpm
```

Copy all the content of the tmp folder in the /app directory.
For the rest of the tutorial, i'll use ni with the following equivalence :
```console
npm i -> ni
npm run -> nr
```

Let's install all the npm packages and typescript :
```console
docker-compose exec front node scripts/setupTypescript.js
docker-compose exec front ni -D tailwindcss postcss autoprefixer concurrently rollup-plugin-postcss postcss-cli daisyui


# From inside the container
node scripts/setupTypescript.js
ni -D tailwindcss postcss autoprefixer concurrently rollup-plugin-postcss postcss-cli@^7 daisyui
```

Create the 2 following files :
#### tailwind.config.cjs
```javascript
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["lemonade"],
    },
    content: ['./src/**/*.{html,js,svelte,ts}'],
};
```

#### postcss.config.cjs
```javascript
module.exports = {
    plugins:
    {
        tailwindcss: {},
        autoprefixer: {}
    }
} 
```

We have to tell rollup to use postcss and tailwind to handle css generation :
#### rollup.config.js
```javascript
// ...imports
// Import postcss
import postcss from "rollup-plugin-postcss";

// ...conf
    svelte({
        preprocess: sveltePreprocess({
            sourceMap: !production, postcss: {
                plugins: [
                    require("tailwindcss"),
                    require("autoprefixer"),
                ],
            },
        }),
        compilerOptions: {
            // enable run-time checks when not in production
            dev: !production
        }
    }),
    postcss({
        plugins: [],
    }),
-   css(...)   
```

To add all the tailwind utility classes, modify the App.svelte like this :
#### App.svelte
```html
<script lang="ts">
  export let name: string;
</script>

<h1 class="m-8">Hello {name}!</h1>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
```

Perfect. Finally, we will modify the package.json to modify the starting script :
#### package.json
```json
  "scripts": {
    "dev": "rollup -c -w ",
    "start": "sirv public --port 5000 --host 0.0.0.0 --http2 --cert /certs/cert.pem --key /certs/key.pem"
  },
```

Start rollup to serve our front with :
```console
docker-compose exec front nr dev

# From inside the container
nr dev
```

You should see a hello world with a margin of 8rem. Check that tailwindcss classes are correctly used (if you see the .m-8 class in the developper tools it's all good)


[Continue](/README.md#svelte)
