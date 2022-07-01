module.exports = {
    apps: [
        {
            name: "practicasoa",
            script: "./app.js",
            watch: true,
            instance_var: 'INSTANCE_ID',
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}