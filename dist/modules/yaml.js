import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as util from 'util';
import Log from './loggers.js';
var wait = util.promisify(setTimeout);
var YAML = /** @class */ (function () {
    function YAML() {
    }
    YAML.Get = function (file) {
        if (fs.existsSync("./" + file + ".yaml")) {
            var fil = fs.readFileSync("./" + file + ".yaml", 'utf8');
            return yaml.load(fil);
        }
        else {
            wait(1000).then(function () {
                Log.Error('Please restart your bot!');
                process.exit();
            });
        }
    };
    YAML.Generate = function (file, contents) {
        if (!fs.existsSync("./" + file + ".yaml")) {
            fs.writeFile("./" + file + ".yaml", typeof contents === 'object' ? yaml.dump(contents) : contents, function () {
                wait(1000).then(function () {
                    Log.Success("Successfully created " + file + ".yaml");
                });
            });
        }
    };
    return YAML;
}());
export default YAML;
