const { build, buildSync } = require('esbuild');

build({
    entryPoints: ['.\\assets\\js\\main.js'],
    outfile: '.\\assets\\js\\bundle.min.js',
    bundle: true,
    watch: true,
    minify: true,
    sourcemap: true,
});

build({
    entryPoints: ['.\\assets\\css\\styles.css'],
    outfile: '.\\assets\\css\\styles.min.css',
    minify: true,
    watch: true,
    bundle: true,
    external: ['*.jpg', '*.png']
})