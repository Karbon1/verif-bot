var Command = /** @class */ (function () {
    function Command(command) {
        this.name = command.name;
        this.description = command.description;
        this.options = command.options;
        this.defaultPermission = command.defaultPermission;
        this.execute = command.execute;
    }
    return Command;
}());
export default Command;
