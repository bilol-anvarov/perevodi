const ports = Array.from({ length: 16 }, (_, i) => 3000 + i); // Creates an array of ports from 3000 to 3015

module.exports = {
  apps: ports.map(port => ({
    name: `Makro-${port}`,
    script: "node_modules/next/dist/bin/next",
    args: `start -p ${port}`,
    instances: 1,              // One instance per port
    exec_mode: "fork",         // Use fork mode for separate processes
    autorestart: true,
    watch: false,
    max_memory_restart: "400M",
    env: {
      NODE_ENV: "production"
    }
  }))
};
