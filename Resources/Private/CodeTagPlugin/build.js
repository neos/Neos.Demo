
const esbuild = require('esbuild');
const extensibilityMap = require('@neos-project/neos-ui-extensibility/extensibilityMap.json');

esbuild.build({
    entryPoints: {
        Plugin: './src/index.js'
    },
    bundle: true,
    minify: true,
    target: "es2020",
    sourcemap: "linked",
    alias: extensibilityMap,
    outdir: '../../Public/Scripts/CodeTagPlugin'
});
