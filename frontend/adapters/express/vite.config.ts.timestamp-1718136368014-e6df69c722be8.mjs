// adapters/express/vite.config.ts
import { nodeServerAdapter } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/@builder.io/qwik-city/adapters/node-server/vite/index.mjs";
import { extendConfig } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/@builder.io/qwik-city/vite/index.mjs";

// vite.config.ts
import { defineConfig } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/@builder.io/qwik/optimizer.mjs";
import { qwikCity } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/@builder.io/qwik-city/vite/index.mjs";
import { qwikTypes } from "file:///Users/barel/projects/publish_notes/frontend/node_modules/@builder.io/qwik-labs/vite/index.js";
import tsconfigPaths from "file:///Users/barel/projects/publish_notes/frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-empty-starter",
  description: "App with Routing built-in ready to create your app",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0",
  },
  "engines-annotation":
    "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: ["sharp"],
  "trustedDependencies-annotation":
    "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/express/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: `echo 'Run "npm run qwik add" to install a server adapter'`,
    dev: "vite --mode ssr",
    "dev.debug":
      "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    serve: "node server/entry.express",
    start: "vite --open --mode ssr",
    qwik: "qwik",
  },
  devDependencies: {
    "@auth/core": "^0.13.0",
    "@builder.io/qwik": "^1.5.6",
    "@builder.io/qwik-auth": "^0.1.3",
    "@builder.io/qwik-city": "^1.5.6",
    "@qwik-ui/headless": "^0.4.4",
    "@qwik-ui/styled": "^0.1.0",
    "@qwik-ui/utils": "^0.2.1",
    "@types/compression": "^1.7.2",
    "@types/eslint": "^8.56.10",
    "@types/express": "^4.17.19",
    "@types/node": "^20.14.2",
    "@typescript-eslint/eslint-plugin": "^7.13.0",
    "@typescript-eslint/parser": "^7.13.0",
    autoprefixer: "^10.4.14",
    compression: "^1.7.4",
    dotenv: "^16.4.5",
    eslint: "^9.4.0",
    "eslint-plugin-qwik": "^1.5.6",
    express: "4.19.2",
    nx: "^19.2.3",
    postcss: "^8.4.31",
    prettier: "^3.3.2",
    "prettier-plugin-tailwindcss": "^0.6.2",
    "qwik-ui": "^0.1.0",
    tailwindcss: "^3.4.4",
    typescript: "^5.4.5",
    undici: "^6.18.2",
    vite: "^5.2.13",
    "vite-tsconfig-paths": "^4.2.1",
  },
  nx: {},
  dependencies: {
    "@builder.io/qwik-labs": "github:BuilderIo/qwik-labs-build#main",
    "@eslint/config-array": "^0.15.1",
    "@eslint/object-schema": "^2.1.3",
    "@paypal/paypal-js": "^8.1.0",
    "@qwikest/icons": "^0.0.13",
    "@shopify/draggable": "^1.1.3",
    "@tailwindcss/typography": "^0.5.13",
    apexcharts: "^3.49.1",
    "class-variance-authority": "^0.7.0",
    fund: "^1.0.0",
    install: "^0.13.0",
    "isomorphic-dompurify": "^2.12.0",
    "lru-cache": "^10.2.2",
    marked: "^12.0.2",
    npm: "^10.8.1",
    openai: "^4.50.0",
    "surrealdb.js": "^0.11.1",
    uploadthing: "^6.12.0",
  },
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikTypes()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      include: ["@auth/core"],
      exclude: [],
    },
    // This tells Vite how to bundle the server code.
    ssr:
      command === "build" && mode === "production"
        ? {
            // All dev dependencies should be bundled in the server build
            noExternal: Object.keys(devDependencies),
            // Anything marked as a dependency will not be bundled
            // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
            // If a dep-of-dep needs to be external, add it here
            // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
            // external: [...Object.keys(dependencies), 'bcrypt']
            external: Object.keys(dependencies),
          }
        : void 0,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});

// adapters/express/vite.config.ts
var vite_config_default2 = extendConfig(vite_config_default, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.express.tsx", "@qwik-city-plan"],
      },
    },
    plugins: [nodeServerAdapter({ name: "express" })],
  };
});
export { vite_config_default2 as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRhcHRlcnMvZXhwcmVzcy92aXRlLmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYmFyZWwvcHJvamVjdHMvcHVibGlzaF9ub3Rlcy9mcm9udGVuZC9hZGFwdGVycy9leHByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYmFyZWwvcHJvamVjdHMvcHVibGlzaF9ub3Rlcy9mcm9udGVuZC9hZGFwdGVycy9leHByZXNzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9iYXJlbC9wcm9qZWN0cy9wdWJsaXNoX25vdGVzL2Zyb250ZW5kL2FkYXB0ZXJzL2V4cHJlc3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBub2RlU2VydmVyQWRhcHRlciB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvYWRhcHRlcnMvbm9kZS1zZXJ2ZXIvdml0ZVwiO1xuaW1wb3J0IHsgZXh0ZW5kQ29uZmlnIH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XG5pbXBvcnQgYmFzZUNvbmZpZyBmcm9tIFwiLi4vLi4vdml0ZS5jb25maWdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZXh0ZW5kQ29uZmlnKGJhc2VDb25maWcsICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgc3NyOiB0cnVlLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDogW1wic3JjL2VudHJ5LmV4cHJlc3MudHN4XCIsIFwiQHF3aWstY2l0eS1wbGFuXCJdLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtub2RlU2VydmVyQWRhcHRlcih7IG5hbWU6IFwiZXhwcmVzc1wiIH0pXSxcbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYmFyZWwvcHJvamVjdHMvcHVibGlzaF9ub3Rlcy9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2JhcmVsL3Byb2plY3RzL3B1Ymxpc2hfbm90ZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2JhcmVsL3Byb2plY3RzL3B1Ymxpc2hfbm90ZXMvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjsvKipcbiAqIFRoaXMgaXMgdGhlIGJhc2UgY29uZmlnIGZvciB2aXRlLlxuICogV2hlbiBidWlsZGluZywgdGhlIGFkYXB0ZXIgY29uZmlnIGlzIHVzZWQgd2hpY2ggbG9hZHMgdGhpcyBmaWxlIGFuZCBleHRlbmRzIGl0LlxuICovXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBxd2lrVml0ZSB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrL29wdGltaXplclwiO1xuaW1wb3J0IHsgcXdpa0NpdHkgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay1jaXR5L3ZpdGVcIjtcbmltcG9ydCB7IHF3aWtUeXBlcyB9IGZyb20gJ0BidWlsZGVyLmlvL3F3aWstbGFicy92aXRlJzsgXG5cbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuXG5jb25zdCB7IGRlcGVuZGVuY2llcyA9IHt9LCBkZXZEZXBlbmRlbmNpZXMgPSB7fSB9ID0gcGtnIGFzIGFueSBhcyB7XG4gIGRlcGVuZGVuY2llczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgZGV2RGVwZW5kZW5jaWVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuICBba2V5OiBzdHJpbmddOiB1bmtub3duO1xufTtcblxuLyoqXG4gKiBOb3RlIHRoYXQgVml0ZSBub3JtYWxseSBzdGFydHMgZnJvbSBgaW5kZXguaHRtbGAgYnV0IHRoZSBxd2lrQ2l0eSBwbHVnaW4gbWFrZXMgc3RhcnQgYXQgYHNyYy9lbnRyeS5zc3IudHN4YCBpbnN0ZWFkLlxuICovXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSB9KTogVXNlckNvbmZpZyA9PiB7XG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW3F3aWtDaXR5KCksIHF3aWtWaXRlKCksIHRzY29uZmlnUGF0aHMoKSwgcXdpa1R5cGVzKCldLFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSB3aGljaCBkZXBlbmRlbmNpZXMgdG8gcHJlLWJ1aWxkIGluIGRldiBtb2RlLlxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgLy8gUHV0IHByb2JsZW1hdGljIGRlcHMgdGhhdCBicmVhayBidW5kbGluZyBoZXJlLCBtb3N0bHkgdGhvc2Ugd2l0aCBiaW5hcmllcy5cbiAgICAgIC8vIEZvciBleGFtcGxlIFsnYmV0dGVyLXNxbGl0ZTMnXSBpZiB5b3UgdXNlIHRoYXQgaW4gc2VydmVyIGZ1bmN0aW9ucy5cbiAgICAgaW5jbHVkZTogWydAYXV0aC9jb3JlJ10sXG4gICAgICBleGNsdWRlOiBbXSxcbiAgICB9LFxuICAgIC8vIFRoaXMgdGVsbHMgVml0ZSBob3cgdG8gYnVuZGxlIHRoZSBzZXJ2ZXIgY29kZS5cbiAgICBzc3I6XG4gICAgICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXG4gICAgICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxuICAgICAgICAgICAgLy8gQW55dGhpbmcgbWFya2VkIGFzIGEgZGVwZW5kZW5jeSB3aWxsIG5vdCBiZSBidW5kbGVkXG4gICAgICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcbiAgICAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcbiAgICAgICAgICAgIC8vIEZvciBleGFtcGxlLCBpZiBzb21ldGhpbmcgdXNlcyBgYmNyeXB0YCBidXQgeW91IGRvbid0IGhhdmUgaXQgYXMgYSBkZXAsIHlvdSBjYW4gd3JpdGVcbiAgICAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXG4gICAgICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIHNlcnZlcjoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyBEb24ndCBjYWNoZSB0aGUgc2VydmVyIHJlc3BvbnNlIGluIGRldiBtb2RlXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyBEbyBjYWNoZSB0aGUgc2VydmVyIHJlc3BvbnNlIGluIHByZXZpZXcgKG5vbi1hZGFwdGVyIHByb2R1Y3Rpb24gYnVpbGQpXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT02MDBcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuIiwgIntcbiAgXCJuYW1lXCI6IFwibXktcXdpay1lbXB0eS1zdGFydGVyXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBcHAgd2l0aCBSb3V0aW5nIGJ1aWx0LWluIHJlYWR5IHRvIGNyZWF0ZSB5b3VyIGFwcFwiLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIl4xOC4xNy4wIHx8IF4yMC4zLjAgfHwgPj0yMS4wLjBcIlxuICB9LFxuICBcImVuZ2luZXMtYW5ub3RhdGlvblwiOiBcIk1vc3RseSByZXF1aXJlZCBieSBzaGFycCB3aGljaCBuZWVkcyBhIE5vZGUtQVBJIHY5IGNvbXBhdGlibGUgcnVudGltZVwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzXCI6IFtcbiAgICBcInNoYXJwXCJcbiAgXSxcbiAgXCJ0cnVzdGVkRGVwZW5kZW5jaWVzLWFubm90YXRpb25cIjogXCJOZWVkZWQgZm9yIGJ1biB0byBhbGxvdyBydW5uaW5nIGluc3RhbGwgc2NyaXB0c1wiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwicXdpayBidWlsZFwiLFxuICAgIFwiYnVpbGQuY2xpZW50XCI6IFwidml0ZSBidWlsZFwiLFxuICAgIFwiYnVpbGQucHJldmlld1wiOiBcInZpdGUgYnVpbGQgLS1zc3Igc3JjL2VudHJ5LnByZXZpZXcudHN4XCIsXG4gICAgXCJidWlsZC5zZXJ2ZXJcIjogXCJ2aXRlIGJ1aWxkIC1jIGFkYXB0ZXJzL2V4cHJlc3Mvdml0ZS5jb25maWcudHNcIixcbiAgICBcImJ1aWxkLnR5cGVzXCI6IFwidHNjIC0taW5jcmVtZW50YWwgLS1ub0VtaXRcIixcbiAgICBcImRlcGxveVwiOiBcImVjaG8gJ1J1biBcXFwibnBtIHJ1biBxd2lrIGFkZFxcXCIgdG8gaW5zdGFsbCBhIHNlcnZlciBhZGFwdGVyJ1wiLFxuICAgIFwiZGV2XCI6IFwidml0ZSAtLW1vZGUgc3NyXCIsXG4gICAgXCJkZXYuZGVidWdcIjogXCJub2RlIC0taW5zcGVjdC1icmsgLi9ub2RlX21vZHVsZXMvdml0ZS9iaW4vdml0ZS5qcyAtLW1vZGUgc3NyIC0tZm9yY2VcIixcbiAgICBcImZtdFwiOiBcInByZXR0aWVyIC0td3JpdGUgLlwiLFxuICAgIFwiZm10LmNoZWNrXCI6IFwicHJldHRpZXIgLS1jaGVjayAuXCIsXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IFxcXCJzcmMvKiovKi50cypcXFwiXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicXdpayBidWlsZCBwcmV2aWV3ICYmIHZpdGUgcHJldmlldyAtLW9wZW5cIixcbiAgICBcInNlcnZlXCI6IFwibm9kZSBzZXJ2ZXIvZW50cnkuZXhwcmVzc1wiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhdXRoL2NvcmVcIjogXCJeMC4xMy4wXCIsXG4gICAgXCJAYnVpbGRlci5pby9xd2lrXCI6IFwiXjEuNS42XCIsXG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWF1dGhcIjogXCJeMC4xLjNcIixcbiAgICBcIkBidWlsZGVyLmlvL3F3aWstY2l0eVwiOiBcIl4xLjUuNlwiLFxuICAgIFwiQHF3aWstdWkvaGVhZGxlc3NcIjogXCJeMC40LjRcIixcbiAgICBcIkBxd2lrLXVpL3N0eWxlZFwiOiBcIl4wLjEuMFwiLFxuICAgIFwiQHF3aWstdWkvdXRpbHNcIjogXCJeMC4yLjFcIixcbiAgICBcIkB0eXBlcy9jb21wcmVzc2lvblwiOiBcIl4xLjcuMlwiLFxuICAgIFwiQHR5cGVzL2VzbGludFwiOiBcIl44LjU2LjEwXCIsXG4gICAgXCJAdHlwZXMvZXhwcmVzc1wiOiBcIl40LjE3LjE5XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xNC4yXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjEzLjBcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy4xMy4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNFwiLFxuICAgIFwiY29tcHJlc3Npb25cIjogXCJeMS43LjRcIixcbiAgICBcImRvdGVudlwiOiBcIl4xNi40LjVcIixcbiAgICBcImVzbGludFwiOiBcIl45LjQuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1xd2lrXCI6IFwiXjEuNS42XCIsXG4gICAgXCJleHByZXNzXCI6IFwiNC4xOS4yXCIsXG4gICAgXCJueFwiOiBcIl4xOS4yLjNcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjMxXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjMuMlwiLFxuICAgIFwicHJldHRpZXItcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjAuNi4yXCIsXG4gICAgXCJxd2lrLXVpXCI6IFwiXjAuMS4wXCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuNFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuNVwiLFxuICAgIFwidW5kaWNpXCI6IFwiXjYuMTguMlwiLFxuICAgIFwidml0ZVwiOiBcIl41LjIuMTNcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4yLjFcIlxuICB9LFxuICBcIm54XCI6IHt9LFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAYnVpbGRlci5pby9xd2lrLWxhYnNcIjogXCJnaXRodWI6QnVpbGRlcklvL3F3aWstbGFicy1idWlsZCNtYWluXCIsXG4gICAgXCJAZXNsaW50L2NvbmZpZy1hcnJheVwiOiBcIl4wLjE1LjFcIixcbiAgICBcIkBlc2xpbnQvb2JqZWN0LXNjaGVtYVwiOiBcIl4yLjEuM1wiLFxuICAgIFwiQHBheXBhbC9wYXlwYWwtanNcIjogXCJeOC4xLjBcIixcbiAgICBcIkBxd2lrZXN0L2ljb25zXCI6IFwiXjAuMC4xM1wiLFxuICAgIFwiQHNob3BpZnkvZHJhZ2dhYmxlXCI6IFwiXjEuMS4zXCIsXG4gICAgXCJAdGFpbHdpbmRjc3MvdHlwb2dyYXBoeVwiOiBcIl4wLjUuMTNcIixcbiAgICBcImFwZXhjaGFydHNcIjogXCJeMy40OS4xXCIsXG4gICAgXCJjbGFzcy12YXJpYW5jZS1hdXRob3JpdHlcIjogXCJeMC43LjBcIixcbiAgICBcImZ1bmRcIjogXCJeMS4wLjBcIixcbiAgICBcImluc3RhbGxcIjogXCJeMC4xMy4wXCIsXG4gICAgXCJpc29tb3JwaGljLWRvbXB1cmlmeVwiOiBcIl4yLjEyLjBcIixcbiAgICBcImxydS1jYWNoZVwiOiBcIl4xMC4yLjJcIixcbiAgICBcIm1hcmtlZFwiOiBcIl4xMi4wLjJcIixcbiAgICBcIm5wbVwiOiBcIl4xMC44LjFcIixcbiAgICBcIm9wZW5haVwiOiBcIl40LjUwLjBcIixcbiAgICBcInN1cnJlYWxkYi5qc1wiOiBcIl4wLjExLjFcIixcbiAgICBcInVwbG9hZHRoaW5nXCI6IFwiXjYuMTIuMFwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVcsU0FBUyx5QkFBeUI7QUFDM1ksU0FBUyxvQkFBb0I7OztBQ0c3QixTQUFTLG9CQUFxQztBQUM5QyxTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGdCQUFnQjtBQUN6QixTQUFTLGlCQUFpQjtBQUUxQixPQUFPLG1CQUFtQjs7O0FDVDFCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixhQUFlO0FBQUEsRUFDZixTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0Esc0JBQXNCO0FBQUEsRUFDdEIsU0FBVztBQUFBLEVBQ1gscUJBQXVCO0FBQUEsSUFDckI7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQ0FBa0M7QUFBQSxFQUNsQyxNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxnQkFBZ0I7QUFBQSxJQUNoQixpQkFBaUI7QUFBQSxJ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
