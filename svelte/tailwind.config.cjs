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