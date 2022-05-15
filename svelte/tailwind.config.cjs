const production = !process.env.ROLLUP_WATCH;
module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["lemonade"],
    },
    purge: {
        content: ['./src/**/*.{html,js,svelte,ts}'],
        enabled: production // disable purge in dev
    },
};

