/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation, and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * https://trufflesuite.com/docs/truffle/reference/configuration
 */

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ganache port (default: none)
      network_id: 5777,      // Match Ganache network id
      gas: 6721975,          // Gas limit (adjust if needed)
      gasPrice: 20000000000  // Gas price in wei (default: 20 gwei)
    }
  },
  
  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",      // Specify the version of Solidity
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      //settings: {            // Optimization settings
        //optimizer: {
          //enabled: false,
          //runs: 200
        //},
        //evmVersion: "istanbul" // Ethereum Virtual Machine (EVM) version
      }
    }
  };

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings.
  //
  // db: {
  //   enabled: false,
  //   host: "127.0.0.1",
  //   adapter: {
  //     name: "indexeddb",
  //     settings: {
  //       directory: ".db"
  //     }
  //   }
  // }
