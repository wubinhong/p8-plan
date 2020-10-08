/**
 * Advance usage for function.
 */
export class AdvanceFunction {

    /**
     * Inspect coding for @action in module "moleculer-decorators"
     */
    testMoleculerDecorators() {
        interface Options {
            name: string;
            version?: string;
            code?: number;
        }
        interface ActionService {
            action(options?: Options): (target: any, key: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
        }
        let actionService: ActionService = {
            action: function (options?: Options) {
                return function (target: any, key: string, descriptor: PropertyDescriptor) {
                    console.log(`AdvanceFunction.testFunctions.action invoke!: ${target} | ${key} | ${descriptor}`);
                    return descriptor;
                };
            },
        };
        let action = actionService.action({ name: 'petService' });
        let actionResult = action('any target', 'key1', { configurable: false });
        console.log(`AdvanceFunction.testFunctions.action: ${action} | ${JSON.stringify(actionResult)}`);
    }
}
let advanceFunction = new AdvanceFunction();
advanceFunction.testMoleculerDecorators();
