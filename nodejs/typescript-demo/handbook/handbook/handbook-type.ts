/**
 * Literal Types + Unions and Intersection Types
 */
export class HandlebookType {
    /**
     * Literal Types
     */
    testLiteralTypes(): void {
        /** Literal Narrowing */
        const helloWorld = 'Hello World';
        // On the other hand, a let can change, and so the compiler declares it a string
        let hiWorld = 'Hi World';

        /** String Literal Types */
        type Easing = 'ease-in' | 'ease-out' | 'ease-in-out';
        class UIElement {
            animate(dx: number, dy: number, easing: Easing) {
                switch (easing) {
                    case 'ease-in':
                        break;
                    case 'ease-out':
                        break;
                    case 'ease-in-out':
                        break;
                }
            }
        }

        /** Numeric Literal Types */
        function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
            return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
        }
        console.log(rollDice());
        interface MapConfig {
            lng: number;
            lat: number;
            tileSize: 8 | 16 | 32;
        }
        function setupMap(config: MapConfig) {
            console.log(config);
        }
        setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
        // setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 17 });

        // Boolean Literal Types. You might use these to constrain object values whose properties are interrelated.
        interface ValidationSuccess {
            isValid: true;
            reason: null;
        }
        interface ValidationFailure {
            isValid: false;
            reason: string;
        }
        type ValidationResult = ValidationSuccess | ValidationFailure;
        let validResult: ValidationResult = { isValid: true, reason: 'Valid!!!' } as ValidationResult;
        console.log(validResult);
        validResult.isValid = false;
        validResult.reason = 'No reason';
        console.log(validResult);
    }

    /**
     * Union Types
     */
    testUnionTypes(): void {
        // Expects a parameter to be either a number or a string.
        function padLeft(value: string, padding: string | number) {}
        padLeft('kkk', 'good');
        padLeft('kkk', 4);
        // padLeft('kkk', true);

        // Unions with Common Fields
        interface Bird {
            fly(): void;
            layEggs(): void;
        }
        interface Fish {
            swim(): void;
            layEggs(): void;
        }
        // declare function getSmallPet(): Fish | Bird;
        function getSmallPet(): Fish | Bird {
            // The return type defination makes method layEggs() to be common
            let seed = Math.floor(Math.random() * 10) / 2;
            if (Math.floor(Math.random() * 10) % 2) {
                return {
                    fly: function () {
                        console.log(`I'm flying...`);
                    },
                    layEggs: function () {
                        console.log(`I'm laying egg...`);
                    },
                };
            } else {
                return {
                    swim: function () {
                        console.log(`I'm flying...`);
                    },
                    layEggs: function () {
                        console.log(`I'm laying egg...`);
                    },
                };
            }
        }
        let pet = getSmallPet();
        console.log(pet);
        pet.layEggs();
        // Only available in one of the two possible types
        // pet.swim();
    }
    /**
     * Discriminating Unions
     */
    testDiscriminatingUnions() {
        type NetworkLoadingState = {
            state: 'loading';
        };

        type NetworkFailedState = {
            state: 'failed';
            code: number;
        };

        type NetworkSuccessState = {
            state: 'success';
            response: {
                title: string;
                duration: number;
                summary: string;
            };
        };
        // Create a type which represents only one of the above types
        // but you aren't sure which it is yet.
        type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState;
        let networkState: NetworkState = { state: 'success', response: { title: 'This is title' } } as NetworkState;
        console.log(networkState);
        // networkState.response = {duration: 23}  // Property 'response' does not exist on type 'NetworkState'.

        function logger(state: NetworkState): string {
            // By switching on state, TypeScript can narrow the union
            // down in code flow analysis
            switch (state.state) {
                case 'loading':
                    return 'Downloading...';
                case 'failed':
                    // The type must be NetworkFailedState here,
                    // so accessing the `code` field is safe
                    return `Error ${state.code} downloading`;
                case 'success':
                    return `Downloaded ${state.response.title} - ${state.response.summary}`;
            }
        }
        console.log(logger(networkState));
    }
    /**
     * Union Exhaustiveness checking
     */
    testUnionExhaustivenessChecking() {
        type NetworkLoadingState = {
            state: 'loading';
        };
        type NetworkFailedState = {
            state: 'failed';
            code: number;
        };
        type NetworkSuccessState = {
            state: 'success';
            response: {
                title: string;
                duration: number;
                summary: string;
            };
        };
        type NetworkFromCachedState = {
            state: 'from_cache';
            id: string;
            response: NetworkSuccessState['response'];
        };
        type NetworkState = NetworkLoadingState | NetworkFailedState | NetworkSuccessState | NetworkFromCachedState;
        function assertNever(x: never): never {
            throw new Error('Unexpected object: ' + x);
        }
        function logger(s: NetworkState): string {
            switch (s.state) {
                case 'loading':
                    return 'loading request';
                case 'failed':
                    return `failed with code ${s.code}`;
                case 'success':
                    return 'got response';
                /* default:
                    // Argument of type 'NetworkFromCachedState' is not assignable to parameter of type 'never'.
                    return assertNever(s); */
            }
        }
        let networkState = { state: 'from_cache', response: { title: 'This is title' } } as NetworkState;
        console.log(logger(networkState));
    }
    /**
     * Intersection Types
     */
    testIntersectionTypes() {
        interface ErrorHandling {
            success: boolean;
            error?: { message: string };
        }
        interface ArtworksData {
            artworks: { title: string }[];
        }
        interface ArtistsData {
            artists: { name: string }[];
        }
        // These interfaces are composed to have
        // consistent error handling, and their own data.
        type ArtworksResponse = ArtworksData & ErrorHandling;
        type ArtistsResponse = ArtistsData & ErrorHandling;
        const handleArtistsResponse = (response: ArtistsResponse) => {
            if (response.error) {
                console.error(response.error.message);
                return;
            }
            console.log(response.artists);
        };
        // Use it
        let artworksResponse: ArtworksResponse = { success: true, artworks: [{ title: 'Hally Porter' }] };
        console.log(artworksResponse);
        let artistsResponse: ArtistsResponse = {
            success: false,
            error: { message: 'Fail message!' },
        } as ArtistsResponse;
        console.log(artistsResponse);
        artistsResponse.artists = [{ name: 'Kevin' }];
        console.log(artistsResponse);
        handleArtistsResponse(artistsResponse);
    }
}

let handlebookType: HandlebookType = new HandlebookType();
handlebookType.testLiteralTypes();
handlebookType.testUnionTypes();
handlebookType.testDiscriminatingUnions();
handlebookType.testUnionExhaustivenessChecking();
handlebookType.testIntersectionTypes();
