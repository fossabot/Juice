/* eslint key-spacing:0 */

export default {
  development: (config) => ({
    compiler_public_path: `http://${config.server_host}:${config.server_port}/`
  }),
  production: (config) => ({
    compiler_output_name     : '[name].[hash].js',
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash',
    compiler_devtool         : null,
    compiler_stats           : {
      chunks : true,
      chunkModules : true,
      colors : true
    }
  })
};