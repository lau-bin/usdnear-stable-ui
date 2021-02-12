const Errors = {
    typeError: "Error parsing file, file contains malformed tokens",
    notFoundError: "Token not found"
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _loaderUtils = _interopRequireDefault(require("loader-utils"));

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

const schema = require('./loader-options.json');

module.exports = function(source){
    // this.cacheable(true);
    var callback = this.async();

        const options = _loaderUtils.default.getOptions(this) || {};
        (0, _schemaUtils.default)(schema, options, {
          name: 'Tokens loader',
          baseDataPath: 'options'
        });


    const tokens = options.tokens;

    this.addDependency(tokens);

    const last = source.length - 2;
    let parsedFile = "";
    let i = 0;
    let hasTokens = false;
    for (; i < last; i++){
        if (source[i] === '$' && source[i+1] === '{' && i+2 < source.length){
            let b = i+2;
            let token = "";
            while (source[b] !== '}') {
                token += source[b];
                b++;
                if (b == source.length){
                    callback(Errors.typeError, source);
                    return;
                }
            }
            token = token.trim();
            if (token = tokens.get(token)){
                parsedFile += token;
                i = b; //after last }
                hasTokens = true;
                continue;
            }
            else{
                callback(Errors.notFoundError,source);
                return;
            }
        }
        parsedFile += source[i];
    }

    if (hasTokens){

        for (; i < source.length; i++){
            parsedFile += source[i];
        }
        callback(null,parsedFile);
    }
    else{
        callback(null,source);
    }
}